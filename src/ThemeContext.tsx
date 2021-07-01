import { createContext, useContext } from "react";

export enum Theme {
  DarkBlue = "darkblue",
  Peru = "peru",
  Chartreuse = "chartreuse",
  MediumOrchid = "mediumorchid",
}

export type ThemeContextType = {
  theme: Theme;
  setTheme: (value: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: Theme.DarkBlue,
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);
