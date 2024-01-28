"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ReloadIcon, CopyIcon } from "@radix-ui/react-icons";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { SparklesIcon } from "@heroicons/react/20/solid";

import OpenAI from "openai";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import Options from "./Options";
import { openai } from "./OpenAIConfig";

const CopyToClipboard = (data: any) => {
  navigator.clipboard.writeText(data);
};

const Output = ({ text }) => {
  return (
    <div className="rounded-md border border-gray-300 w-full min-h-[100px] max-h-[300px] overflow-y-auto mt-4 p-3">
      <Button
        variant="outline"
        className="absolute right-9"
        onClick={() => {
          CopyToClipboard(text);
        }}
      >
        <CopyIcon />
      </Button>
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
};

const OpenAi = ({ text, save }) => {
  const [userInput, setUserInput] = useState();
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // const openai = new OpenAI({
  //   apiKey: process.env.API_KEY,
  //   dangerouslyAllowBrowser: true,
  // });

  const FetchAI = async (text: String) => {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: `${text}\n${userInput}` }],
      model: "gpt-3.5-turbo",
    });

    setResult(completion.choices[0].message.content);
  };

  async function handleClick() {
    setResult("");
    setLoading(true);
    await FetchAI(text);
    setLoading(false);
  }

  return (
    <div>
      <Sheet>
        <SheetTrigger
          asChild
          className="fixed top-[9px] z-[100] right-[7.5rem]"
        >
          <Button variant="ghost">
            <SparklesIcon
              className="h-5 w-5 text-gray-700"
              aria-hidden="true"
            />
          </Button>
        </SheetTrigger>
        <SheetContent side={"right"} className="z-[200]">
          <SheetHeader>
            <SheetTitle>Wiz-word</SheetTitle>
            <SheetDescription>
              Tap into AI&apos;s potential for smarter suggestions, taking your
              ideas to the next level.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">Selection</Label>
              <Textarea id="message" value={text} disabled />
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">Prompt</Label>
              <Textarea
                placeholder="Type your message here."
                id="message"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
            </div>
          </div>
          <SheetFooter>
            <Button className="w-full" disabled={loading} onClick={handleClick}>
              {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
              Get Suggestions
            </Button>
          </SheetFooter>
          {result && <Output text={result} />}
          {loading && (
            <div className="space-y-2 mt-5">
              <Skeleton className="h-4 w-full bg-slate-300" />
              <Skeleton className="h-4 w-full bg-slate-300" />
              <Skeleton className="h-4 w-[90%] bg-slate-300" />
            </div>
          )}
        </SheetContent>
      </Sheet>
      <Options copy={CopyToClipboard} save={save} />
    </div>
  );
};

export default OpenAi;
