"use client"
import { useState } from "react";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";
import dynamic from "next/dynamic";

// Ensure PDFs render properly
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// Lazy load React Flow for performance
const ReactFlow = dynamic(() => import("reactflow"), { ssr: false });

export default function UploadMedicalReport() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [simplifiedText, setSimplifiedText] = useState("");
  const [flowchartData, setFlowchartData] = useState([]);
  const [numPages, setNumPages] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const extractTextFromPDF = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/extract-text", formData);
      setText(response.data.text);
      simplifyText(response.data.text);
    } catch (error) {
      console.error("Error extracting text:", error);
    }
  };

  const simplifyText = async (text) => {
    try {
      const response = await axios.post("/api/simplify-text", { text });
      setSimplifiedText(response.data.simplified);
      generateFlowchart(response.data.simplified);
    } catch (error) {
      console.error("Error simplifying text:", error);
    }
  };

  const generateFlowchart = async (text) => {
    try {
      const response = await axios.post("/api/generate-flowchart", { text });
      setFlowchartData(response.data.flowchart);
    } catch (error) {
      console.error("Error generating flowchart:", error);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Upload Medical Report (PDF)</h1>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button
        onClick={extractTextFromPDF}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
      >
        Process Report
      </button>

      {file && (
        <div className="mt-6">
          <h2 className="font-semibold">Preview:</h2>
          <Document file={file} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
            {Array.from(new Array(numPages), (_, index) => (
              <Page key={index} pageNumber={index + 1} />
            ))}
          </Document>
        </div>
      )}

      {simplifiedText && (
        <div className="mt-6">
          <h2 className="font-semibold">Simplified Explanation:</h2>
          <p className="bg-gray-100 p-4">{simplifiedText}</p>
        </div>
      )}

      {flowchartData.length > 0 && (
        <div className="mt-6">
          <h2 className="font-semibold">Visual Insights:</h2>
          <ReactFlow elements={flowchartData} style={{ height: 300 }} />
        </div>
      )}
    </div>
  );
}
