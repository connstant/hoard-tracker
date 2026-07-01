import { EditorContent, useEditor, useEditorState, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle, FontSize } from "@tiptap/extension-text-style";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
}

const FONT_SIZES = [
  { label: "Small", value: "12px" },
  { label: "Normal", value: "" },
  { label: "Large", value: "18px" },
  { label: "X-Large", value: "24px" },
];

// Old notes were saved as plain text with literal newlines. HTML collapses
// those, so bare (non-HTML) values get their line breaks converted once on
// the way into the editor.
function toEditorHtml(value: string): string {
  if (!value) return "";
  if (/<[a-z][\s\S]*>/i.test(value)) return value;
  return value.replace(/\n/g, "<br>");
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder,
  className,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        blockquote: false,
        codeBlock: false,
        code: false,
        horizontalRule: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
        link: false,
        strike: false,
      }),
      TextStyle,
      FontSize,
      Placeholder.configure({ placeholder: placeholder ?? "" }),
    ],
    content: toEditorHtml(value),
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "notes-editor focus:outline-none",
      },
    },
  });

  useEffect(() => {
    if (!editor) return;
    const normalized = toEditorHtml(value);
    if (normalized !== editor.getHTML()) {
      editor.commands.setContent(normalized, { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className={className}>
      <Toolbar editor={editor} />
      <EditorContent
        editor={editor}
        className="flex-auto min-h-[100px] rounded-b-lg border border-t-0 border-slate-700/60 bg-slate-950/60 px-3 py-2 text-xs text-slate-200"
      />
    </div>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      bold: ctx.editor.isActive("bold"),
      italic: ctx.editor.isActive("italic"),
      underline: ctx.editor.isActive("underline"),
      fontSize: (ctx.editor.getAttributes("textStyle").fontSize as string) ?? "",
    }),
  });

  return (
    <div className="flex items-center gap-1 rounded-t-lg border border-slate-700/60 bg-slate-800/50 px-2 py-1.5">
      <ToolbarButton
        active={state.bold}
        onClick={() => editor.chain().focus().toggleBold().run()}
        label="Bold"
      >
        <span className="font-bold">B</span>
      </ToolbarButton>
      <ToolbarButton
        active={state.italic}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        label="Italic"
      >
        <span className="italic">I</span>
      </ToolbarButton>
      <ToolbarButton
        active={state.underline}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        label="Underline"
      >
        <span className="underline">U</span>
      </ToolbarButton>
      <div className="mx-1 h-4 w-px bg-slate-700" />
      <select
        value={state.fontSize}
        onChange={(e) => {
          const size = e.target.value;
          if (size) editor.chain().focus().setFontSize(size).run();
          else editor.chain().focus().unsetFontSize().run();
        }}
        className="rounded border border-slate-700/60 bg-slate-950/60 px-1 py-0.5 text-[11px] text-slate-300 outline-none"
      >
        {FONT_SIZES.map((size) => (
          <option key={size.label} value={size.value}>
            {size.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function ToolbarButton({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`flex h-6 w-6 items-center justify-center rounded text-xs transition ${
        active
          ? "bg-slate-600 text-white"
          : "text-slate-400 hover:bg-slate-700/60 hover:text-slate-200"
      }`}
    >
      {children}
    </button>
  );
}
