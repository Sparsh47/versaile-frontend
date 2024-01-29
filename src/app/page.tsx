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
            <span className="flex justify-center">
              Create&nbsp;
              <span className="flex flex-col items-center">
                Impact.
                <Image
                  src={line}
                  alt="underline"
                  width={370}
                  className="-mt-12 z-[-1]"
                />
              </span>
            </span>
          </div>
          <div
            className="text-center -mt-5 font-medium"
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
          <div
            className="flex w-[30rem] items-center space-x-2 rounded-[100px]  border border-gray-500 pr-[5px]"
            style={{
              boxShadow: "2px 4px 12px rgba(0, 0, 0, 0.2)",
            }}
          >
            <input
              type="url"
              placeholder="Your link"
              className="h-[50px] w-full outline-none border-none pl-5 bg-transparent"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button
              className="py-5 px-8 h-[40px] rounded-[100px] font-medium text-md"
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
          className="w-[100rem] rounded-[20px] shadow-xl border border-gray-200"
          style={{
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)",
          }}
        />
      </main>
    </>
  );
}
