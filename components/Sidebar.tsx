import { useMemo } from "react";
import { getDictionaryByType } from "../lib/MorsecodeLibrary";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Label } from "./ui/label";
import { ScrollArea } from "./ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

// Definerer en interface for props, som Sidebar-komponenten forventer at modtage.
interface ISidebar {
  morseCodeType: any;
  translateDirection: any;
  setTranslationDirection: any;
  handleMorseCodeTypeChange: (value: any) => void;
}

// Sidebar-komponenten, som viser indstillinger og morsekode-ark.
const Sidebar = ({
  morseCodeType,
  translateDirection,
  setTranslationDirection,
  handleMorseCodeTypeChange,
}: ISidebar) => {
  // Bruger useMemo til dynamisk at generere et "morseCodeSheet" baseret på den valgte type af morsekode.
  // Dette sikrer, at arket kun regenereres, når morseCodeType ændres.
  const morseCodeSheet = useMemo(() => {
    // Henter ordbogen for den valgte morsekode type.
    const dictionary = getDictionaryByType(morseCodeType);
    // Mapper ordbogens indgange til et array og sorterer det alfabetisk.
    return Object.entries(dictionary)
      .map(([code, char]) => ({
        code,
        char,
      }))
      .sort((a, b) => a.char.localeCompare(b.char));
  }, [morseCodeType]);

  // Returnerer JSX for Sidebar-komponenten, inklusiv indstillinger for oversættelsesretning og morsekode type,
  // samt et område, der viser morsekoder og deres tilsvarende karakterer.
  return (
    <div className="flex-col space-y-4 sm:flex md:order-2 border-[1px] border-border border-solid p-6 rounded-md relative">
      <h3 className="text-lg font-semibold">Indstillinger</h3>
      <div className="grid gap-2">
        {/* HoverCard-komponenten viser yderligere information, når brugeren holder musen over etiketten. */}
        <HoverCard openDelay={200}>
          <HoverCardTrigger asChild>
            <Label>Mode</Label>
          </HoverCardTrigger>
          <HoverCardContent className="w-[320px] text-sm" side="left">
            Vælg om du vil oversætte fra morse til tekst eller fra tekst
          </HoverCardContent>
        </HoverCard>
        {/* Select-komponenten lader brugeren vælge oversættelsesretning. */}
        <Select
          value={translateDirection}
          onValueChange={setTranslationDirection}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Oversættelses tilstand</SelectLabel>
              <SelectItem value="toText">Morse til Tekst</SelectItem>
              <SelectItem value="toMorse">Tekst til Morse</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        {/* En anden Select-komponent lader brugeren vælge type af morsekode. */}
        <Select value={morseCodeType} onValueChange={handleMorseCodeTypeChange}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Type af Morsekode</SelectLabel>
              <SelectItem value="International">International</SelectItem>
              <SelectItem value="American">Amerikansk</SelectItem>
              <SelectItem value="Continental">Kontinental</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {/* ScrollArea-komponenten viser et scrollbart område med morsekoder og deres tilsvarende karakterer. */}
      <div className="grid gap-2">
        <ScrollArea className="h-96 w-full rounded-md border">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">
              Morsecode sheet
            </h4>
            {/* Mapper over morseCodeSheet-arrayet for at vise hvert par af morsekode og karakter. */}
            {morseCodeSheet.map(({ code, char }) => (
              <div key={code} className="flex justify-between">
                <span>{char}</span>
                <span>{code}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Sidebar;
