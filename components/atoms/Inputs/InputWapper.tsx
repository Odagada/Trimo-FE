import { InputWrapperProps } from "@/types/client.types";

function InputWrapper({ title, htmlFor, className = "", errors, children, divOptions }: InputWrapperProps) {
  return (
    <div className={`relative flex w-full flex-col gap-10 ${divOptions}`}>
      {title && <p className="text-primary-900 heading5">{title}</p>}
      <label
        htmlFor={htmlFor}
        className={`${
          errors ? "border-error" : "border-gray-300 focus-within:border-primary-600"
        }  item-center tab:px-16 tab:py-14 flex w-full flex-row rounded-10 border border-solid bg-white px-16 py-12 ${className} `}
      >
        {children}
      </label>
      {errors && <div className="absolute -bottom-26 text-error">{errors?.message}</div>}
    </div>
  );
}

export default InputWrapper;
