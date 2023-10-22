// @ts-nocheck
import {  useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { taskActions } from "../../store/reducers/tasks";
import TaskModal from "../Modal/TaskModal";
import { HOST } from "../../server";
import TaskTable from "../Table/TaskTable";
import DeleteModal from "../Modal/DeleteModal";

const tasks = async (page, limit) => {
  try {
    const res = await fetch(`${HOST}/api/tasks?page=${page}&limit=${limit}`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    return data;
  } catch (error) {
    return error;
  }
};

const Tasks = () => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModalId, setDeleteModalId] = useState(null);

  const dispatch = useDispatch();
  const { data, refetch } = useQuery({
    queryFn: () => tasks(page + 1, rowsPerPage),
    queryKey: ["tasks/fetch-tasks", page, rowsPerPage],
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

  // create new task

  const addTaskClickHandler = () => {
    dispatch(taskActions.setModalOpen(true));
    dispatch(
      taskActions.setTaskData({
        description: "",
        date: "",
      })
    );
  };

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
    refetch();
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    refetch();
  };

  const handleDeleteModal = (e, row) => {
    setDeleteModal(true);
    setDeleteModalId(row._id);
  };

  return (
    <div className="relative flex flex-1 flex-col gap-7 overflow-hidden px-10 py-14">
      <div className="">
        <h1 className="font-semibold md:text-xl">To Do</h1>
        <div className="mt-4 w-full border-b-2 border-slate-300" />
      </div>
      <TaskTable
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleDeleteModal={handleDeleteModal}
        rows={rows}
        addTaskClickHandler={addTaskClickHandler}
        handleModalOpen={handleModalOpen}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        page={page}
      />
      <TaskModal
        refetch={refetch}
        userInfo={userInfo}
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
