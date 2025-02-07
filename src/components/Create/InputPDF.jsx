import React, { useEffect, useState, useCallback } from "react";

import "pdfjs-dist/webpack";
import * as pdfjsLib from "pdfjs-dist";

import styled from "styled-components";
import useStore from "../../store/Store";

const InputPDF = () => {
  //const canvasRef = useRef(null);
  const { setBubbles, appendBubble } = useStore();
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [PDFfile, setPDFfile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64 = reader.result.split(",")[1];
        const raw = atob(base64);
        const uint8Array = new Uint8Array(raw.length);
        for (let i = 0; i < raw.length; i++) {
          uint8Array[i] = raw.charCodeAt(i);
        }

        const loadingTask = pdfjsLib.getDocument({
          data: uint8Array,
          cMapUrl: "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.7.76/cmaps/",
          enableXfa: true,
          disableFontFace: false,
        });
        getPDF(loadingTask);
      };
      reader.onerror = (error) => {
        console.error("파일을 읽는 중 오류 발생:", error);
      };
    } else {
      alert("PDF 파일을 업로드해 주세요.");
    }
  };

  const getPDF = useCallback(async (loadingTask) => {
    try {
      const file = await loadingTask.promise;
      setPDFfile(file);
      setNumPages(file.numPages);
    } catch (e) {
      console.error("로딩 실패");
      console.error(e);
    }
  });


  const updatePage = useCallback(async () => {
    console.log("update page", page);
    console.log(PDFfile);
    const currentPage = await PDFfile.getPage(page);
    //items
    const content = await currentPage.getTextContent();
    console.log(content);
    const bubbles = [];
    var index = 0;
    content.items.forEach(function (item) {
      //if ((item.str !== "")&&(item.str !== " ")) {
        const bubble = {
          id: index,
          x: item.transform[4] * 1.5,
          y: (800 - item.transform[5]) * 1.5,
          width: item.width * 1.5,
          height: item.height * 1.5,
          str: item.str,
          mapping: false,
        };
        bubbles.push(bubble);
        index++;
      //}
    });

    setBubbles(bubbles);
  });

  const nextPage = () => {
    if (page<numPages) {
      setPage(page+1);
    }
  }

  const prevPage = () => {
    if (page>1) {
      setPage(page-1);
    }
  }

  useEffect(() => {
    if(PDFfile !== null) {
      updatePage();
    }
  }, [page, PDFfile]);

  return (
    <Container>
      <input type="file" onChange={handleFileChange}></input>
      {
      (PDFfile)
      ?
      <Page>
      <span>Page: {page}/{numPages}</span>
      <Btn onClick={prevPage}>이전</Btn>
      <Btn onClick={nextPage}>다음</Btn>
      </Page>
      :
      <></>
      }
    </Container>
  );
};

const Container = styled.div`
  margin: 10px;
`;

const Page = styled.div`
  margin: 8px 0px;
`

const Btn = styled.button`
  background-color: #AEAEAE;
  color: #FFFFFF;
  padding: 4px;
  margin: 0px 4px;
  border-radius: 4px;
`

export default InputPDF;
