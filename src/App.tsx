import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import { Bounce, ToastContainer } from "react-toastify";
import MarkdownEditor from "./components/MarkdownEditor";

const App: React.FC = (): JSX.Element => {
  return (
    <main className="app">
      <ToastContainer position="bottom-right" autoClose={1000} transition={Bounce} theme="dark" />
      <Sidebar />
      <div className="app-body">
        <Topbar />
        <MarkdownEditor />
      </div>
    </main>
  );
};

export default App;
