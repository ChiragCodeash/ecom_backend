import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import IconPack from "./IconPack";

const DropZone = () => {
  const [files, setFiles] = useState([]);
  const [previewFiles, setPreViewFiles] = useState([]);

  const deleteImg = (i) => {
    files.splice(i, 1);
    setFiles([...files])
  };
  
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles]);
     
    },
  });

  const thumbs = files.map((file, i) => (
    <div
      key={i}
      //   name={`color` + i}
      className="btn btn-light  btn-icon mt-3"
      style={{ height: "144px", width: "144px" }}
    >
      <div
        className="position-absolute rounded bg-danger-soft img-preview-close"
        onClick={() => {
          deleteImg(i);
        }}
      >
        <IconPack icon={"close"} size={"small"} />
      </div>
      <img
        src={URL.createObjectURL(file)}
        alt=""
        height={"100%"}
        width={"100%"}
        className="rounded"
      />
    </div>
  ));
  return (
    <>
      <section className="">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>Drag and drop some files here, or click to select files</p>
        </div>
        <aside className="d-flex gap-3 flex-wrap">{thumbs}</aside>
      </section>
    </>
  );
};

export default DropZone;
