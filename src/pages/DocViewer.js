import React, { useState, useEffect } from "react";
// Import Worker
import { Worker } from "@react-pdf-viewer/core";
// Import the main Viewer component
import { Viewer } from "@react-pdf-viewer/core";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
// default layout plugin
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// Import styles of default layout plugin
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useParams } from "react-router-dom";
import { DocumentService } from "../services/DocumentService";
import { Container, Typography, Box } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

const DocViewer = () => {
  const { id } = useParams();
  // console.log(id);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [viewDoc, setviewDoc] = useState([]);
  useEffect(() => {
    const fetchview = async () => {
      const response = await DocumentService.viewDocument(id);
      const data = response.data;
      setviewDoc(data[0]);
    };

    fetchview();
  }, [id]);
  // console.log(viewDoc);
  // console.log(viewDoc.file_dokumen);

  var pdfFile = viewDoc.file_dokumen;
  // handle file onChange event

  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h4" fontWeight={600} gutterBottom>
          {viewDoc.judul_dokumen}
        </Typography>

        {viewDoc.konfirmasi === "diterima" ? (
          <>
            <Typography variant="h5">View PDF</Typography>
            <div className="viewer">
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
                <Viewer
                  fileUrl={pdfFile}
                  plugins={[defaultLayoutPluginInstance]}
                ></Viewer>
              </Worker>
            </div>
          </>
        ) : (
          <>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              boxShadow="2"
              sx={{
                backgroundColor: "#FFFBFB",
                height: "70vh",
                borderRadius: "10px",
              }}
            >
              <LockIcon
                sx={{
                  fontSize: 200,
                }}
              />
              <Typography variant="h1" fontSize={100}>
                Dokumen Terkunci
              </Typography>
            </Box>
          </>
        )}
      </Container>
    </>
  );
};

export default DocViewer;
