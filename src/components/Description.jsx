import React from "react";

const Description = ({handleChange, taskData}) => {
  return (
    <div className="h-[20vh] w-[80vw] md:w-[50vw] lg:w-[30vw]">
      <textarea
        placeholder="What reminder you want to set ?"
        value={taskData.description}
        onChange={handleChange}
        className="custom-scrollbar h-full w-full rounded-md border border-slate-300 py-2 px-3 font-medium outline-none"
        name="description"
        style={{
          resize: "none",
        }}
      />
    </div>
  );
};

export default Description;
