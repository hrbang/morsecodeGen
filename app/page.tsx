// Brug "use client" for at sikre, at koden kun kører i browseren.
"use client";

// Importer komponenter fra din projektstruktur.
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import Sidebar from "@/components/Sidebar";
import { Textarea } from "@/components/ui/textarea";
// Importer funktioner til at oversætte mellem tekst og morsekode, samt en type definition.
import {
  MorseCodeType,
  translateMorseToText,
  translateTextToMorse,
} from "@/lib/MorsecodeLibrary";
import { useState } from "react";

export default function Home() {
  // Opretter tilstandsvariabler til at gemme inputtekst, den oversatte tekst, retning af oversættelse, og typen af morsekode.
  const [input, setInput] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [translationDirection, setTranslationDirection] = useState("toText");
  const [morseCodeType, setMorseCodeType] =
    useState<MorseCodeType>("International");

  // Funktion til at håndtere ændringer i input-feltet. Den oversætter teksten baseret på den valgte retning og morsekode type.
  const handleInputChange = (event: any) => {
    const inputValue = event.target.value;
    setInput(inputValue);

    if (translationDirection === "toText") {
      // Splitter inputtet baseret på "//" for at adskille morsekodord og oversætter hvert ord.
      const morseWords = inputValue.split("//");
      const translatedWords = morseWords.map((morseWord: string) => {
        const morseLetters = morseWord.trim().split("/");
        return morseLetters
          .map((morseLetter: string) =>
            translateMorseToText(` ${morseLetter} `, morseCodeType)
          )
          .join("");
      });
      // Samler de oversatte ord til en sammenhængende tekststreng.
      const formattedTranslation = translatedWords.join(" ");
      setTranslatedText(formattedTranslation);
    } else {
      // Splitter inputtet ved mellemrum for at finde ord, oversætter hvert ord til morsekode, og indsætter "/" mellem hvert tegn i ordet.
      const words = inputValue.split(" ");
      const morseWords = words.map((word: string) => {
        if (word === "") return "";
        return translateTextToMorse(word, morseCodeType).split(" ").join("/");
      });
      // Samler de oversatte morsekodord med "//" mellem hvert ord.
      const formattedTranslation = morseWords
        .filter((word: string) => word !== "")
        .join("//");
      setTranslatedText(formattedTranslation);
    }
  };

  // Funktion til at ændre typen af morsekode, nulstiller input og den oversatte tekst.
  const handleMorseCodeTypeChange = (value: any) => {
    setMorseCodeType(value);
    setInput("");
    setTranslatedText("");
  };

  return (
    <>
      <div className="hidden h-dvh flex-col md:flex">
        <Navigation />
        <div className="container h-full py-6 flex-1 max-h-[calc(100vh-120px)]">
          <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_400px]">
            <Sidebar
              morseCodeType={morseCodeType}
              handleMorseCodeTypeChange={handleMorseCodeTypeChange}
              setTranslationDirection={setTranslationDirection}
              translateDirection={translationDirection}
            />
            <div className="md:order-1">
              <div className="flex h-full flex-col space-y-4">
                <div className="grid h-full gap-6 lg:grid-rows-2">
                  <div className="flex h-full flex-col space-y-4">
                    <div className="flex h-full flex-1 flex-col space-y-2">
                      <Textarea
                        id="input"
                        placeholder={
                          translationDirection === "toText"
                            ? "Indtast morsekode"
                            : "Indtast tekst"
                        }
                        className="min-h-full text-sm flex-1"
                        value={input}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="rounded-md border bg-muted">
                    <div className="flex flex-1 flex-col space-y-2">
                      <Textarea
                        id="translation"
                        disabled
                        className="text-sm flex-1 h-full bg-muted"
                        value={translatedText}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
