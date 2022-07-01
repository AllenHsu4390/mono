import { useTheme } from '@mui/material';
import React, { useRef, useState } from 'react';

interface Props {
  children: React.ReactNode;
  onFileChange(file: File): void;
}

export const FileDrop = ({ children, onFileChange }: Props) => {
  const themes = useTheme();
  const inputEl = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const onFileDrop: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();

    if (
      event.dataTransfer.items &&
      event.dataTransfer.items.length === 1 &&
      event.dataTransfer.items[0].kind === 'file'
    ) {
      const file = event.dataTransfer.files[0];
      if (file) {
        onFileChange(file);
      }
    }
  };

  const onFileDragOver: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  return (
    <div
      onDrop={onFileDrop}
      onDragOver={onFileDragOver}
      onDragLeave={() => setIsDragOver(false)}
      onClick={() => inputEl.current?.click()}
      style={{
        border: isDragOver
          ? `1px dashed ${themes.palette.error.main}`
          : `1px dashed ${themes.palette.background.default}`,
        boxSizing: 'border-box',
      }}
    >
      <input
        ref={inputEl}
        style={{
          display: 'none',
        }}
        accept="image/*"
        type="file"
        onChange={(event) => {
          const file = event.target.files?.item(0);
          if (file) {
            onFileChange(file);
          }
        }}
      />
      {children}
    </div>
  );
};
