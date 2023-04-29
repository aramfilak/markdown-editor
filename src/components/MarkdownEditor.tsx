import "./MarkdownEditor.scss";
import React, { useState } from "react";
import { HidePreviewSvg, PreviewSvg } from "../assets/Svg";
import { useGlobalContext } from "../hooks/useGlobalContext";
import ReactMarkdown from "react-markdown";

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
            <textarea
              onChange={handleChange}
              value={markdownContent || ""}
              id="input"
              className="content"
            />
          </div>
          <hr className="column" />
        </>
      )}
      {/*Markdown Preview*/}
      <div className="markdown-preview">
        <header className="header">
          <h3 className="title">preview</h3>
          <button className="preview-btn" onClick={() => setPreview(!preview)}>
            {preview ? <HidePreviewSvg /> : <PreviewSvg />}
          </button>
        </header>
        <div id="preview" className="content">
          <ReactMarkdown>{markdownContent}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
export default MarkdownEditor;
