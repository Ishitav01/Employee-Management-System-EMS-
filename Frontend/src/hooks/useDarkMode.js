import { useEffect, useState } from "react";

const useDarkMode = () => {
  const [dark, setDark] = useState(() => {
    return JSON.parse(localStorage.getItem("darkMode")) || false;
  });

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", JSON.stringify(dark));
  }, [dark]);

  return { dark, setDark };
};

export default useDarkMode;
