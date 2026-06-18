"use client";

import { createContext, useState } from "react";

export const ThemeContext = createContext({
  tema: "light",
  alternarTema: () => {},
});

export default function ThemeProvider({children,}: { children: React.ReactNode;}) {
    
  const [tema, setTema] = useState("light");

  function alternarTema() {
    if (tema === "light") {
      setTema("dark");
    } else {
      setTema("light");
    }
  }

  return (
    <ThemeContext.Provider
      value={{
        tema,
        alternarTema,
      }}
    >
      <div data-theme={tema}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}