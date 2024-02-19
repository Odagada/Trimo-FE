import { ReactNode } from "react";

function OptionTitle({ children }: { children: ReactNode }) {
  return <div className="heading6">{children}</div>;
}

function OptionDescription({ children }: { children: ReactNode }) {
  return <div className="flex gap-22 small-text text-gray-40">{children}</div>;
}

function OptionInfo({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-10 w-100 break-keep">{children}</div>;
}
function OptionError({ children }: { children: ReactNode }) {
  return <div className="text-error middle-text font-bold">{children}</div>;
}

function OptionSection({ children }: { children: ReactNode }) {
  return <div className="flex gap-10 items-end">{children}</div>;
}

function OptionMain({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-2 gap-60">{children}</div>;
}

export const ReviewOption = Object.assign(OptionMain, {
  section: OptionSection,
  title: OptionTitle,
  description: OptionDescription,
  info: OptionInfo,
  error: OptionError,
});
