import React, { useState, useEffect, useRef } from 'react';

interface ResultCardProps {
  text: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ text }) => {
  const [editableText, setEditableText] = useState(text);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Function to adjust textarea height based on content
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height to recalculate
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  // Update editable text when a new result is generated
  useEffect(() => {
    setEditableText(text);
  }, [text]);

  // Adjust height on initial render and when text changes
  useEffect(() => {
    adjustTextareaHeight();
  }, [editableText]);

  const handleCopy = () => {
    navigator.clipboard.writeText(editableText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableText(e.target.value);
  };

  return (
    <div className="mt-8 p-6 bg-gray-900 border border-purple-500/30 rounded-lg shadow-lg relative animate-fade-in">
       <h3 className="text-sm font-medium text-gray-400 mb-2">Your Masterpiece (Editable)</h3>
      <button 
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 bg-gray-700 hover:bg-gray-600 rounded-md transition text-gray-300"
        aria-label="Copy to clipboard"
      >
        {copied ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
      </button>
      <textarea
        ref={textareaRef}
        value={editableText}
        onChange={handleTextChange}
        className="w-full bg-transparent border-0 rounded-md p-0 text-gray-200 focus:ring-0 font-serif text-lg leading-relaxed resize-none overflow-hidden"
        aria-label="Editable result text"
        rows={1}
      />
    </div>
  );
};

export default ResultCard;
