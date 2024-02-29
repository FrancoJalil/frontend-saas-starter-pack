import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [darkMode, setDarkMode] = useState<boolean>(theme === "dark");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    setTheme(darkMode ? "light" : "dark");
  };

  return (
    <div className="flex items-center justify-end">

      <Sun className="w-5"></Sun>
      <Label>
        <Switch className="m-2" checked={darkMode} onCheckedChange={() => toggleDarkMode()} />
      </Label>
      <Moon className="w-5"></Moon>

    </div>
  );
}