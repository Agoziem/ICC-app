import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import "./Tiptap.css";

const Tiptap = ({ item, setItem, keylabel, setHasStartedEditing = (value) => {}  }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image.configure({
        HTMLAttributes: {
          class: "custom-image-class",
        },
      }),
      Link.configure({
        openOnClick: true,
        autolink: false,
        HTMLAttributes: {
          class: "custom-link-class text-secondary",
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "tiptapinput d-flex flex-column px-2 py-2 justify-content-start  align-items-start w-100 gap-3 rounded",
      },
    },
    onUpdate: ({ editor }) => {
      setHasStartedEditing && setHasStartedEditing(true);
      setItem({
        ...item,
        [keylabel]: editor.getHTML(),
      });
    },
  });

  useEffect(() => {
    if (editor && item[keylabel] !== editor.getHTML()) {
      editor.commands.setContent(item[keylabel]);
    }
  }, [item, editor]);

  return (
    <div className="w-100">
      <Toolbar editor={editor} content={item[keylabel]} />
      <EditorContent
        style={{
          whiteSpace: "pre-line",
        }}
        editor={editor}
      />
    </div>
  );
};

export default Tiptap;
