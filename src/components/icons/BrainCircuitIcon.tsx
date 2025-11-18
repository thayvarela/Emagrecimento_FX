import React from 'react';

const BrainCircuitIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2a2.5 2.5 0 0 0-2.5 2.5v.75A2.75 2.75 0 0 1 12 8a2.75 2.75 0 0 1 2.5-2.75V4.5A2.5 2.5 0 0 0 12 2Z" />
    <path d="M4.5 5.5A2.5 2.5 0 0 0 2 8v0a2.5 2.5 0 0 0 2.5 2.5h.75A2.75 2.75 0 0 1 8 13a2.75 2.75 0 0 1-2.75 2.5h-.75A2.5 2.5 0 0 0 2 18v0a2.5 2.5 0 0 0 2.5 2.5" />
    <path d="M19.5 5.5A2.5 2.5 0 0 1 22 8v0a2.5 2.5 0 0 1-2.5 2.5h-.75A2.75 2.75 0 0 0 16 13a2.75 2.75 0 0 0 2.75 2.5h.75A2.5 2.5 0 0 1 22 18v0a2.5 2.5 0 0 1-2.5 2.5" />
    <path d="M12 8v8" />
    <path d="M8 13h8" />
    <path d="M4.5 10.5h.75" />
    <path d="M18.75 10.5h.75" />
  </svg>
);

export default BrainCircuitIcon;
