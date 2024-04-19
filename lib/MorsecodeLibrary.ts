interface MorseCodeDictionary {
  [key: string]: string;
}

export type MorseCodeType = "International" | "American" | "Continental";

// International Morse Code Dictionary
const internationalMorseToEnglish: MorseCodeDictionary = {
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
  ".-.-.-": ".",
  "--..--": ",",
  "..--..": "?",
  ".----.": "'",
  "-.-.--": "!",
  "-..-.": "/",
  "-.--.": "(",
  "-.--.-": ")",
  ".-...": "&",
  "---...": ":",
  "-.-.-.": ";",
  "-...-": "=",
  ".-.-.": "+",
  "-....-": "-",
  "..--.-": "_",
  ".-..-.": '"',
  "...-..-": "$",
  ".--.-.": "@",
  "//": " ",
};

// American Morse Code Dictionary (Simplified example, fill in with actual codes)
const americanMorseToEnglish: MorseCodeDictionary = {
  ".-": "A",
  "-...": "B",
  ".. .": "C",
  "-..": "D",
  ".": "E",
  ".-.": "F",
  "--.": "G",
  "....": "H",
  "..": "I",
  "-.-.": "J",
  "-.-": "K",
  "⸺": "L",
  "--": "M",
  "-.": "N",
  ". .": "O",
  ".....": "P",
  "..-.": "Q",
  ". ..": "R",
  "...": "S",
  "-": "T",
  "..-": "U",
  "...-": "V",
  ".--": "W",
  ".-..": "X",
  ".. ..": "Y",
  "... .": "Z",
  ".--.": "1",
  "..-..": "2",
  "...-.": "3",
  "....-": "4",
  "---": "5",
  "......": "6",
  "--..": "7",
  "-....": "8",
  "-..-": "9",
  "⸻": "0",
  "..--..": ".",
  ".-.-": ",",
  "-.- . .": ":",
  "-..-.": "?",
  "..-. .-..": "'",
  "... .-..": "-",
  "..- -": "/",
  "..... -.": "(",
  "..... .. ..": ")",
  "..-. -.": '"',
  ". ...": "&",
  "---.": "!",
  "... ..": ";",
  "//": " ",
};

// Continental Morse Code Dictionary (Assuming similarity to International for example)
const continentalMorseToEnglish: MorseCodeDictionary = {
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
  "·-·-": "Æ",
  "---·": "Ø",
  "·--·-": "Å",
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
  ".-.-.-": ".",
  "--..--": ",",
  "..--..": "?",
  ".----.": "'",
  "-.-.--": "!",
  "-..-.": "/",
  "-.--.": "(",
  "-.--.-": ")",
  ".-...": "&",
  "---...": ":",
  "-.-.-.": ";",
  "-...-": "=",
  ".-.-.": "+",
  "-....-": "-",
  "..--.-": "_",
  ".-..-.": '"',
  "...-..-": "$",
  ".--.-.": "@",
  "//": " ",
};

// A function to get the appropriate dictionary based on Morse code type
export function getDictionaryByType(type: MorseCodeType): MorseCodeDictionary {
  switch (type) {
    case "American":
      return americanMorseToEnglish;
    case "Continental":
      return continentalMorseToEnglish;
    case "International":
    default:
      return internationalMorseToEnglish;
  }
}

// Function to translate Morse code to text based on the selected Morse code type
export const translateMorseToText = (
  morseCode: string,
  type: MorseCodeType
): string => {
  const dictionary = getDictionaryByType(type);
  return morseCode
    .trim()
    .split("   ")
    .map((word) =>
      word
        .split(" ")
        .map(
          (character) =>
            dictionary[character] || `� (Invalid Morse Code for ${type} Morse)`
        )
        .join("")
    )
    .join(" ");
};

// Function to translate text to Morse code, adjustable for Morse code type
export const translateTextToMorse = (
  text: string,
  type: MorseCodeType
): string => {
  const dictionary = getDictionaryByType(type);
  const reverseDictionary = Object.fromEntries(
    Object.entries(dictionary).map(([k, v]) => [v, k])
  );
  return text
    .toUpperCase()
    .split("")
    .map(
      (char) => reverseDictionary[char] || `� (Invalid text for ${type} Morse)`
    )
    .join(" ");
};
