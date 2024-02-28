import { InputProps, TextAreaProps } from "@/types/client.types";
import { ForwardedRef, forwardRef } from "react";

const TextArea = (
  { placeholder, id, name, onBlur, onChange }: TextAreaProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) => {
  return (
    <>
      <textarea
        className="h-350 flex-1 resize-none text-left text-16 font-regular leading-24 text-black placeholder:text-gray-40 focus:outline-none"
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
