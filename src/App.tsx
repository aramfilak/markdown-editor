import "./App.scss";
import "react-toastify/dist/ReactToastify.css";

import React from "react";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import { ToastContainer, Zoom } from "react-toastify";

const App: React.FC = (): JSX.Element => {
  return (
    <main className="app">
      <ToastContainer position="top-center" autoClose={1000} transition={Zoom} theme="light" />
      <Sidebar />
      <div className="app-body">
        <Topbar />
      </div>
    </main>
  );
};

export default App;
