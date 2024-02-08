import { InputProps } from "@/types/client.types";
import { ForwardedRef, forwardRef } from "react";

const Input = (
  { placeholder, id, name, onBlur, onChange, type = "text" }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) => {
  return (
    <>
      <input
        className="flex-1 text-left text-16 leading-24 font-regular focus:outline-none text-black placeholder:text-gray-40"
        type={type}
        id={id}
        ref={ref}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
};

export default forwardRef<HTMLInputElement, InputProps>(Input);
