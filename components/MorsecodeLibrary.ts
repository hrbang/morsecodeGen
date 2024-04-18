// morseCodeLibrary.ts

interface MorseCodeDictionary {
  [key: string]: string;
}

const morseToEnglish: MorseCodeDictionary = {
  ".-": "A",
  "-...": "B",
  "-.-.": "C",
  "-..": "D",
  ".": "E",
  "..-.": "F",
  "--.": "G",
  "....": "H",
  "..": "I",
  ".---": "J",
  "-.-": "K",
  ".-..": "L",
  "--": "M",
  "-.": "N",
  "---": "O",
  ".--.": "P",
  "--.-": "Q",
  ".-.": "R",
  "...": "S",
  "-": "T",
  "..-": "U",
  "...-": "V",
  ".--": "W",
  "-..-": "X",
  "-.--": "Y",
  "--..": "Z",
  "-----": "0",
  ".----": "1",
  "..---": "2",
  "...--": "3",
  "....-": "4",
  ".....": "5",
  "-....": "6",
  "--...": "7",
  "---..": "8",
  "----.": "9",
  "/": " ",
};

const englishToMorse: MorseCodeDictionary = Object.keys(morseToEnglish).reduce(
  (acc, morse) => {
    const letter = morseToEnglish[morse];
    acc[letter] = morse;
    return acc;
  },
  {} as MorseCodeDictionary
);

export const translateMorseToText = (morseCode: string): string => {
  return morseCode
    .trim()
    .split("   ")
    .map((word) =>
      word
        .split(" ")
        .map(
          (character) => morseToEnglish[character] || "�" // � indicates an unknown character
        )
        .join("")
    )
    .join(" ");
};

export const translateTextToMorse = (text: string): string => {
  return text
    .toUpperCase()
    .split("")
    .map(
      (char) => englishToMorse[char] || "�" // Use � for characters not in the dictionary
    )
    .join(" ");
};
