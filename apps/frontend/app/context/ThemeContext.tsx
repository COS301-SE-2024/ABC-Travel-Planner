"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import themes from '../styles/themes';

type ThemeKeys = keyof typeof themes;

interface ThemeContextProps {
    selectedTheme: ThemeKeys;
    themeStyles: typeof themes.default;
    setTheme: (theme: ThemeKeys) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
 const [selectedTheme, setSelectedTheme] = useState<ThemeKeys>('beach');

  const themeStyles = themes[selectedTheme] || themes.default;

  const setTheme = (theme: ThemeKeys) => {
    setSelectedTheme(theme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedTheme', theme);
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('selectedTheme') as ThemeKeys;
    if (savedTheme && themes[savedTheme]) {
      setSelectedTheme(savedTheme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ selectedTheme, themeStyles, setTheme }}>
      <div style={{ background: themeStyles?.background, color: themeStyles?.textColor }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};