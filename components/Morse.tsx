"use client";

import React, { useState } from "react";
import { translateMorseToText, translateTextToMorse } from "./MorsecodeLibrary";

const MorseCodeTranslator: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [translatedText, setTranslatedText] = useState<string>("");
  const [translationDirection, setTranslationDirection] = useState<
    "toText" | "toMorse"
  >("toText");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleDirectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTranslationDirection(event.target.value as "toText" | "toMorse");
  };

  const handleTranslation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const translation =
      translationDirection === "toText"
        ? translateMorseToText(input)
        : translateTextToMorse(input);
    setTranslatedText(translation);
  };

  return (
    <div>
      <h1>Morse Code Translator</h1>
      <form onSubmit={handleTranslation}>
        <select
          value={translationDirection}
          onChange={handleDirectionChange}
          aria-label="Translation Direction"
        >
          <option value="toText">Morse to English</option>
          <option value="toMorse">English to Morse</option>
        </select>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder={
            translationDirection === "toText"
              ? "Enter Morse Code"
              : "Enter English Text"
          }
        />
        <button type="submit">Translate</button>
      </form>
      <div>
        <h2>Translation</h2>
        <p>{translatedText}</p>
      </div>
    </div>
  );
};

export default MorseCodeTranslator;
