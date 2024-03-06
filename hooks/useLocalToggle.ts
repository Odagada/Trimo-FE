import { useState } from "react";

const useLocalToggle = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return { isOpen, setIsOpen, handleModalToggle };
};

export default useLocalToggle;
