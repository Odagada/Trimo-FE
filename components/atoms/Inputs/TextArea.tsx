import { InputProps, TextAreaProps } from "@/types/client.types";
import { ForwardedRef, forwardRef } from "react";

const TextArea = (
  { placeholder, id, name, onBlur, onChange }: TextAreaProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) => {
  return (
    <>
      <textarea
        className="flex-1 text-left text-16 leading-24 font-regular focus:outline-none text-black placeholder:text-gray-40"
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

export default forwardRef<HTMLTextAreaElement, InputProps>(TextArea);
