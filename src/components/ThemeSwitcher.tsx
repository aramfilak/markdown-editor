import "./ThemeSwitcher.scss";
import React, { useState } from "react";
import { LightModeSvg, DarkModeSvg } from "../assets/Svg";

const ACTIVE_COLOR: string = "#fff";
const PASSIVE_COLOR: string = "#5A6069";

const ThemeSwitcher: React.FC = (): JSX.Element => {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  return (
    <div className="theme-switcher">
      {darkMode ? <DarkModeSvg color={ACTIVE_COLOR} /> : <DarkModeSvg color={PASSIVE_COLOR} />}
      <button
        className={`switch-btn ${darkMode ? "dark-mode" : ""}`}
        onClick={() => setDarkMode(!darkMode)}
      ></button>
      {darkMode ? <LightModeSvg color={PASSIVE_COLOR} /> : <LightModeSvg color={ACTIVE_COLOR} />}
    </div>
  );
};

export default ThemeSwitcher;
