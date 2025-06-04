"use client";

import { useState } from "react";
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
import ReactMarkdown from "react-markdown";
import { conversation } from "./OpenAIConfig";
import { OptionsDropDown } from "@/components/OptionsDropdown";
import { copyToClipboard } from "@/lib/utils";

const Output = ({ text }: { text: string }) => {
  return (
      <div className="relative rounded-md border border-gray-300 w-full min-h-[100px] max-h-[300px] overflow-y-auto mt-4 p-3">
        <Button
            variant="outline"
            className="absolute right-2 top-2"
            onClick={() => {
              copyToClipboard(text);
            }}
        >
          <CopyIcon />
        </Button>
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
  );
};

const OpenAi = ({ text, save, savePdf }: { text: string; save: () => void, savePdf: () => void }) => {
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const FetchAI = async (prompt: string) => {
    const message = `${prompt}\n${userInput}`;
    const completion = await conversation(message);
    setResult(completion);
  };

  async function handleClick() {
    setResult("");
    setLoading(true);
    await FetchAI(text);
    setLoading(false);
  }

  return (
      <OptionsDropDown saveFn={save} savePdfFn={savePdf}>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="w-full flex items-center justify-start gap-2 px-2 py-1 text-left">
              <SparklesIcon className="h-4 w-4 text-gray-700" aria-hidden="true" />
              <span className="font-normal">Generate</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="z-[200]">
            <SheetHeader>
              <SheetTitle>Wiz-word</SheetTitle>
              <SheetDescription>
                Tap into AI&apos;s potential for smarter suggestions, taking your ideas to the next level.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="selection">Selection</Label>
                <Textarea id="selection" value={text} disabled />
              </div>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="prompt">Prompt</Label>
                <Textarea
                    id="prompt"
                    placeholder="Type your message here."
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
      </OptionsDropDown>
  );
};

export default OpenAi;