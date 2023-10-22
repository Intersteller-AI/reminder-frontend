// @ts-nocheck
import { ModalClose, Sheet } from "@mui/joy";
import { Modal } from "@mui/material";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { taskActions } from "../../store/reducers/tasks";
import toast from "react-hot-toast";
import { createNewTask, updateTask } from "../../services/reminders";
import { useMutation } from "@tanstack/react-query";
import DateTimePick from "../DateTimePick";
import SubmitButton from "../SubmitButton";
import Description from "../Description";

const TaskModal = ({ refetch }) => {
  const { modalOpen, taskData } = useSelector((state) => state.task);
  const dispatch = useDispatch();
  const changeRef = useRef();

  const handleModalClose = () => {
    dispatch(taskActions.setModalOpen(false));
    dispatch(taskActions.setTaskData({}));
    dispatch(taskActions.setIsNew(false));
  };

  const handleCalenderChange = (newValue) => {
    dispatch(
      taskActions.setTaskData({
        ...taskData,
        date: newValue.toISOString(),
      })
    );
    if (taskData.description && taskData.date) {
      changeRef.current.style.display = "block";
    }
  };

  const handleChange = (e) => {
    dispatch(
      taskActions.setTaskData({
        ...taskData,
        description: e.target.value,
      })
    );
    if (taskData.description && taskData.date) {
      changeRef.current.style.display = "block";
    }
  };

  const { mutate: createNewMutate, isLoading: createNewIsLoading } =
    useMutation({
      mutationFn: (fulltaskData) => {
        return createNewTask({ taskData: fulltaskData });
      },
      onSuccess: (data) => {
        refetch();
        toast.success("Task created successfully!");
        dispatch(taskActions.setModalOpen(false));
      },
      onError: (error) => {
        console.log(error);
        toast.error(error.message);
      },
    });

  const handleCreateSubmit = () => {
    createNewMutate(taskData);
    // console.log("created", taskData);
  };

  const { mutate, isLoading: updateIsLoading } = useMutation({
    mutationFn: (fulltaskData) => {
      return updateTask({ taskData: fulltaskData });
    },
    onSuccess: (data) => {
      refetch();
      toast.success("Task updated successfully!");
      dispatch(taskActions.setModalOpen(false));
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  const handleUpdateSubmit = () => {
    // console.log("update", taskData);
    if (taskData._id) {
      mutate(taskData);
    }
  };

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={modalOpen}
      onClose={handleModalClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Sheet
        sx={{
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
        }}
      >
        <ModalClose
          onClick={handleModalClose}
          variant="outlined"
          sx={{
            bgcolor: "background.surface",
          }}
        />
        <div className="relative flex flex-col">
          {/* title */}
          <div className="w-full">
            <h1 className="text-center text-3xl font-semibold">Set Reminder</h1>
          </div>
          {/* description and info section */}
          <div className="mt-2 h-full md:px-4 ">
            <div className="flex h-full flex-col py-2">
              <Description handleChange={handleChange} taskData={taskData} />
              <div className="relative flex flex-col gap-4 py-4">
                <DateTimePick
                  handleCalenderChange={handleCalenderChange}
                  taskData={taskData}
                />
                <SubmitButton
                  handleSubmit={
                    taskData?._id ? handleUpdateSubmit : handleCreateSubmit
                  }
                  createNewIsLoading={createNewIsLoading}
                  updateIsLoading={updateIsLoading}
                  changeRef={changeRef}
                />
              </div>
            </div>
          </div>
        </div>
      </Sheet>
    </Modal>
  );
};

export default TaskModal;
