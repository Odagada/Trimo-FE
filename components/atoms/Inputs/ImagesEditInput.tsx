import { EditReview, ImageType } from "@/types/client.types";
import Image from "next/image";
import { ChangeEvent, DragEvent, useRef, useState } from "react";
import DeleteIcon from "../icons/DeleteIcon";
import { UseFieldArrayAppend } from "react-hook-form";
import cameraIcon from "@/public/icons/cameraIcon.svg";

interface Props {
  fileValue: { file: File }[];
  fileAppend: UseFieldArrayAppend<EditReview, "newImages">;
  fileRemove: (index?: number | number[]) => void;
  showValue: ImageType[];
  showAppend: UseFieldArrayAppend<EditReview, "images">;
  showRemove: (index?: number | number[]) => void;
}

export default function ImagesEditInput({
  fileValue,
  fileAppend,
  fileRemove,
  showValue,
  showAppend,
  showRemove,
}: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (files === null) return;
    for (let i = 0; i < files.length; i++) {
      if (!showValue.some((el) => el.name === files[i].name)) {
        showAppend({ name: files[i].name, url: URL.createObjectURL(files[i]) });
        fileAppend({ file: files[i] });
      }
    }
  };

  const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    handleFiles(files);
  };

  const deleteFile = (idx: number) => {
    showRemove(idx);
    if (idx + fileValue.length - showValue.length >= 0) {
      fileRemove(idx + fileValue.length - showValue.length);
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setIsDragging(true);
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  return (
    <div className="middle-text flex w-full flex-col mobile:items-end">
      <input
        type="file"
        id="imageUpload"
        style={{ display: "none" }}
        multiple={true}
        accept="image/*"
        onChange={selectFile}
        ref={inputRef}
      />
      <button
        role="button"
        className={`flex w-fit items-center justify-center rounded-10 border border-gray-20 px-12 py-4 tablet:h-131 tablet:w-full tablet:border-dashed tablet:border-black ${
          isDragging && "bg-gray-30"
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => {
          inputRef.current?.click();
        }}
        type="button"
      >
        <div className="pointer-events-none hidden tablet:block">
          {isDragging ? "이곳에 드롭해주세요" : "클릭 혹은 파일을 드롭해주세요"}
        </div>
        <Image src={cameraIcon} alt="cameraIcon" className="tablet:hidden" />
      </button>
      <div className="mt-8 flex h-90 w-full gap-8 overflow-scroll tablet:grid tablet:h-full tablet:grid-cols-10 scrollbar-hide">
        {showValue.map((el, idx) => (
          <div className="rounded-lg relative aspect-square max-w-90" key={idx}>
            <button
              className="bg-gray-900 absolute right-0 top-0 z-10 flex size-24 cursor-pointer items-center justify-center rounded-full text-white"
              onClick={() => deleteFile(idx)}
              type="button"
            >
              <DeleteIcon />
            </button>
            <Image draggable={false} src={el.url} alt={el.name} sizes="75px" fill style={{ objectFit: "cover" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
