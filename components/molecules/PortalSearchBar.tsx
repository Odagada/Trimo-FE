import { createPortal } from "react-dom";
import { ReactNode, useLayoutEffect, useState } from "react";

const PortalSearchBar = ({ switcher, children }: { switcher: boolean | undefined; children: ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (switcher === undefined) return null;

  const heroSecSearchBar = document.getElementById("heroSecSearchBar") as HTMLSpanElement;
  const navSearchBar = document.getElementById("navSearchBar") as HTMLSpanElement;

  return createPortal(children, switcher ? heroSecSearchBar : navSearchBar);
};

export default PortalSearchBar;
