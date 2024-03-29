import { InputWrapperProps } from "@/types/client.types";

function InputWrapper({ title, htmlFor, className = "", errors, children, divOptions }: InputWrapperProps) {
  return (
    <div className={`relative flex w-full flex-col gap-10 maxTablet:gap-4 ${divOptions}`}>
      {title && <p className="text-primary-900 heading5 maxTablet:text-14">{title}</p>}
      <label
        htmlFor={htmlFor}
        className={`${
          errors ? "border-error" : "border-gray-300 focus-within:border-primary-600"
        }  item-center tab:px-16 tab:py-14 flex w-full flex-row rounded-10 border border-solid bg-white px-16 py-12 maxTablet:text-14 ${className} `}
      >
        {children}
      </label>
      {errors && <div className="middle-text absolute -bottom-24 left-3 text-error">{errors?.message}</div>}
    </div>
  );
}

export default InputWrapper;
