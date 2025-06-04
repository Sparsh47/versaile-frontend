"use client";

import "quill/dist/quill.snow.css";
import Quill from "quill";
import { useEffect, useRef, useState } from "react";
import "./index.css";
import { io } from "socket.io-client";
import OpenAi from "@/components/OpenAi";
import hero from "../../../../public/logo1.png";
import Image from "next/image";
import HashLoader from "react-spinners/HashLoader";
import * as quillToWord from "quill-to-word";
import { saveAs } from "file-saver";
import Link from "next/link";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";


const TextEditor = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const desktopToolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["link", "image", "blockquote", "code-block"],
    ["clean"],
  ];

  const mobileToolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["link", "image", "blockquote", "code-block"],
  ];

  const isMobile = window.innerWidth < 1024;

  const [socket, setSocket] = useState<any>(null);
  const [quill, setQuill] = useState<Quill | null>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [docs, setDoc] = useState<Blob | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 2500);
  }, []);

  useEffect(() => {
    if (socket == null || quill == null) return;

    async function getDoc() {
      const delta = quill.getContents();
      const doc = await quillToWord.generateWord(delta, {
        exportAs: "blob",
      });
      setDoc(doc);
    }

    const docInterval = setInterval(getDoc, 10);

    const saveInterval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
      getDoc();
    }, 3000);

    return () => {
      clearInterval(saveInterval);
      clearInterval(docInterval);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.once("load-document", (document: any) => {
      quill.setContents(document);
    });

    socket.emit("get-document", id);
  }, [socket, quill, id]);

  useEffect(() => {
    const s = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}/`);
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta: any) => {
      quill.updateContents(delta);
    };
    socket.on("recieve-changes", handler);
    return () => {
      socket.off("recieve-changes", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta: any, oldDelta: any, source: string) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };

    quill.on("selection-change", (range, oldRange, source) => {
      if (range) {
        const selectedText = quill.getText(range.index, range.length);
        setText(selectedText);
      }
    });

    quill.on("text-change", handler);
    return () => {
      setText("");
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  const editorRef = useRef<Quill | null>(null);
  useEffect(() => {
    if (!editorRef.current) {
      const q = new Quill("#container", {
        theme: "snow",
        modules: {
          toolbar: isMobile ? mobileToolbarOptions : desktopToolbarOptions,
        },
      });
      editorRef.current = q;
      setQuill(q);
    }
  }, []);

  const saveFile = (fileName: string) => {
    if (!docs) return;
    saveAs(docs, `${fileName}.docx`);
  };

  const saveToPDF = async (fileName: string) => {
    const editorNode = document.querySelector(".ql-editor");
    if (!editorNode) {
      console.error("Could not find .ql-editor container to convert to PDF.");
      return;
    }

    try {
      const canvas = await html2canvas(editorNode as HTMLElement, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        unit: "pt",
        format: "a4",
        orientation: "portrait",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pageWidth;
      const imgHeight = (imgProps.height * pageWidth) / imgProps.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(
            imgData,
            "PNG",
            0,
            position,
            imgWidth,
            imgHeight
        );
        heightLeft -= pageHeight;
      }

      const pdfBlob = pdf.output("blob");
      saveAs(pdfBlob, `${fileName}.pdf`);
    } catch (err) {
      console.error("Failed to generate PDF:", err);
    }
  };

  return (
      <>
        {!loading && (
            <div className="min-h-screen flex items-center justify-center">
              <HashLoader color="#7752FE" size={100} speedMultiplier={1.5} />
            </div>
        )}

        <div style={{ display: !loading ? "none" : "block" }}>
          <div id="container" className="h-[calc(100vh-64px)]" />
          <Link
              href="/"
              className="z-[100] fixed left-1/2 -translate-x-1/2 sm:left-0 sm:-translate-x-0 top-[2px]"
          >
            <Image
                src={hero}
                alt="logo"
                width={280}
                height={280}
                className="z-[50] h-12 w-auto mix-blend-multiply"
            />
          </Link>

          <OpenAi text={text} save={saveFile} savePdf={saveToPDF} />
        </div>
      </>
  );
};

export default TextEditor;
