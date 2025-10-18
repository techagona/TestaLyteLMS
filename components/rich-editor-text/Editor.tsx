"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Menubar } from "./Menubar";
import TextAlign from "@tiptap/extension-text-align";

export function RichTextEditor({ field }: { field: any }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    // Prevent the editor from forcing re-renders of the React tree on every transaction.
    // Let the menubar subscribe to editor events instead to update UI without re-rendering the whole form.
    shouldRerenderOnTransaction: false,
    immediatelyRender: false,

    editorProps: {
      attributes: {
        class:
          "min-h-[330px] p-4 focus:outline-none prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert !w-full !max-w-none",
      },
    },

    onUpdate: ({ editor }) => {
      field.onChange(JSON.stringify(editor.getJSON()));
    },

    content: field.value ? JSON.parse(field.value) : "<p>Hello World </p>",
  });

  return (
    <div className="w-full border border-input rounded-lg overflow-hidden dark:bg-input/30">
      <Menubar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
