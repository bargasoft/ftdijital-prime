'use client';
import { useRef, useState, useEffect } from 'react';
import { Bold, Italic, Underline, List, ListOrdered, Link2, Heading1, Heading2, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface RichTextEditorProps {
  name: string;
  defaultValue?: string;
  placeholder?: string;
}

export default function RichTextEditor({ name, defaultValue = '', placeholder = 'İçeriğinizi buraya yazın...' }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [htmlContent, setHtmlContent] = useState(defaultValue);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== defaultValue && !htmlContent) {
      editorRef.current.innerHTML = defaultValue;
      setHtmlContent(defaultValue);
    }
  }, [defaultValue, htmlContent]);

  const execCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setHtmlContent(editorRef.current.innerHTML);
    }
    editorRef.current?.focus();
  };

  const handleInput = () => {
    if (editorRef.current) {
      setHtmlContent(editorRef.current.innerHTML);
    }
  };

  const promptLink = () => {
    const url = prompt('Bağlantı URL\'si girin:', 'https://');
    if (url) {
      execCommand('createLink', url);
    }
  };

  const btnStyle = {
    padding: '0.5rem',
    background: 'white',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#475569'
  };

  return (
    <div style={{ border: '1px solid #cbd5e1', borderRadius: '8px', overflow: 'hidden', background: 'white' }}>
      
      {/* Hidden input to pass data to Server Action */}
      <input type="hidden" name={name} value={htmlContent} />

      {/* Toolbar */}
      <div style={{ display: 'flex', gap: '0.25rem', padding: '0.5rem', background: '#f8fafc', borderBottom: '1px solid #cbd5e1', flexWrap: 'wrap' }}>
        <button type="button" onClick={() => execCommand('formatBlock', 'H1')} style={btnStyle} title="Başlık 1"><Heading1 size={16} /></button>
        <button type="button" onClick={() => execCommand('formatBlock', 'H2')} style={btnStyle} title="Başlık 2"><Heading2 size={16} /></button>
        
        <div style={{width: '1px', background: '#cbd5e1', margin: '0 0.25rem'}}></div>

        <button type="button" onClick={() => execCommand('bold')} style={btnStyle} title="Kalın"><Bold size={16} /></button>
        <button type="button" onClick={() => execCommand('italic')} style={btnStyle} title="İtalik"><Italic size={16} /></button>
        <button type="button" onClick={() => execCommand('underline')} style={btnStyle} title="Altı Çizili"><Underline size={16} /></button>
        
        <div style={{width: '1px', background: '#cbd5e1', margin: '0 0.25rem'}}></div>

        <button type="button" onClick={() => execCommand('insertUnorderedList')} style={btnStyle} title="Madde İşaretli Liste"><List size={16} /></button>
        <button type="button" onClick={() => execCommand('insertOrderedList')} style={btnStyle} title="Numaralı Liste"><ListOrdered size={16} /></button>

        <div style={{width: '1px', background: '#cbd5e1', margin: '0 0.25rem'}}></div>

        <button type="button" onClick={() => execCommand('justifyLeft')} style={btnStyle} title="Sola Hizala"><AlignLeft size={16} /></button>
        <button type="button" onClick={() => execCommand('justifyCenter')} style={btnStyle} title="Ortala"><AlignCenter size={16} /></button>
        <button type="button" onClick={() => execCommand('justifyRight')} style={btnStyle} title="Sağa Hizala"><AlignRight size={16} /></button>

        <div style={{width: '1px', background: '#cbd5e1', margin: '0 0.25rem'}}></div>

        <button type="button" onClick={promptLink} style={btnStyle} title="Bağlantı Ekle"><Link2 size={16} /></button>
      </div>

      {/* Editor Area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        style={{
          minHeight: '300px',
          padding: '1rem',
          outline: 'none',
          fontSize: '1rem',
          lineHeight: '1.6',
          color: '#1e293b'
        }}
        data-placeholder={htmlContent ? '' : placeholder}
      />
      
      {/* Placeholder CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #94a3b8;
          pointer-events: none;
          display: block;
        }
      `}} />
    </div>
  );
}
