import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Theme = "dark" | "light";
export type ThemeFlavor = "apothecary" | "editorial" | "bauhaus";

interface ThemeContextValue {
  theme: Theme;
  flavor: ThemeFlavor;
  toggle: () => void;
  setFlavor: (f: ThemeFlavor) => void;
  cycleFlavor: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const FLAVOR_ORDER: ThemeFlavor[] = ["apothecary", "editorial", "bauhaus"];

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Default: apothecary in light. Sandboxed iframe can't use localStorage.
  const [theme, setTheme] = useState<Theme>("light");
  const [flavor, setFlavor] = useState<ThemeFlavor>("apothecary");

  useEffect(() => {
    const root = document.documentElement;
    // Theme
    root.classList.toggle("dark", theme === "dark");
    // Flavor — remove all, add active
    FLAVOR_ORDER.forEach((f) => root.classList.remove(`flavor-${f}`));
    root.classList.add(`flavor-${flavor}`);
  }, [theme, flavor]);

  function toggle() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  function cycleFlavor() {
    setFlavor((f) => {
      const idx = FLAVOR_ORDER.indexOf(f);
      return FLAVOR_ORDER[(idx + 1) % FLAVOR_ORDER.length];
    });
  }

  return (
    <ThemeContext.Provider value={{ theme, flavor, toggle, setFlavor, cycleFlavor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}

export const FLAVOR_META: Record<ThemeFlavor, { label: string; subtitle: string; emoji: string }> = {
  apothecary: { label: "Apothecary", subtitle: "warm parchment", emoji: "🜔" },
  editorial: { label: "Editorial", subtitle: "clinical broadsheet", emoji: "❡" },
  bauhaus: { label: "Bauhaus", subtitle: "neo-brutalist blocks", emoji: "▣" },
};
