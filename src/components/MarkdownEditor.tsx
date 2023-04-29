import { PreviewSvg } from "../assets/Svg";
import "./MarkdownEditor.scss";
import React, { useState } from "react";

const MarkdownEditor: React.FC = (): JSX.Element => {
  const [preview, setPreview] = useState<boolean>(false);
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
            <textarea id="input" />
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
        <div id="preview"></div>
      </div>
    </div>
  );
};
export default MarkdownEditor;
