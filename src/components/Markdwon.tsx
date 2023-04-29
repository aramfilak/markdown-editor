import "./Markdown.scss";
import React from "react";

interface MarkdownProps {
  markdownContent: string;
}

const Markdown: React.FC<MarkdownProps> = ({ markdownContent }): JSX.Element => {
  const parseMarkdown = (markdownContent: string): JSX.Element => {
    return <></>;
  };

  return <div className="markdown">{parseMarkdown(markdownContent)}</div>;
};

export default Markdown;
