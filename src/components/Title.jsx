import React from "react";

const Title = ({ taskData, setTaskData }) => {
  const handleChange = (e) => {
    const { value } = e.target;
    setTaskData((prevTaskData) => {
      const updatedTaskData = { ...prevTaskData, name: value };
      return updatedTaskData;
    });
  };
  return (
    <div className="w-full">
      <input
        placeholder="Reminder name ?"
        value={taskData.name}
        onChange={handleChange}
        className="custom-scrollbar h-full w-full rounded-md border border-slate-300 py-3 px-3 font-medium outline-none"
        name="name"
      />
    </div>
  );
};

export default Title;
