import { InputWrapperProps } from "@/types/client.types";

function InputWrapper({ title, htmlFor, className = "", errors, children, divOptions }: InputWrapperProps) {
  return (
    <div className={`flex flex-col w-full gap-10 relative ${divOptions}`}>
      {title && <p className="text-primary-900 heading5">{title}</p>}
      <label
        htmlFor={htmlFor}
        className={`${
          errors ? "border-error" : "border-gray-300 focus-within:border-primary-600"
        }  flex w-full flex-row item-center rounded-10 px-16 py-12 bg-white border border-solid tab:px-16 tab:py-14 ${className} `}
      >
        {children}
      </label>
      {errors && <div className="text-error middle-text absolute -bottom-24 left-3">{errors?.message}</div>}
    </div>
  );
}

export default InputWrapper;
