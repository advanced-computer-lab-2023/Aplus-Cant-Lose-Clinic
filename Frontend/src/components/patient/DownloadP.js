import React from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
const DownloadPage = ({ rootElementId, downloadFileName }) => {
  const downloadFileDocument = () => {
    const input = document.getElementById(rootElementId);

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4");
      pdf.addImage(imgData, "JPEG", 10, 50);
      pdf.save(`${downloadFileName}.pdf`);
    });
  };

  return (
    <div>
      <Button onClick={downloadFileDocument} endIcon={<DownloadIcon />}>
        Download 
      </Button>
    </div>
  );
};

export default DownloadPage;
