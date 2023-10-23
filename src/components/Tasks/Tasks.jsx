// @ts-nocheck
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { taskActions } from "../../store/reducers/tasks";
import TaskModal from "../Modal/TaskModal";
import { HOST } from "../../server";
import TaskTable from "../Table/TaskTable";
import DeleteModal from "../Modal/DeleteModal";
import axios from "axios";

const reminders = async () => {
  try {
    const { data } = await axios.get(`${HOST}/api/reminders`, {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    return error;
  }
};

const Tasks = () => {
  const [rows, setRows] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModalId, setDeleteModalId] = useState(null);
  const [taskData, setTaskData] = useState({
    name: "",
    description: "",
    date: "",
  });

  const dispatch = useDispatch();
  const { data, refetch } = useQuery({
    queryFn: () => reminders(),
    queryKey: ["reminders"],
  });
  const { modalOpen } = useSelector((state) => state.task);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (data) {
      setRows(data?.tasks);
      // setTotalPages(data?.metadata?.totalPages);
    }
  }, [data, modalOpen]);

  const handleModalOpen = (e, row) => {
    dispatch(taskActions.setModalOpen(!modalOpen));
    dispatch(taskActions.setTaskData(row));
  };

  const addTaskClickHandler = () => {
    dispatch(taskActions.setModalOpen(true));
    setTaskData({
      description: "",
      date: "",
    });
  };

  const handleDeleteModal = (e, row) => {
    setDeleteModal(true);
    setDeleteModalId(row._id);
  };

  return (
    <div className="relative flex flex-1 flex-col gap-7 overflow-hidden px-10 py-14">
      <div className="">
        <h1 className="font-semibold md:text-xl">Reminders</h1>
        <div className="mt-4 w-full border-b-2 border-slate-300" />
      </div>
      <TaskTable
        handleDeleteModal={handleDeleteModal}
        rows={rows}
        addTaskClickHandler={addTaskClickHandler}
        handleModalOpen={handleModalOpen}
      />
      <TaskModal
        refetch={refetch}
        userInfo={userInfo}
        taskData={taskData}
        setTaskData={setTaskData}
      />
      <DeleteModal
        open={deleteModal}
        setOpen={setDeleteModal}
        id={deleteModalId}
        refetch={refetch}
      />
    </div>
  );
};

export default Tasks;
