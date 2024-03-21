import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditor = ({ className, style, onChange, value }) => {
  // const [value, setValue] = useState("");
  // const modules = {
  //   toolbar: [  
  //     [{ 'header': [1, 2, 3, 4, 5, 6, false] }], 
  //     [{ 'font': [] }],          
  //     ['bold', 'italic', 'underline', 'strike'],  
  //     [{ 'list': 'ordered'}, { 'list': 'bullet' }],     
  //     [{ 'indent': '-1'}, { 'indent': '+1' }],,  
  //     [{ 'color': [] }, { 'background': [] }],         
  //     [{ 'font': [] }],
  //     [{ 'align': [] }],
  //     ['clean']                                       
  //   ]
  // };

  // const formats = [
  //   "header",
  //   "font",
  //   "bold",
  //   "italic",
  //   "underline",
  //   "strike",
  //   "list",
  //   "indent",
  //   "link",
  //   "image",
  // ];
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      className={className}
      // modules={modules}
      // formats={formats}
    />
  );
};

export default TextEditor;
