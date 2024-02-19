import { ReactNode } from "react";

function OptionTitle({ children }: { children: ReactNode }) {
  return <div className="heading6 p-10">{children}</div>;
}

function OptionDescription({ children }: { children: ReactNode }) {
  return <div className="flex gap-22 small-text text-gray-40 text-start mx-10 w-100 flex-shrink-0">{children}</div>;
}

function OptionInfo({ children }: { children: ReactNode }) {
  return <div className="flex gap-12">{children}</div>;
}
function OptionError({ children }: { children: ReactNode }) {
  return <div className="text-error middle-text font-bold">{children}</div>;
}

function OptionSection({ children }: { children: ReactNode }) {
  return <div className="">{children}</div>;
}

function OptionMain({ children }: { children: ReactNode }) {
  return <div className="flex flex-col px-20 pt-16 pb-24 w-620 bg-white rounded-30 shadow-main gap-35">{children}</div>;
}

export const SearchOption = Object.assign(OptionMain, {
  section: OptionSection,
  title: OptionTitle,
  description: OptionDescription,
  info: OptionInfo,
  error: OptionError,
});
