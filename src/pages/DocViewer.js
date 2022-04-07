import { useState } from "react";

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

const DocViewer = () => {

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  var pdfFile = " https://edocument-develop.s3.ap-southeast-1.amazonaws.com/Anathapindika+Muliawan_1906355730_Assignment+2.pdf";
  // handle file onChange event
  
  return (
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
  );
};

export default DocViewer;
