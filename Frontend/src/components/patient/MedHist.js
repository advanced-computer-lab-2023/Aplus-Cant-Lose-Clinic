import React, { useState, useRef } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { API_URL } from "../../Consts.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const MedHist = (props) => {
  const { id ,role} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'



  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };
  const [file, setFile] = useState(null); // state for storing the uploaded file
  const [previewSrc, setPreviewSrc] = useState(''); // state for storing the preview source
  const [state, setState] = useState({
    title: '',
    description: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to determine if a preview is available
  const dropRef = useRef(); // React ref for managing the hover state of the droppable area

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };

    fileReader.readAsDataURL(uploadedFile);
    setIsPreviewAvailable(uploadedFile.name.match(/\.(pdf|jpeg|jpg|png)$/));
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const { title, description } = state;
      if (title.trim() !== '' && description.trim() !== '') {
        if (file) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('title', title);
          formData.append('description', description);
          setErrorMsg('');
          
          // Try to upload the file
          await axios.post(`${API_URL}/patient/upload/${id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });

          // If upload is successful, show success Snackbar
          setSnackbarSeverity('success');
          setSnackbarMessage('File uploaded successfully');
          setSnackbarOpen(true);

          // Navigate to MedHistList
          navigate('/MedHistList');
        } else {
          setErrorMsg('Please select a file to add.');
        }
      } else {
        setErrorMsg('Please enter all the field values.');
      }
    } catch (error) {
      // If upload fails, show error Snackbar
      setSnackbarSeverity('error');
      setSnackbarMessage('Error while uploading file. Try again later.');
      setSnackbarOpen(true);

      // Log the detailed error to the console
      console.error(error);

      // If there is a response from the server, use it as the error message
      error.response && setErrorMsg(error.response.data);
    }
  };
  return (
role==='patient' ?
    <React.Fragment>
      <Form className="search-form" onSubmit={handleOnSubmit}>
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Control
                type="text"
                name="title"
                value={state.title || ''}
                placeholder="Enter title"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="description">
              <Form.Control
                type="text"
                name="description"
                value={state.description || ''}
                placeholder="Enter description"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="upload-section">
          <Dropzone onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
                <input {...getInputProps()} />
                <p>Drag and drop a file OR click here to select a file</p>
                {file && (
                  <div>
                    <strong>Selected file:</strong> {file.name}
                  </div>
                )}
              </div>
            )}
          </Dropzone>
          {previewSrc && (
            <div className="preview-container">
              {isPreviewAvailable ? (
                file.name.match(/\.(jpeg|jpg|png|pdf)$/) ? (
                  <img className="preview-image" src={previewSrc} alt="Preview" />
                ) : (
                  <div className="pdf-preview">
                    <Document file={previewSrc}>
                      <Page pageNumber={1} />
                    </Document>
                  </div>
                )
              ) : (
                <div className="preview-message">
                  <p>No preview available for this file</p>
                </div>
              )}
            </div>
          )}
        </div>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </React.Fragment>:navigate("/Login")
  );
};

export default MedHist;
