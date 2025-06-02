"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { Button } from "@/components/ui/button";
import "./globals.css";
import Navbar from "../components/Navbar";
import Image from "next/image";
import hero from "../../public/hero.png";
import line from "../../public/line.png";
import {PlusIcon, PencilSquareIcon} from "@heroicons/react/16/solid";

export default function Home() {
  const [url, setUrl] = useState("");
  const router = useRouter();

  return (
        <div className="relative overflow-hidden min-h-screen">
            <div
                className="absolute w-[800px] h-[800px] bg-[#7752FE] rounded-full top-[-300px] left-[-200px] z-[-20] blur-[150px]"
            ></div>

            <div
                className="absolute w-[800px] h-[800px] bg-[#7752FE] rounded-full top-[600px] right-[100px] z-[-20] blur-[150px]"
            ></div>

            <div
                className="absolute w-[300px] h-[300px] bg-[#7752FE] rounded-full bottom-[-500px] left-[10px] z-[-20] blur-[130px]"
            ></div>
      <Navbar />
      <main
        className="flex flex-col items-center gap-12 pt-48 sm:py-24 px-5 sm:px-12 md:p-24"
        style={{ height: "calc(100vh - 80px)" }}
      >
        <div className="flex flex-col items-center">
          <div className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-center">
            Make Documents.
            <br />
            <span className="flex justify-center">
              Create&nbsp;
              <span className="relative flex flex-col items-center mb-12">
                Impact.
                <Image
                    src={line}
                    alt="underline"
                    width={370}
                    className="-bottom-5 sm:-bottom-10 lg:-bottom-12 xl:-bottom-16 z-[-1] absolute"
                />
              </span>
            </span>
          </div>
          <div
            className="text-center -mt-5 font-medium text-base sm:text-[22px] leading-5 sm:leading-7"
          >
            Collaborate Effortlessly, Create Together: Your Words, Supercharged
            by AI. <br className="sm:block hidden" />
            Empowering Teamwork with our Text Editor.
          </div>
        </div>
          <div
              className="md:hidden flex w-full items-center space-x-2 rounded-[100px]  border border-gray-600 pr-[5px]"
              style={{
                  boxShadow: "2px 4px 12px rgba(0, 0, 0, 0.2)",
              }}
          >
              <input
                  type="url"
                  placeholder="Your link"
                  className="h-[50px] w-full outline-none border-none pl-5 bg-transparent placeholder:text-gray-700"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
              />
              <div className="flex items-center justify-center gap-1">
                  <Button
                      className="h-[40px] rounded-l-full rounded-r-md font-medium text-md"
                      type="submit"
                      onClick={() => router.push(url)}
                  >
                      Join
                  </Button>
                  <Button
                      className="h-[40px] rounded-r-full rounded-l-md font-medium text-md"
                      type="submit"
                      onClick={() => router.push(url)}
                  >
                      <PlusIcon className="w-5 h-5 text-white" />
                  </Button>
              </div>
          </div>
        <div className="hidden md:flex items-center gap-5">
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
              className="w-full max-w-screen-xl h-auto rounded-[20px] shadow-xl border border-gray-200 object-cover"
              style={{ boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)" }}
          />
      </main>
    </div>
  );
}
