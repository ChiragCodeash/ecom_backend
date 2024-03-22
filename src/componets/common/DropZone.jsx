import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import IconPack from "./IconPack";
import $ from "jquery";
import { toast } from "react-toastify";

const DropZone = ({ files, setFiles }) => {
  // const [files, setFiles] = useState([]);

  const deleteImg = (i) => {
    files.splice(i, 1);
    setFiles([...files]);
  };

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 5,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    onDrop: (acceptedFiles) => {
      if (files.length < 5) {
        setFiles([...files, ...acceptedFiles]);
      } else {
        toast.error("Maximum five image is allowed", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
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
