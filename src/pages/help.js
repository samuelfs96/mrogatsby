import React, { useState } from 'react';
import { Row } from 'react-bootstrap';
import { Document, Page, pdfjs } from "react-pdf";

import pdfFile from '../docs/FL-PRD-FindingMRO-UserGuide.pdf';


export default function Help() {
  
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);
  const [file, setFile] = useState(pdfFile);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }



  return (
    <Document
      file={file}
      options={{ workerSrc: "/pdf.worker.js" }}
      onLoadSuccess={onDocumentLoadSuccess}
    >
      {Array.from(new Array(numPages), (el, index) => (
        <Page key={`page_${index + 1}`} pageNumber={index + 1} />
      ))}
    </Document>
  );
}
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page
//   const [file, setFile] = useState(pdfFile);
//   function onDocumentLoadSuccess({ numPages }) {
//     setNumPages(numPages);
//     setPageNumber(1);
//   }

//   function changePage(offset) {
//     setPageNumber(prevPageNumber => prevPageNumber + offset);
//   }

//   function previousPage() {
//     changePage(-1);
//   }

//   function nextPage() {
//     changePage(1);
//   }



//   return (
//     <>
//     <Document
//       file={file}
//       options={{ workerSrc: "/pdf.worker.js" }}
//       onLoadSuccess={onDocumentLoadSuccess}
//     >
//       <Page pageNumber={pageNumber} />
//     </Document>
//     <div style={{left: "100px"}}>
//       <p>
//         Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
//       </p>
//       <button className="btn-airline"  disabled={pageNumber <= 1} onClick={previousPage}>
//         Previous
//       </button>
//       &nbsp; &nbsp;
//       <button className="btn-airline"
       
//         disabled={pageNumber >= numPages}
//         onClick={nextPage}
//       >
//         Next
//       </button>
//     </div>
//   </>
// );
// }