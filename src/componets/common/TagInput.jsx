import React, { useEffect, useRef, useState } from "react";
import Tagify from "@yaireo/tagify";
import "@yaireo/tagify/dist/tagify.css";
import $ from "jquery";

const TagInput = ({ className, placeholder, tagifyObject, value, name ,id }) => {
  // console.log("🚀 ~ TagInput ~ tagifyObject:", tagifyObject)
  // const [value, setValue] = useState([]);
  const tagifyRef = useRef(null);

  useEffect(() => {
    const tagify = new Tagify(tagifyRef.current, {
      ...tagifyObject,
    });

    tagify.on("add", (e) => {
      value.push(e.detail.data.value);
      $(`.tagify`).removeClass("error-input");
    });

    tagify.on("remove", (e) => {
      let indexToRemove = value.indexOf(e.detail.data.value);
      value.splice(indexToRemove, 1);
    });
    

    return () => {
      tagify.destroy();
    };
  }, []);
  return (
    <div>
      <input
        ref={tagifyRef}
        className={className}
        placeholder={placeholder}
        name={name}
        id={id}
      />
      {/* <button onClick={() => console.log(value)}>Show</button> */}
    </div>
  );
};

export default TagInput;
