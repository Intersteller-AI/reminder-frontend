// @ts-nocheck
import Box from "@mui/material/Box";
import { calculateTime } from "../../utils/CalculateTime";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { AiFillDelete } from "react-icons/ai";
import { BiMessageSquareEdit } from "react-icons/bi";

const COLUMNS = [
  { field: "description", headerName: "Title", width: 220 },
  {
    field: "date",
    headerName: "Time",
    width: 120,
    align: "left",
    headerAlign: "left",
    valueGetter: (params) => calculateTime(params.row.date),
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 180,
  },
];

const TaskTable = ({
  addTaskClickHandler,
  isLoading,
  rows,
  handleDeleteModal,
  handleModalOpen,
}) => {
  return (
    <div className="relative overflow-y-auto max-h-[50vh]">
      <Box
        sx={{
          height: 500,
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <TableContainer component={Paper}>
          <Toolbar>
            <Button
              color="primary"
              startIcon={<AddIcon />}
              onClick={addTaskClickHandler}
            >
              Set Reminder
            </Button>
          </Toolbar>
          <Table aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                {COLUMNS.map((column) => (
                  <TableCell key={column.field}>{column.headerName}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow className="">
                  <TableCell colSpan={3}>Loading...</TableCell>
                </TableRow>
              ) : (
                rows?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="left" width={180} className="capitalize">
                      {row.description}
                    </TableCell>
                    <TableCell align="left" width={180} className="capitalize">
                      {calculateTime(row.date)}
                    </TableCell>
                    <TableCell align="left" width={100} className="capitalize">
                      <div className="flex items-center gap-2">
                        <div
                          className="flex w-fit items-center justify-center rounded-full p-2 hover:cursor-pointer hover:bg-blue-500/40"
                          onClick={(e) => handleModalOpen(e, row)}
                        >
                          <BiMessageSquareEdit
                            size={20}
                            className="text-blue-500"
                          />
                        </div>
                        <div
                          className="flex w-fit items-center rounded-full p-2 hover:cursor-pointer hover:bg-red-500/40"
                          onClick={(e) => handleDeleteModal(e, row)}
                        >
                          <AiFillDelete size={20} className="text-red-500" />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )).reverse()
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default TaskTable;
