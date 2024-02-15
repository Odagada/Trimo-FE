import { createPortal } from "react-dom";
import SearchBar from "../atoms/Inputs/SearchBar";
import { useLayoutEffect, useState } from "react";

const PortalSearchBar = ({ switcher }: { switcher: boolean | undefined }) => {
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (switcher === undefined) return null;

  const heroSecSearchBar = document.getElementById("heroSecSearchBar") as HTMLSpanElement;
  const navSearchBar = document.getElementById("navSearchBar") as HTMLSpanElement;

  return createPortal(
    <SearchBar size={`${switcher ? "large" : "small"}`} />,
    switcher ? heroSecSearchBar : navSearchBar
  );
};

export default PortalSearchBar;
