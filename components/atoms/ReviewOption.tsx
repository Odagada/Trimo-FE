import { ReactNode } from "react";

function OptionTitle({ children }: { children: ReactNode }) {
  return <div className="heading6">{children}</div>;
}

function OptionDescription({ children }: { children: ReactNode }) {
  return <div className="small-text flex gap-22 text-gray-40">{children}</div>;
}

function OptionInfo({ children }: { children: ReactNode }) {
  return <div className="flex w-100 flex-col gap-10 break-keep">{children}</div>;
}
function OptionError({ children }: { children: ReactNode }) {
  return <div className="middle-text font-bold text-error">{children}</div>;
}

function OptionSection({ children }: { children: ReactNode }) {
  return <div className="flex items-end gap-10">{children}</div>;
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
