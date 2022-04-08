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

const DocViewer = () => {
  const { id } = useParams();
  console.log(id);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [viewDoc, setviewDoc] = useState([]);
  useEffect(() => {
    const fetchview = async () => {
      const response = await DocumentService.viewDocument(id);
      const data = response.data;
      setviewDoc(data[0]);
    };

    fetchview();
  }, []);
  console.log(viewDoc);
  console.log(viewDoc.file_dokumen);

  var pdfFile = viewDoc.file_dokumen;
  // handle file onChange event

  return (
    <>
      {viewDoc.konfirmasi === "diterima" ? (
        <div className="container">
          <h5>View PDF</h5>
          <div className="viewer">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
              <Viewer
                fileUrl={pdfFile}
                plugins={[defaultLayoutPluginInstance]}
              ></Viewer>
            </Worker>
          </div>
        </div>
      ) : (
        <div>dokumen terkunci</div>
      )}
    </>
  );
};

export default DocViewer;
