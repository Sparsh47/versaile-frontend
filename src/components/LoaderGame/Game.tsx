"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { shuffleArray } from "@/lib/utils";
import { SENTENCES } from "@/constants";

const LOADER_TEXTS = [
    "Getting backend ready...",
    "Gathering your documents...",
    "Optimizing collaboration tools...",
    "Loading AI editing engine...",
    "Almost there..."
];

export default function Game({
                                 isReady,
                                 show,
                             }: {
    isReady: boolean;
    show: Dispatch<SetStateAction<boolean>>;
}) {
    const [loaderIndex, setLoaderIndex] = useState(0);
    useEffect(() => {
        const id = setInterval(() => {
            setLoaderIndex((i) => (i + 1) % LOADER_TEXTS.length);
        }, 10000);
        return () => clearInterval(id);
    }, []);

    const [shuffledSentences, setShuffledSentences] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [poolWords, setPoolWords] = useState<string[]>([]);
    const [slots, setSlots] = useState<(string | null)[]>([]);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState<"none" | "correct" | "incorrect">("none");

    useEffect(() => {
        const shuffled = shuffleArray(SENTENCES);
        setShuffledSentences(shuffled);
        setCurrentIndex(0);
    }, []);

    useEffect(() => {
        if (!shuffledSentences.length) return;
        const sentenceWords = shuffledSentences[currentIndex].split(" ");
        setPoolWords(shuffleArray(sentenceWords));
        setSlots(Array(sentenceWords.length).fill(null));
        setFeedback("none");
    }, [currentIndex, shuffledSentences]);

    function handlePoolTap(word: string, poolIndex: number) {
        if (feedback === "correct") return;
        const firstEmpty = slots.indexOf(null);
        if (firstEmpty === -1) return;
        setSlots((prev) => {
            const next = [...prev];
            next[firstEmpty] = word;
            return next;
        });
        setPoolWords((prev) => {
            const next = [...prev];
            next.splice(poolIndex, 1);
            return next;
        });
    }

    function handleSlotTap(slotIndex: number) {
        if (feedback === "correct") return;
        const word = slots[slotIndex];
        if (!word) return;
        setSlots((prev) => {
            const next = [...prev];
            next[slotIndex] = null;
            return next;
        });
        setPoolWords((prev) => [...prev, word]);
    }

    useEffect(() => {
        if (!shuffledSentences.length) return;
        if (slots.length === 0) return;
        if (slots.includes(null)) return;
        const originalWords = shuffledSentences[currentIndex].split(" ");
        const allCorrect = slots.every((w, i) => w === originalWords[i]);
        if (allCorrect) {
            setFeedback("correct");
            setScore((s) => s + 1);
            setTimeout(() => {
                const nextIndex = currentIndex + 1;
                if (nextIndex < shuffledSentences.length) {
                    setCurrentIndex(nextIndex);
                } else {
                    const reshuffled = shuffleArray(SENTENCES);
                    setShuffledSentences(reshuffled);
                    setCurrentIndex(0);
                }
                setFeedback("none");
            }, 1000);
        } else {
            setFeedback("incorrect");
            setTimeout(() => {
                const sentenceWords = shuffledSentences[currentIndex].split(" ");
                setPoolWords(shuffleArray(sentenceWords));
                setSlots(Array(sentenceWords.length).fill(null));
                setFeedback("none");
            }, 1000);
        }
    }, [slots, currentIndex, shuffledSentences]);

    const getRandomAngle = () => `${Math.floor(Math.random() * 11) - 5}deg`;

    return (
        <div className="relative flex flex-col items-center justify-center w-full h-screen bg-gradient-to-br from-indigo-50 to-violet-50 px-4 sm:px-6 lg:px-8 py-6 overflow-hidden">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-violet-300 opacity-50 rounded-full"></div>
            <div className="absolute top-8 right-[-50%] sm:right-[-10%] w-80 h-80 bg-indigo-300 opacity-30 rotate-45"></div>

            <div className="hidden xl:block absolute bottom-16 left-12 w-0 h-0 border-l-[60px] border-r-[60px] border-b-[100px] border-l-transparent border-r-transparent border-b-fuchsia-300 opacity-30"></div>
            <div className="hidden xl:block absolute bottom-[-10%] right-16 w-80 h-40 bg-pink-200 opacity-25 rotate-12"></div>
            <div className="hidden xl:block absolute top-[30%] left-[50%] w-48 h-48 bg-blue-200 opacity-35 rounded-[20%]"></div>
            <div className="hidden xl:block absolute top-[60%] right-[40%] w-64 h-64 bg-green-200 opacity-20 rounded-full"></div>
            <div className="hidden xl:block absolute top-[15%] left-[30%] w-40 h-20 bg-yellow-200 opacity-30 skew-x-12"></div>

            <div className="absolute top-[50%] left-[-5%] w-56 h-56 bg-red-200 opacity-25 rounded-tl-full rounded-tr-full"></div>
            <div className="absolute bottom-[-5%] left-[40%] w-48 h-48 bg-teal-200 opacity-30 rotate-12"></div>
            <div className="absolute bottom-[20%] right-[20%] w-32 h-32 bg-orange-200 opacity-30 rounded-[15%]"></div>

            <div className="relative z-10 flex flex-col items-center mb-6">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-indigo-800 text-center">
                    {isReady ? "Click the button below to go to the main website" : "Play this game while we get your backend ready"}
                </h1>
            </div>

            <div className="relative z-10 flex flex-col items-center mb-8">
                <div className="text-xs sm:text-sm md:text-base text-indigo-700 uppercase tracking-wide">
                    Score
                </div>
                <div className="mt-2 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center bg-gradient-to-tr from-violet-300 to-indigo-300 rounded-full shadow-lg">
          <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-indigo-900">
            {score}
          </span>
                </div>
            </div>

            {feedback === "correct" && isReady && (
                <div className="relative z-10 mb-4 text-green-700 font-semibold text-center text-base sm:text-lg">
                    Correct! Loading next…
                </div>
            )}
            {feedback === "incorrect" && isReady && (
                <div className="relative z-10 mb-4 text-red-700 font-semibold text-center text-base sm:text-lg">
                    Not quite right. Try again!
                </div>
            )}

            <div className="relative z-10 w-full max-w-3xl flex flex-wrap gap-2 sm:gap-3 md:gap-4 lg:gap-6 justify-center mb-8">
                {slots.map((word, idx) => {
                    const isCorrect =
                        word === shuffledSentences[currentIndex].split(" ")[idx];
                    const baseBg = word
                        ? feedback === "correct"
                            ? "bg-green-200"
                            : feedback === "incorrect" && !isCorrect
                                ? "bg-red-200"
                                : "bg-violet-100"
                        : "bg-transparent";
                    return (
                        <button
                            key={idx}
                            onClick={() => handleSlotTap(idx)}
                            disabled={!slots[idx] || feedback === "correct" || !isReady}
                            className={`min-w-[4.5rem] sm:min-w-[5.5rem] md:min-w-[6rem] px-3 sm:px-4 md:px-5 py-2 sm:py-3 border-2 rounded-lg ${
                                word ? baseBg : "border-dashed border-violet-300"
                            } text-center font-medium text-indigo-800 transform`}
                            style={{
                                transform: word
                                    ? `rotate(${getRandomAngle()}) scale(1.05)`
                                    : undefined,
                                transition: "transform 0.2s ease, background-color 0.2s ease",
                            }}
                        >
                            <span className="text-xs sm:text-sm md:text-base">{word || ""}</span>
                        </button>
                    );
                })}
            </div>

            <div className="relative z-10 w-full max-w-3xl flex flex-wrap gap-2 sm:gap-3 md:gap-4 lg:gap-6 justify-center mb-8">
                {poolWords.map((word, idx) => (
                    <button
                        key={idx}
                        onClick={() => handlePoolTap(word, idx)}
                        disabled={feedback === "correct" || !isReady}
                        className="bg-indigo-200 hover:bg-indigo-300 px-3 sm:px-4 md:px-5 py-2 sm:py-3 rounded-lg text-sm sm:text-base md:text-lg font-medium text-indigo-900 transform hover:scale-105"
                        style={{ transform: `rotate(${getRandomAngle()})` }}
                    >
                        {word}
                    </button>
                ))}
            </div>

            <div className="relative z-10 h-12 flex items-center justify-center">
                {!isReady ? (
                    <div className="text-md sm:text-lg md:text-xl font-medium text-violet-700 animate-pulse">
                        {LOADER_TEXTS[loaderIndex]}
                    </div>
                ) : (
                    <Button
                        variant="default"
                        className="py-2 sm:py-3 px-6 sm:px-8 bg-violet-600 hover:bg-violet-700 text-white text-sm sm:text-base md:text-lg"
                        onClick={() => show(true)}
                    >
                        Go to website
                    </Button>
                )}
            </div>
        </div>
    );
}
