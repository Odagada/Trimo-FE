import Image from "next/image";
import { ChangeEvent, DragEvent, useState } from "react";

type Image = {
  name: string;
  url: string;
};

export default function ImagesInput() {
  const [isDragging, setIsDragging] = useState(false);
  const [images, setImages] = useState<Image[]>([]);

  const getFiles = (files: FileList | null) => {
    if (files === null) return;
    for (let i = 0; i < files.length; i++) {
      if (!images.some((el) => el.name === files[i].name)) {
        setImages((prev) => [...prev, { name: files[i].name, url: URL.createObjectURL(files[i]) }]);
      }
    }
  };

  const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    getFiles(files);
  };

  const deleteFile = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
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
    getFiles(files);
  };

  return (
    <div className="w-[400px]">
      <input
        type="file"
        id="imageUpload"
        style={{ display: "none" }}
        multiple={true}
        accept="image/*"
        onChange={selectFile}
      />
      <label
        htmlFor="imageUpload"
        className={`w-full h-20 flex justify-center items-center border-[2px] rounded-lg border-gray-400 border-dashed ${
          isDragging ? "bg-slate-300" : ""
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="pointer-events-none">
          {isDragging ? "이곳에 드롭해주세요" : "클릭 혹은 파일을 드롭해주세요"}
        </div>
      </label>
      <div className="grid w-full grid-cols-5 gap-4 mt-4">
        {images.map((el, idx) => (
          <div className="relative overflow-hidden rounded-lg aspect-square" key={idx}>
            <span
              className="h-4 w-4 absolute right-0 z-[2] rounded-full bg-gray-100 flex items-center justify-center cursor-pointer"
              onClick={() => deleteFile(idx)}
            >
              &times;
            </span>
            <Image src={el.url} alt={el.name} sizes="75px" fill style={{ objectFit: "cover" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
