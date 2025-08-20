"use client";

import { Editor } from "@tiptap/react";
import { rgbToHex } from "@/utils";
import { IcfyIcon } from "../IcfyIcon";

interface IToolbarProps {
  editor: Editor | null;
  className?: string;
}

const Toolbar = ({ editor, className = "" }: IToolbarProps) => {
  if (!editor) return null;

  const rawColor = editor.getAttributes("textStyle").color as
    | string
    | undefined;
  const colorHex = rawColor?.startsWith("rgb")
    ? rgbToHex(rawColor)
    : rawColor || "#000000";

  const handleFontSizeChange = (value: string) => {
    if (value === "") {
      editor.chain().focus().unsetFontSize().run();
    } else {
      editor.chain().focus().setFontSize(value).run();
    }
  };

  const handleLinkClick = () => {
    const url = prompt("Enter the URL");
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  const buttonClass = (active: boolean) =>
    `w-8 aspect-square rounded-md grid place-content-center ${
      active ? "bg-primary text-white" : "text-inherit"
    }`;

  return (
    <div
      className={`flex items-center gap-2 md:gap-5 justify-end p-2 border-b border-neutral-200 bg-neutral-100 ${className}`}
    >
      {/* Bold */}
      <button
        type="button"
        title="Bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={buttonClass(editor.isActive("bold"))}
      >
        <IcfyIcon className="text-inherit" icon="ooui:bold-b" />
      </button>

      {/* Italic */}
      <button
        type="button"
        title="Italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={buttonClass(editor.isActive("italic"))}
      >
        <IcfyIcon className="text-inherit" icon="tabler:italic" />
      </button>

      {/* Underline */}
      <button
        type="button"
        title="Underline"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={buttonClass(editor.isActive("underline"))}
      >
        <IcfyIcon className="text-inherit" icon="tabler:underline" />
      </button>

      {/* Font Size Selector */}
      <select
        title="Font Size"
        value={(editor.getAttributes("textStyle").fontSize as string) || ""}
        onChange={(e) => handleFontSizeChange(e.target.value)}
        className="w-16 text-sm border border-neutral-200 rounded-md bg-white p-1"
      >
        <option value="">Size</option>
        <option value="12px">12px</option>
        <option value="14px">14px</option>
        <option value="16px">16px</option>
        <option value="18px">18px</option>
        <option value="20px">20px</option>
        <option value="24px">24px</option>
        <option value="28px">28px</option>
        <option value="32px">32px</option>
        <option value="48px">48px</option>
        <option value="64px">64px</option>
      </select>

      {/* Font Color */}
      <input
        title="Font Color"
        type="color"
        value={colorHex}
        onInput={(e) =>
          editor
            .chain()
            .focus()
            .setColor((e.target as HTMLInputElement).value)
            .run()
        }
        className="block w-8 aspect-square rounded-md"
      />

      {/* Bullet List */}
      <button
        type="button"
        title="Bullet List"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={buttonClass(editor.isActive("bulletList"))}
      >
        <IcfyIcon className="text-inherit" icon="radix-icons:list-bullet" />
      </button>

      {/* Numbered List */}
      <button
        type="button"
        title="Numbered List"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={buttonClass(editor.isActive("orderedList"))}
      >
        <IcfyIcon className="text-inherit" icon="carbon:list-numbered" />
      </button>

      {/* Link */}
      <button
        type="button"
        title="Create Link"
        onClick={handleLinkClick}
        className={buttonClass(editor.isActive("link"))}
      >
        <IcfyIcon className="text-inherit" icon="ph:link-bold" />
      </button>

      {/* Undo */}
      <button
        type="button"
        title="Undo"
        onClick={() => editor.chain().focus().undo().run()}
        className="w-8 aspect-square rounded-md grid place-content-center"
      >
        <IcfyIcon className="text-inherit" icon="material-symbols:undo" />
      </button>

      {/* Redo */}
      <button
        type="button"
        title="Redo"
        onClick={() => editor.chain().focus().redo().run()}
        className="w-8 aspect-square rounded-md grid place-content-center"
      >
        <IcfyIcon className="text-inherit" icon="material-symbols:redo" />
      </button>
    </div>
  );
};

export default Toolbar;
