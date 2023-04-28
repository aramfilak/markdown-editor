import "./TopBar.scss";
import React, { useState } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { CloseSvg, DeleteSvg, DocumentSvg, LogoSvg, MenuSvg, SaveSvg } from "../assets/Svg";
const TopToolsBar: React.FC = (): JSX.Element => {
  // Context API
  const {
    documents,
    setDocuments,
    currentDocument,
    setCurrentDocument,
    sidebarIsClosed,
    setSidebarIsClosed,
  } = useGlobalContext()!;
  const [documentName, setDocumentName] = useState(currentDocument?.name || "");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setDocumentName(event.target.value);
  };

  const handleSaveDocument = (): void => {
    if (documents.length && currentDocument) {
      currentDocument.name = documentName;
      const newDocuments = documents.map((document) => {
        if (document.id === currentDocument.id) {
          // check if document name ends with ".md"
          let currentDocumentName = currentDocument.name;
          if (!currentDocumentName.endsWith(".md")) {
            currentDocumentName = `${currentDocumentName}.md`;
          }
          document.name = currentDocumentName;
        }
        return document;
      });
      setDocuments(newDocuments);
    }
  };

  const handleDeleteDocument = (): void => {
    if (documents.length && currentDocument) {
      const newDocuments = documents.filter((document) => {
        return document.id !== currentDocument.id;
      });
      setDocuments(newDocuments);
      setCurrentDocument(newDocuments[0]);
      setDocumentName(newDocuments[0]?.name || "");
    } else {
      setDocumentName("");
      setCurrentDocument(null);
    }
  };

  return (
    <div className="topbar">
      <div className="left-side">
        <button className="sidebar-toggle-btn" onClick={() => setSidebarIsClosed(!sidebarIsClosed)}>
          {sidebarIsClosed ? <CloseSvg /> : <MenuSvg />}
        </button>
        <LogoSvg />
        {/* Rename Document  */}
        <div className="rename-document">
          <DocumentSvg />
          <input
            className="text-field"
            onChange={handleChange}
            value={documentName}
            disabled={!documents.length}
            style={!documents.length ? { cursor: "not-allowed" } : {}}
          ></input>
        </div>
      </div>
      {/* Delete Document  */}
      <div className="right-side">
        <button className="delete-document-btn" onClick={handleDeleteDocument}>
          <DeleteSvg />
        </button>
        {/* Save Document  */}
        <button className="save-document-btn" onClick={handleSaveDocument}>
          <SaveSvg />
        </button>
      </div>
    </div>
  );
};

export default TopToolsBar;
