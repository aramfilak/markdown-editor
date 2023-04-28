import "./App.scss";
import React from "react";
import Topbar from "./components/TopBar";
import Sidebar from "./components/SideBar";

const App: React.FC = (): JSX.Element => {
  return (
    <main className="app">
      <Topbar />
      <Sidebar />
    </main>
  );
};

export default App;
