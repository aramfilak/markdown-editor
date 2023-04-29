import "./Sidebar.scss";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { LogoSvg, DocumentSvg } from "../assets/Svg";
import { Document } from "../../@types/Document";
import ThemeSwitcher from "./ThemeSwitcher";
import { toast } from "react-toastify";
const SideToolsBar: React.FC = (): JSX.Element => {
  const { documents, setDocuments, setCurrentDocument, sidebarIsClosed } = useGlobalContext()!;

  const addNewDocument = (): void => {
    const createdDate = new Date()
      .toLocaleDateString("en-us", { year: "numeric", month: "2-digit", day: "2-digit" })
      .replaceAll("/", "-");

    const newDocuments: Document = {
      id: uuidv4(),
      name: "untitled-document.md",
      createdAt: createdDate,
      content: "",
    };
    setDocuments([...documents, newDocuments]);
    toast.info("blank document created");
  };

  const renderedDocuments = documents.map((document) => {
    return (
      <div className="document" key={document.id}>
        <DocumentSvg />
        {/* change current document*/}
        <button
          className="name-and-created-date"
          onClick={() => {
            setCurrentDocument(document);
          }}
        >
          <span>{document.createdAt}</span>
          <br />
          {document.name}
        </button>
      </div>
    );
  });

  return (
    <aside className="sidebar" style={{ display: `${sidebarIsClosed ? "none" : "block"}` }}>
      <LogoSvg />

      <div className="my-documents">
        <h2 className="title">my documents</h2>
        <button className="new-document-btn" onClick={addNewDocument}>
          + new document
        </button>
        <div className="documents">{renderedDocuments}</div>
      </div>
      <ThemeSwitcher />
    </aside>
  );
};

export default SideToolsBar;
