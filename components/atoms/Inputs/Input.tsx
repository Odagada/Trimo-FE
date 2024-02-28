import { InputProps } from "@/types/client.types";
import { ForwardedRef, forwardRef } from "react";

const Input = (
  { placeholder, id, name, onBlur, onChange, type = "text" }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) => {
  return (
    <>
      <input
        className="flex-1 text-left text-16 font-regular leading-24 text-black placeholder:text-gray-40 focus:outline-none"
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
