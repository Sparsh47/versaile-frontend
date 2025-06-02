"use client";

import "quill/dist/quill.snow.css";
import Quill from "quill";
import { useEffect, useRef, useState } from "react";
import "./index.css";
import { io } from "socket.io-client";
import OpenAi from "@/components/OpenAi";
import { useRouter } from "next/navigation";
import hero from "../../../../public/logo1.png";
import Image from "next/image";
import HashLoader from "react-spinners/HashLoader";
import * as quillToWord from "quill-to-word";
import { saveAs } from "file-saver";
import {useUser} from "@clerk/nextjs";

const TextEditor = ({ params }: {params: {id: string}}) => {
  const router = useRouter();

  const { id } = params;
  const toolbarOptions = [
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

  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState<Quill | null>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [docs, setDoc] = useState();
  const {user, isLoaded} = useUser();

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 2500);
  }, []);

  useEffect(() => {
    if (socket == null || quill == null) {
      return;
    }
    async function getDoc() {
      const delta = quill?.getContents();
      const doc = await quillToWord.generateWord(delta, {
        exportAs: "blob",
      });
      setDoc(doc);
    }

    const docInterval = setInterval(() => {
      getDoc();
    }, 10);

    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
      getDoc();
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(docInterval);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) {
      return;
    }

    socket.once("load-document", (document) => {
      quill.setContents(document);
    });

    socket.emit("get-document", id);
  }, [socket, quill, id]);

  useEffect(() => {
    const s = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}/`);
    setSocket(s);

    if (socket) {
      console.log("Connected to server");
    }

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta) => {
      quill.updateContents(delta);
    };
    socket.on("recieve-changes", handler);
    return () => {
      socket.off("recieve-changes", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta, oldDelta, source) => {
      if (source !== "user") {
        return;
      }
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

  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) {
      const q = new Quill("#container", {
        theme: "snow",
        modules: {
          toolbar: toolbarOptions,
        },
      });
      editorRef.current = q;
      q.setText("Loading...");
      setQuill(q);
    }
  }, []);

  const saveFile = () => {
    saveAs(docs, "word-export.docx");
  };

  return (
    <>
      {!loading && (
        <div className="min-h-screen flex items-center justify-center">
          <HashLoader color="#7752FE" size={100} speedMultiplier={1.5} />
        </div>
      )}
      <div style={{ display: !loading ? "none" : "block" }}>
        <div id="container"></div>
        <div className="w-[200px] h-[50px] flex items-center justify-center z-[100] fixed top-[2px]">
          <Image
            src={hero}
            alt="logo"
            width={280}
            height={280}
            style={{ cursor: "pointer" }}
            onClick={() => router.push("/")}
            className="z-[50] mix-blend-multiply"
          />
        </div>
        <OpenAi text={text} save={saveFile} />
      </div>
    </>
  );
};

export default TextEditor;
