import React, { useState } from 'react';
import { BsCheck2, BsClipboard } from 'react-icons/bs';
import './CodeBlock.css';

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'bash' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  return (
    <div className="code-block-container">
      <div className="code-block-header">
        <span className="code-language">{language}</span>
        <button 
          className={`copy-button ${copied ? 'copied' : ''}`} 
          onClick={handleCopy}
          aria-label="Copy code"
        >
          {copied ? React.createElement(BsCheck2 as any, { className: "copy-icon" }) : React.createElement(BsClipboard as any, { className: "copy-icon" })}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <pre className="code-content">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
