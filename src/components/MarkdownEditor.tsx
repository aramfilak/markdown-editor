import "./MarkdownEditor.scss";
import React, { useState } from "react";
import { PreviewSvg } from "../assets/Svg";
import Markdown from "./Markdwon";
import { useGlobalContext } from "../hooks/useGlobalContext";

const MarkdownEditor: React.FC = (): JSX.Element => {
  const { markdownContent, setMarkdownContent } = useGlobalContext()!;
  const [preview, setPreview] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownContent(event.target.value);
  };
  return (
    <div className="markdown-editor">
      {/*Markdown Input*/}
      {!preview && (
        <>
          <div className="markdown-input">
            <header className="header">
              <label className="title" htmlFor="input">
                markdown
              </label>
            </header>
            <textarea onChange={handleChange} value={markdownContent || ""} id="input" />
          </div>
          <hr className="column" />
        </>
      )}
      {/*Markdown Preview*/}
      <div className="markdown-preview">
        <header className="header">
          <h3 className="title">preview</h3>
          <button className="preview-btn" onClick={() => setPreview(!preview)}>
            <PreviewSvg />
          </button>
        </header>
        <div id="preview">
          <Markdown markdownContent={markdownContent} />
        </div>
      </div>
    </div>
  );
};
export default MarkdownEditor;
