import "./App.scss";
import React from "react";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";

const App: React.FC = (): JSX.Element => {
  return (
    <main className="app">
      <Sidebar />
      <div className="app-body">
        <Topbar />
      </div>
    </main>
  );
};

export default App;
