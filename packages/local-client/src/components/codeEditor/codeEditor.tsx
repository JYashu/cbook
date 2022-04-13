import { useRef } from "react";
import Editor, { EditorDidMount } from "@monaco-editor/react";
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import './codeEditor.css';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {

  const editorRef = useRef<any>();

  const onEditorDidMount: EditorDidMount = (getValue, editor) => {

    editorRef.current = editor;

    editor.onDidChangeModelContent(() => {
      onChange(getValue());
    });

    editor.getModel()?.updateOptions({ tabSize: 2 });
  };

  const onFormatClick = () => {
    const unFormatted = editorRef.current.getModel().getValue();
    const formatted = prettier.format(unFormatted, {
      parser: 'babel',
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true
    }).replace(/\n$/, '');
    editorRef.current.setValue(formatted);
  };

  return (
    <div className="editor-wrapper">
      <button className="button button-format is-primary is-small" onClick={onFormatClick}>*</button>
      <Editor 
        editorDidMount={onEditorDidMount}
        value={initialValue}
        height='100%' 
        language='javascript' 
        theme='dark' 
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 12,
          scrollBeyondLastLine: false,
          automaticLayout: true
        }}
      />
    </div>
  )
};

export default CodeEditor;