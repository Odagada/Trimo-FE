import { ReactNode } from "react";

function OptionTitle({ children }: { children: ReactNode }) {
  return <div className="heading6">{children}</div>;
}

function OptionDescription({ children }: { children: ReactNode }) {
  return <div className="small-text flex gap-22 text-gray-40">{children}</div>;
}

function OptionInfo({ children }: { children: ReactNode }) {
  return <div className="flex tablet:w-100 tablet:flex-col gap-10 break-keep items-center">{children}</div>;
}
function OptionError({ children }: { children: ReactNode }) {
  return <div className="middle-text font-bold text-error">{children}</div>;
}

function OptionSection({ children }: { children: ReactNode }) {
  return <div className="flex tablet:flex-row mobile:flex-col tablet:items-end gap-10">{children}</div>;
}

function OptionMain({ children }: { children: ReactNode }) {
  return <div className="tablet:grid tablet:grid-cols-2 tablet:gap-60 flex flex-col gap-37">{children}</div>;
}

export const ReviewOption = Object.assign(OptionMain, {
  section: OptionSection,
  title: OptionTitle,
  description: OptionDescription,
  info: OptionInfo,
  error: OptionError,
});
