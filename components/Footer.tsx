import Link from "next/link";
import { Separator } from "./ui/separator";

const Footer = () => {
  return (
    <>
      <Separator />
      <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
        <h2 className="text-lg font-semibold">MorseGen.</h2>
        <div className="hidden lg:flex items-center space-x-2 opacity-25">
          <p>Jonas Bang,</p>
          <p>Nicklas Møller-Johansen,</p>
          <p>Jonas Jessen,</p>
          <p>Christian Ludvigsen</p>
        </div>
        <div className="flex items-center space-x-2">
          <Link
            href="https://docs.google.com/document/d/1RHj8yu3nZ60KccH6h7XfJhLiaQ0N6tzIxOTJyBrVYQc/edit?usp=sharing"
            target="_blank"
          >
            Se vores rapport her
          </Link>
        </div>
      </div>
    </>
  );
};

export default Footer;
