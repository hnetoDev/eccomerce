"use client";

import AppThemeProvider from "@/components/context/theme";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { useTheme } from "next-themes";

import { MoonIcon, SunIcon } from "lucide-react";

function Tab() {
  const { setTheme, theme } = useTheme();
  return (
    <Tabs className=" " onValueChange={setTheme} value={theme}>
      <TabsList className="flex w-full">
        <TabsTrigger value="light"><SunIcon size={18} className=""/></TabsTrigger>
        <TabsTrigger value="dark"><MoonIcon size={18}/></TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

function ThemeTabs() {
  return (
    <AppThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Tab />
    </AppThemeProvider>
  );
}

export default ThemeTabs;