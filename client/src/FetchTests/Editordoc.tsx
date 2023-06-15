import React, { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

export const Editordoc = () => {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current);
    }
  };

  return (
    <>
      {/* @ts-ignore*/}
      <Editor
        onInit={(evt: any, editor: any) => (editorRef.current = editor)}
        initialValue="текст в редакторе"
        init={{
          height: 1000,
          width: 1800,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <button onClick={log}>Log editor content</button>
    </>
  );
};
