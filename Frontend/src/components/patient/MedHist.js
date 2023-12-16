import React, { useState, useRef } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import Dropzone from "react-dropzone";
import axios from "axios";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { API_URL } from "../../Consts.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

import AccountAvatar from "../Authentication/AccountAvatar.js";

const MedHist = ({ open, onClose }) => {
  const { id, role } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  const [file, setFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState("");
  const [state, setState] = useState({
    title: "",
    description: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false);
  const dropRef = useRef();

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
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
      if (title.trim() !== "" && description.trim() !== "") {
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("title", title);
          formData.append("description", description);
          setErrorMsg("");

          await axios.post(`${API_URL}/patient/upload/${id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          setSnackbarSeverity("success");
          setSnackbarMessage("File uploaded successfully");
          setSnackbarOpen(true);

          navigate("/HealthRecords");
          onClose(); // Close the dialog
        } else {
          setErrorMsg("Please select a file to add.");
        }
      } else {
        setErrorMsg("Please enter all the field values.");
      }
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Error while uploading file. Try again later.");
      setSnackbarOpen(true);

      console.error(error);

      error.response && setErrorMsg(error.response.data);
    }
  };

  return role === "patient" ? (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Medical History</DialogTitle>
      <DialogContent sx={{mt:"20px"}}>
        <Form
          onSubmit={handleOnSubmit}
          style={{ width: "80%", maragin: "40px",paddingLeft: "50px" }}
        >
          {errorMsg && <p className="errorMsg">{errorMsg}</p>}
          <Row>
            <Col>
              <Form.Group controlId="title">
                <Form.Control
                  type="text"
                  sx={{ width: "50%" }}
                  name="title"
                  value={state.title || ""}
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
                  value={state.description || ""}
                  placeholder="Enter description"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="upload-section">
            <Dropzone onDrop={onDrop}>
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps({ className: "drop-zone" })}
                  ref={dropRef}
                >
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
                    <img
                      className="preview-image"
                      src={previewSrc}
                      alt="Preview"
                    />
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
        </Form>
      </DialogContent>
      <DialogActions sx={{mt:"40px"}}>
      <Button variant="primary" type="submit" style={{ width: "30%",marginRight:"20%" }}>
          Add
        </Button>
        <Button onClick={onClose} style={{backgroundColor:"red", width: "30%",marginRight:"30px"}}>
          Cancel
        </Button>
  
      </DialogActions>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Dialog>
  ) : (
    <>
      <Link to="/Login" sx={{ left: "100%" }}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            display: { xs: "none", sm: "flex" },
            fontSize: "20px",
            margin: "auto",
          }}
        >
          Login
        </Typography>
      </Link>
    </>
  );
};

export default MedHist;
