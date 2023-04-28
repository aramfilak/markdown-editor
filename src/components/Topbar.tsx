import "./TopBar.scss";
import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { CloseSvg, DeleteSvg, DocumentSvg, LogoSvg, MenuSvg, SaveSvg } from "../assets/Svg";
import { toast } from "react-toastify";

const TopToolsBar: React.FC = (): JSX.Element => {
  const {
    documents,
    setDocuments,
    currentDocument,
    setCurrentDocument,
    sidebarIsClosed,
    setSidebarIsClosed,
  } = useGlobalContext()!;
  const [documentName, setDocumentName] = useState(currentDocument?.name! || "");

  useEffect(() => {
    setDocumentName(currentDocument?.name! || "");
  }, [currentDocument]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setDocumentName(event.target.value);
  };

  const saveDocument = (): void => {
    if (currentDocument) {
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
      // saved notification
      toast.success(`${documentName} saved`);
    }
  };

  const deleteDocument = (): void => {
    if (documents.length && currentDocument) {
      const newDocuments = documents.filter((document) => {
        return document.id !== currentDocument.id;
      });
      setDocuments(newDocuments);
      setCurrentDocument(newDocuments[0]);
      setDocumentName(newDocuments[0]?.name);
      // deleted notification
      toast.error(`${documentName} deleted`);
    } else {
      setDocumentName("");
      setCurrentDocument(null);
    }
  };

  return (
    <div className="topbar">
      <div className="left-side">
        <button className="sidebar-toggle-btn" onClick={() => setSidebarIsClosed(!sidebarIsClosed)}>
          {sidebarIsClosed ? <MenuSvg /> : <CloseSvg />}
        </button>
        <LogoSvg />
        {/* Rename Document  */}
        <div className="rename-document">
          <DocumentSvg />
          <input
            className="text-field"
            onChange={handleChange}
            value={documentName}
            disabled={!currentDocument}
            style={!currentDocument ? { cursor: "not-allowed" } : {}}
          ></input>
        </div>
      </div>
      {/* Delete Document  */}
      <div className="right-side">
        <button className="delete-document-btn" onClick={deleteDocument}>
          <DeleteSvg />
        </button>
        {/* Save Document  */}
        <button className="save-document-btn" onClick={saveDocument}>
          <SaveSvg />
        </button>
      </div>
    </div>
  );
};

export default TopToolsBar;
