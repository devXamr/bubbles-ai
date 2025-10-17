"use client";

import { Moon, Sun } from "lucide-react";
import { useState } from "react";

import Cookie from "js-cookie";
import next from "next";

type ThemeToggleButtonProps = {
  initialTheme: string;
};

export default function ThemeToggleButton({
  initialTheme,
}: ThemeToggleButtonProps) {
  const [theme, setTheme] = useState(initialTheme);

  function handleThemeChange() {
    const nextTheme = theme === "light" ? "dark" : "light";

    setTheme(nextTheme);

    localStorage.setItem("app-theme", JSON.stringify(nextTheme));

    Cookie.set("color-theme", nextTheme, {
      expires: 1000,
    });

    const root = document.documentElement;

    root.setAttribute("data-theme", nextTheme);
  }

  return (
    <button
      className="border px-2 py-2 rounded-md border-gray-200  dark:border-[#2E2E2E] cursor-pointer text-gray-500"
      onClick={() => {
        handleThemeChange();
      }}
    >
      {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}
