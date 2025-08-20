"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle, FontSize, Color } from "@tiptap/extension-text-style";
import { useEffect } from "react";
import Toolbar from "./Toolbar";

interface IRichTextEditorProps {
  labelText: string;
  labelTextClassName?: string;
  inputClassName?: string;
  className?: string;
  setNewContent: (content: string) => void;
  defaultContent?: string;
  toolbarClassName?: string;
  error?: string;
  errorClassName?: string;
}

const RichTextEditor = ({
  labelText,
  labelTextClassName = "",
  inputClassName = "",
  className = "",
  setNewContent,
  defaultContent = "",
  toolbarClassName = "",
  errorClassName = "",
  error,
}: IRichTextEditorProps) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: { class: "list-disc pl-4" },
        },
        orderedList: {
          HTMLAttributes: { class: "list-decimal pl-4" },
        },
        listItem: {
          HTMLAttributes: { class: "ml-6" },
        },
        link: {
          HTMLAttributes: {
            class: "text-blue-700 underline hover:cursor-pointer",
          },
        },
      }),
      Color,
      TextStyle,
      FontSize,
    ],
    editorProps: {
      attributes: {
        class: `block h-[12rem] overflow-auto w-full focus:outline-none p-2 ${inputClassName}`,
      },
    },
    onUpdate: ({ editor }) => {
      setNewContent(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(defaultContent);
    }
  }, [editor, defaultContent]);

  return (
    <div className="w-full h-max">
      <p className={`[color:inherit] mb-2 ${labelTextClassName}`}>
        {labelText}
      </p>

      <div
        className={`w-full border border-neutral-200 rounded-md overflow-hidden ${className}`}
      >
        <Toolbar
          editor={editor as Editor | null}
          className={toolbarClassName}
        />
        <EditorContent
          editor={editor}
          className="w-full"
          style={{ whiteSpace: "pre-line" }}
        />
      </div>
      {error && (
        <p className={`text-red-600 text-sm mt-2 ${errorClassName}`}>
          * {error}
        </p>
      )}
    </div>
  );
};

export default RichTextEditor;
