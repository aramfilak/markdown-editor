import React, { createContext, useState, useEffect } from "react";
import initialSetup from "../data/initial_setup.json";
import { Document } from "../../@types/Document";

interface Context {
  documents: Document[];
  setDocuments: React.Dispatch<React.SetStateAction<Document[]>>;
  currentDocument: Document | null;
  setCurrentDocument: React.Dispatch<React.SetStateAction<Document | null>>;
  sidebarIsClosed: boolean;
  setSidebarIsClosed: React.Dispatch<React.SetStateAction<boolean>>;
  markdownContent: string;
  setMarkdownContent: React.Dispatch<React.SetStateAction<string>>;
}

interface ProviderProps {
  children: React.ReactNode;
}

export const AppContext = createContext<Context | null>(null);

const Provider: React.FC<ProviderProps> = ({ children }): JSX.Element => {
  const [currentDocument, setCurrentDocument] = useState<Document | null>(initialSetup[0]);
  const [documents, setDocuments] = useState<Document[]>(initialSetup);
  const [sidebarIsClosed, setSidebarIsClosed] = useState<boolean>(true);
  const [markdownContent, setMarkdownContent] = useState<string>(currentDocument?.content!);

  useEffect(() => {
    setMarkdownContent(currentDocument?.content!);
  }, [currentDocument]);

  return (
    <AppContext.Provider
      value={{
        documents,
        setDocuments,
        currentDocument,
        setCurrentDocument,
        sidebarIsClosed,
        setSidebarIsClosed,
        markdownContent,
        setMarkdownContent,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default Provider;
