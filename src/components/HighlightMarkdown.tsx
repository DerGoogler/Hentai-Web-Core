import React, { useRef, useEffect } from "react";
import Markdown from "markdown-to-jsx";
import hljs from "highlight.js";
// import "highlight.js/styles/atom-one-dark.css";

interface HighlightedMarkdownProps {
  children: string;
}

export function HighlightedMarkdown({ children }: HighlightedMarkdownProps) {
  const rootRef = useRef<HTMLDivElement>();

  useEffect(() => {
    // @ts-ignore
    rootRef.current.querySelectorAll("pre code").forEach((block: any) => {
      hljs.highlightElement(block);
    });
  }, [children]);

  return (
    // @ts-ignore
    <div ref={rootRef}>
      <Markdown>{children}</Markdown>
    </div>
  );
}
