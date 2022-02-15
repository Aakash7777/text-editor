import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { docsService } from "../services/docs.service";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  {
    ssr: false,
  }
);

function TextEditor({ doc }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    update();
  };

  useEffect(() => {
    if (doc && doc.editorState) {
      const entityMap = {};
      const blocks = doc.editorState.blocks;

      const contentState = convertFromRaw({ blocks, entityMap });
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, []);

  const update = () => {
    doc["editorState"] = convertToRaw(editorState.getCurrentContent());

    docsService.update({ id: doc.id, params: doc }).then((res) => {
      // console.log(res);
    });
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-16 p-4">
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbarClassName="flex sticky top-0 z-50 
            !justify-center mx-auto"
        editorClassName="mt-6 bg-white shadow-lg !max-w-5xl mx-auto mb-12 border p-10"
      />
    </div>
  );
}

export default TextEditor;
