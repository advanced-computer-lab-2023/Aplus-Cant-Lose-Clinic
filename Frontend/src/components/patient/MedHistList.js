import React, { useState, useEffect } from "react";
import download from "downloadjs";
import axios from "axios";
import { API_URL } from "../../Consts";
import { BrowserRouter as Router, Route, Link, Switch, Navigate } from "react-router-dom";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
const MedHistList = () => {
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { id,role } = useSelector((state) => state.user);
  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/patient/getAllFiles/${id}`
        );
        setErrorMsg("");
        setFilesList(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };
    getFilesList();
  }, [filesList]);
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };




  const downloadFile = async (fid, path, mimetype) => {
    try {
      const result = await axios.get(
        `${API_URL}/patient/download/${fid}/${id}`,
        { responseType: "blob" }
      );
      const split = path.split("/");
      const filename = split[split.length - 1];
      setErrorMsg("");
      // Show Snackbar for download success
      setSnackbarMessage(`File ${filename} downloaded successfully`);
      setSnackbarOpen(true);
      download(result.data, filename, mimetype);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg("Error while downloading file. Try again later");
      }
    }
  };

  const deleteFile = async (fid, path, mimetype) => {
    try {
      await axios.get(`${API_URL}/patient/delete/${fid}/${id}`);
      const split = path.split("/");
      const filename = split[split.length - 1];
      setErrorMsg("");
      // Show Snackbar for deletion success
      setSnackbarMessage(`File ${filename} deleted successfully`);
      setSnackbarOpen(true);
      // Perform additional actions here if needed
      console.log(`File ${filename} deleted successfully`);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMsg("File not found");
      } else {
        setErrorMsg("Error while deleting file. Try again later");
      }
    }
  };

  const navigate=useNavigate();

  return (
    role==="patient" ?
    <div className="files-container">
                    <Typography variant="h5">Medical History</Typography>

      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <table className="files-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Download File</th>
            <th>Delete File</th>
          </tr>
        </thead>
        <tbody>
          {filesList.length > 0 ? (
            filesList.map(
              ({ _id, title, description, file_path, file_mimetype }) => (
                <tr key={_id}>
                  <td className="file-title">{title}</td>
                  <td className="file-description">{description}</td>
                  <td>
                    <a
                      href="#/"
                      onClick={() =>
                        downloadFile(_id, file_path, file_mimetype)
                      }
                    >
                      Download
                    </a>
                  </td>
                  <td>
                    <a
                      href="#/"
                      onClick={() => deleteFile(_id, file_path, file_mimetype)}
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan={3} style={{ fontWeight: "300" }}>
                No files found. Please add some.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Box sx={{ "& > :not(style)": { m: 1 } ,position:"fixed",left:"0px",bottom:"20px"}}>
        <Link to="/MedHist">
          {" "}
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Link>
      </Box>
      <Box sx={{ "& > :not(style)": { m: 1 } ,position:"fixed",right:"0px",bottom:"20px"}}>
        <Link to="/Home">
          {" "}
          <Fab color="primary" aria-label="add">
            <HomeIcon />
          </Fab>
        </Link>
      </Box>
    </div>:navigate("/Login")
  );
};
export default MedHistList;
