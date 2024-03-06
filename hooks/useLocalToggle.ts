import { useState } from "react";

const useLocalToggle = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return { isOpen, handleToggleOpen };
};

export default useLocalToggle;
