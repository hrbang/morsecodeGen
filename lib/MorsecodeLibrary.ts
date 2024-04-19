// Interface til at definere strukturen af en morsekode ordbog.
interface MorseCodeDictionary {
  [key: string]: string; // Nøglen er morsekoden, og værdien er det tilsvarende tegn.
}

// Type definition, der specificerer gyldige typer af morsekoder.
export type MorseCodeType = "International" | "American" | "Continental";

// Ordbog for International Morse Code med morsekoden som nøgle og det tilsvarende alfabetiske tegn som værdi.
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
  "//": " ", // Særlig repræsentation for mellemrum mellem ord.
};

// American Morse Code ordbog (forenklet eksempel, udfyld med faktiske koder)
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
  "//": " ", // Særlig repræsentation for mellemrum mellem ord.
};

// Continental Morse Code ordbog (Antaget at være lignende til International for dette eksempel)
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
  "//": " ", // Særlig repræsentation for mellemrum mellem ord.
};

// Funktion til at hente den passende ordbog baseret på valgt type af morsekode.
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

// Funktion til at oversætte morsekode til tekst baseret på den valgte morsekode type.
export const translateMorseToText = (
  morseCode: string,
  type: MorseCodeType
): string => {
  const dictionary = getDictionaryByType(type); // Henter den relevante ordbog.
  return morseCode
    .trim() // Fjerner whitespace fra start og slut.
    .split("   ") // Splitter på tre mellemrum for at adskille ord.
    .map(
      (word) =>
        word
          .split(" ") // Splitter hvert ord på et enkelt mellemrum for at adskille tegn.
          .map(
            (character) =>
              dictionary[character] ||
              `� (Invalid Morse Code for ${type} Morse)` // Oversætter hvert tegn eller viser en fejl.
          )
          .join("") // Samler tegnene i et ord.
    )
    .join(" "); // Samler ordene til en sammenhængende tekst.
};

// Funktion til at oversætte tekst til morsekode, justerbar for morsekode type.
export const translateTextToMorse = (
  text: string,
  type: MorseCodeType
): string => {
  const dictionary = getDictionaryByType(type); // Henter den relevante ordbog.
  const reverseDictionary = Object.fromEntries(
    Object.entries(dictionary).map(([k, v]) => [v, k]) // Opretter en omvendt ordbog for oversættelse fra tekst til morsekode.
  );
  return text
    .toUpperCase() // Konverterer tekst til store bogstaver.
    .split("") // Splitter teksten i individuelle tegn.
    .map(
      (char) => reverseDictionary[char] || `� (Invalid text for ${type} Morse)` // Oversætter hvert tegn eller viser en fejl.
    )
    .join(" "); // Samler morsekoden med mellemrum mellem hvert tegn.
};
