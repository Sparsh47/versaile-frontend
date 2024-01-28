"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "./globals.css";
import Navbar from "./components/Navbar";
import Image from "next/image";
import hero from "../../public/hero.png";
import line from "../../public/line.png";

export default function Home() {
  const [url, setUrl] = useState("");
  const router = useRouter();

  return (
    <>
      <Image
        src={line}
        alt="underline"
        width={370}
        className="absolute top-[320px] right-[600px] z-[-1]"
      />
      <div
        className="absolute w-[800px] h-[800px] bg-[#7752FE] rounded-[50%] top-[-300px] left-[-200px] z-[-20]"
        style={{ filter: "blur(150px)" }}
      ></div>
      <div
        className="absolute w-[800px] h-[800px] bg-[#7752FE] rounded-[50%] top-[600px] right-[100px] z-[-20]"
        style={{ filter: "blur(150px)" }}
      ></div>
      <div
        className="absolute w-[300px] h-[300px] bg-[#7752FE] rounded-[50%] bottom-[-500px] left-[10px] z-[-20]"
        style={{ filter: "blur(130px)" }}
      ></div>
      <Navbar />
      <main
        className="flex flex-col items-center gap-12 p-24"
        style={{ height: "calc(100vh - 80px)" }}
      >
        <div className="flex flex-col items-center">
          <div className="text-8xl font-black text-center">
            Make Documents.
            <br />
            Create Impact.
          </div>
          <div
            className="text-center mt-10 font-medium"
            style={{ fontSize: "22px", lineHeight: "28px" }}
          >
            Collaborate Effortlessly, Create Together: Your Words, Supercharged
            by AI. <br />
            Empowering Teamwork with our Text Editor.
          </div>
        </div>
        <div className="flex items-center gap-5">
          <Button
            className="h-[45px] rounded-[100px] py-5 px-8 font-medium text-md"
            onClick={() => router.push(`/documents/${uuidV4()}`)}
            style={{
              boxShadow: "2px 4px 12px rgba(0, 0, 0, 0.2)",
            }}
          >
            New Doc
          </Button>
          <div className="flex w-full items-center space-x-2">
            <Input
              type="url"
              placeholder="Your link"
              className="h-[50px] rounded-[100px] w-[400px] border border-gray-500"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              style={{
                boxShadow: "2px 4px 12px rgba(0, 0, 0, 0.2)",
              }}
            />
            <Button
              className="absolute right-[680px] py-5 px-8 h-[40px] rounded-[100px] font-medium text-md"
              type="submit"
              onClick={() => router.push(url)}
            >
              Edit
            </Button>
          </div>
        </div>
        <Image
          src={hero}
          alt="hero-image"
          className="w-[80vw] rounded-[20px] shadow-xl border border-gray-200"
          style={{
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)",
          }}
        />
      </main>
    </>
  );
}
