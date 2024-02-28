import { ReactNode } from "react";

function OptionTitle({ children }: { children: ReactNode }) {
  return <div className="heading6 p-10">{children}</div>;
}

function OptionDescription({ children }: { children: ReactNode }) {
  return (
    <div className="small-text mx-10 flex w-100 shrink-0 gap-22 text-start text-gray-40">
      {children}
    </div>
  );
}

function OptionInfo({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-12">{children}</div>;
}
function OptionError({ children }: { children: ReactNode }) {
  return <div className="middle-text font-bold text-error">{children}</div>;
}

function OptionSection({ children }: { children: ReactNode }) {
  return <div className="item-center flex gap-12">{children}</div>;
}

function OptionMain({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-620 flex-col gap-35 rounded-30 bg-white px-20 pb-24 pt-16 shadow-main">
      {children}
    </div>
  );
}

export const SearchOption = Object.assign(OptionMain, {
  section: OptionSection,
  title: OptionTitle,
  description: OptionDescription,
  info: OptionInfo,
  error: OptionError,
});
