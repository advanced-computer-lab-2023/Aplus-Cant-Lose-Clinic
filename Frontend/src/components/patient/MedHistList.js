import React, { useState, useEffect } from "react";
import download from "downloadjs";
import axios from "axios";
import { API_URL } from "../../Consts";
import MedHist from "./MedHist.js"

import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Snackbar,
  Box,
  Fab,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AccountAvatar from "../Authentication/AccountAvatar";

const MedHistList = () => {
  const [filesList, setFilesList] = useState([]);
  const [open,setOpen]= useState(false);
const handleOpen=() => {setOpen(true);}
const handleClose=() => {setOpen(false);}

  const [errorMsg, setErrorMsg] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { id, role } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    if (reason === "clickaway") {
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
      // Refresh the files list after deletion
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMsg("File not found");
      } else {
        setErrorMsg("Error while deleting file. Try again later");
      }
    }
  };

  return role === "patient" ? (
    <div style={{width:"700px"}}>
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <List sx={{ width: "80%", backgroundColor: "white" }}>
        {filesList.length > 0 ? (
          filesList.map(
            ({ _id, title, description, file_path, file_mimetype }) => (
              <ListItem key={_id} style={{ borderBottom: "1px solid #004E98" }}>
                <div style={{display:"flex", flexDirection:"column"}}>
                <Typography
                  variant="body1"
                  sx={{ color: "#6247aa", fontSize: "30px" }}
                >
                  {title}
                </Typography>
                <div>
                  <Typography
                    variant="body2"
                    sx={{ color: "#6247aa", fontSize: "14px" }}
                  >
                    {description}
                  </Typography>
                </div>
                </div>
                <ListItemSecondaryAction>
                  <IconButton
                    aria-label="download"
                    color="primary"
                    size="large"
                    sx={{ fontSize: "28px", mr: "15px" }}
                    onClick={() => downloadFile(_id, file_path, file_mimetype)}
                  >
                    <CloudDownloadIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    color="error"
                    size="large"
                    sx={{ fontSize: "28px" }}
                    onClick={() => deleteFile(_id, file_path, file_mimetype)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            )
          )
        ) : (
          <ListItem>
            <ListItemText
              primary="No files found. Please add some."
              style={{ fontWeight: "300", color: "white", fontSize: "18px" }}
            />
          </ListItem>
        )}
      </List>
      <Box
        sx={{
          "& > :not(style)": { m: 1 },
          position: "fixed",
          right: "0px",
          bottom: "20px",
        }}
      >
        <IconButton onClick={handleOpen} size="large" >
          <Fab color="primary" aria-label="add" size="large" >
            <AddIcon size="large" sx={{fontSize:"large",width:"50px",height:"50px"}} />
          </Fab>
          medical history
        </IconButton>
        <MedHist open={open} onClose={handleClose} />
      </Box>
      <Box
        sx={{
          "& > :not(style)": { m: 1 },
          position: "fixed",
          left: "0px",
          bottom: "20px",
        }}
      >
        <Link to="/Home">
          <Fab color="primary" aria-label="add">
            <HomeIcon />
          </Fab>
        </Link>
      </Box>
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  ) : (
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
  );
};

export default MedHistList;
