import React, { useState, useEffect } from "react";
import download from "downloadjs";
import axios from "axios";
import { API_URL } from "../../Consts";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";

import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
const MedHistList = () => {
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const { id } = useSelector((state) => state.user);
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
  }, []);
  const downloadFile = async (fid, path, mimetype) => {
    try {
      const result = await axios.get(
        `${API_URL}/patient/download/${fid}/${id}`,
        {
          responseType: "blob",
        }
      );
      const split = path.split("/");
      const filename = split[split.length - 1];
      setErrorMsg("");
      return download(result.data, filename, mimetype);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg("Error while downloading file. Try again later");
      }
    }
  };
  const deleteFile = async (fid, path, mimetype) => {
    try {
      const result = await axios.get(`${API_URL}/patient/delete/${fid}/${id}`);
      const split = path.split("/");
      const filename = split[split.length - 1];
      setErrorMsg("");
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

  return (
    <div className="files-container">
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
                      Download
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
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Link to="/MedHist">
          {" "}
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Link>
      </Box>
    </div>
  );
};
export default MedHistList;
