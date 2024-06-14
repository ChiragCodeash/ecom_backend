import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function ImageGallery() {
  const [files, setFiles] = useState([]);

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files).map((file) => ({
      id: file.name,
      path: file,
    }));
    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedFiles = Array.from(files);
    const [reorderedItem] = reorderedFiles.splice(result.source.index, 1);
    reorderedFiles.splice(result.destination.index, 0, reorderedItem);

    setFiles(reorderedFiles);
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} multiple />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="image-gallery" direction="horizontal">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {files.map((file, index) => (
                <Draggable key={file.id} draggableId={file.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <img src={URL.createObjectURL(file.path)} style={{ height: "100px", width: "100px" }} alt={`Image ${index + 1}`} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default ImageGallery;
