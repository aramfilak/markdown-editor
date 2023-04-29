import "./Topbar.scss";
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
  const [showModalWindow, setShowModalWindow] = useState<boolean>(false);
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
          if (currentDocumentName.length <= 3) {
            currentDocumentName = "untitled-document.md";
          }
          document.name = currentDocumentName;
          // saved notification
          toast.success(`${currentDocumentName} renamed`);
        }
        return document;
      });
      setDocuments(newDocuments);
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
    setShowModalWindow(false);
  };

  return (
    <div className="topbar">
      {/*Delete confirmation window  */}
      {showModalWindow && (
        <div className="modal-window">
          <div className="overlay" onClick={() => setShowModalWindow(false)} />
          <div className="content">
            <h2 className="title">Delete this document?</h2>
            <p className="message">
              Are you sure you want to delete the <strong>"{currentDocument?.name}"</strong>{" "}
              document and its contents? This action cannot be reversed
            </p>
            <button className="confirm-and-delete-btn" onClick={deleteDocument}>
              confirm & delete
            </button>
          </div>
        </div>
      )}

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

      <div className="right-side">
        {/* Delete Document  */}
        <button
          className="delete-document-btn"
          onClick={() => setShowModalWindow(currentDocument ? true : false)}
        >
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
