import React, { useState, useEffect } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/outline";
import axiosInstance from "../api/axiosInstance.js";
import { useUserInfo } from "../context/useUserInfo"; // import user info to get userID
import { useNavigate } from "react-router-dom";
import { Status } from "../enums/status.js";
import LoadingSpinner from "./common/LoadingSpinner.js";
import {
  Card,
  Typography,
  Select,
  Option,
  CardHeader,
  IconButton,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";

const CaseDashboard = () => {
  const navigate = useNavigate();
  const [cases, setCases] = useState([]);
  const [, setTotalCases] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(15);
  const [assignedToMe, setAssignedToMe] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [sortField, setSortField] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // loading state for spinner

  const { user } = useUserInfo();
  const userID = user?.userID; //user id from context
  const TABLE_HEAD = ["ID", "Description", "Status", "Assigned To", "Actions"];

  // Fetch cases from the API pagination route
  useEffect(() => {
    const fetchCases = async () => {
      setIsLoading(true); // set loading state to true before fetching data
      try {
        const response = await axiosInstance.post("/cases", {
          pageSize,
          pageNumber,
          assignedToMe,
          statusFilter,
          sortField,
          userID,
        });

        const { totalCases, currentPage, totalPages, data } = response.data;
        setTotalCases(totalCases);
        setCurrentPage(currentPage);
        setTotalPages(totalPages);
        setCases(data);
      } catch (error) {
        console.error("Error fetching cases:", error);
      } finally {
        setIsLoading(false); // Set loading state to false after data is fetched
      }
    };

    fetchCases();
  }, [assignedToMe, pageNumber, pageSize, sortField, statusFilter, userID]); //Get cases when current page or page size changes

  //logic to go to next page and prev page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setPageNumber(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setPageNumber(currentPage - 1);
    }
  };

  const handleAssignToMe = async (caseItem) => {
    const data = {
      subject: caseItem.subject,
      description: caseItem.description,
      repID: userID,
      formatted_description: caseItem.formatted_description,
    };

    try {
      const response = await axiosInstance.put(`/cases/${caseItem.id}`, data);
      const updatedCase = response.data;
      // Update the cases state with the updated case
      setCases((prevCases) =>
        prevCases.map((c) => (c.id === updatedCase.id ? updatedCase : c))
      );
    } catch (error) {
      console.error("Error assigning case:", error);
    }
  };

  const handleDeleteCase = (caseID) => {
    try {
      axiosInstance.delete(`/cases/${caseID}`);
      setCases((newCases) =>
        newCases.filter((caseItem) => caseItem.id !== caseID)
      );
    } catch (error) {
      console.error("Error deleting case:", error);
    }
  };

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <Button
        className="bg-navy-300 text-xs p-2 w-fit ml-2 mt-2"
        onClick={() => navigate("/home")}
      >
        ← Return to Home
      </Button>
      <h1 className="text-3xl font-bold text-navy-500 p-6 border-b-2 border-navy-500">
        Case Dashboard
      </h1>
      <Card className="p-4 bg-blue-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Assigned To Me Filter */}
          <button
            className={`flex justify-center items-center p-4 flex text-sm text-navy-400 hover:bg-gray-200 font-semibold btn border border-gray-100 mb-2 ${
              assignedToMe
                ? "bg-navy-500 text-white"
                : "border-navy-300 text-navy-400"
            } transition duration-150 ease-in-out`}
            onClick={() => setAssignedToMe(!assignedToMe)}
            variant={assignedToMe ? "filled" : "text"}
          >
            <span className="text-sm">Assigned To Me</span>
          </button>

          {/* Status Filter */}
          <Select
            className="p-4 flex text-sm text-navy-400 hover:bg-gray-200 font-semibold"
            label="Filter by Status"
            onChange={(e) => setStatusFilter(e)}
            labelProps={{
              className: "text-navy-500 font-semibold",
            }}
          >
            <Option value="">All</Option>
            <Option value="new">New</Option>
            <Option value="open">Open</Option>
            <Option value="closed">Closed</Option>
          </Select>

          {/* Sort By */}
          <Select
            className="p-4 flex text-sm text-navy-400 hover:bg-gray-200 font-semibold"
            label="Sort By"
            onChange={(e) => setSortField(e)}
            labelProps={{
              className: "text-navy-500 font-semibold",
            }}
          >
            <Option value="">None</Option>
            <Option value="id">ID</Option>
            <Option value="status">Status</Option>
          </Select>
        </div>
        <CardHeader floated={false} shadow={false} className="rounded-none">
          {/* Filters */}

          {/* Table or Loading Spinner */}
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <Card className="h-full w-full overflow-scroll">
              <table className="w-full table-auto text-left bg-white">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th key={head} className="border-b border-navy-500 p-4">
                        <Typography
                          variant="small"
                          className="text-navy-500 font-normal"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cases.map((caseItem, index) => {
                    const isLast = index === cases.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={caseItem.id}>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            className="font-normal text-navy-500"
                          >
                            {caseItem.id}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            className="font-normal text-navy-500"
                          >
                            {caseItem.subject}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            className="font-normal text-navy-500"
                          >
                            {Object.keys(Status).find(
                              (key) => Status[key] === caseItem.status_id
                            )}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            className="font-normal text-navy-500"
                          >
                            {caseItem.repID === userID
                              ? "Me"
                              : `Rep ${caseItem.repID}`}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Menu placement="right-start" allowHover>
                            <MenuHandler>
                              <Button
                                variant="text"
                                className="capitalize"
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  gap: 4,
                                  marginLeft: -23,
                                }}
                              >
                                <Typography
                                  variant="small"
                                  className="font-normal text-navy-500 flex items-center gap-1"
                                >
                                  Actions
                                  <svg
                                    className="size-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    data-slot="icon"
                                  >
                                    <path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" />
                                  </svg>
                                </Typography>
                              </Button>
                            </MenuHandler>
                            <MenuList>
                              <MenuItem
                                className="hover:bg-gray-200"
                                onClick={() => {
                                  navigate(`/cases/${caseItem.id}`);
                                }}
                              >
                                View
                              </MenuItem>
                              <MenuItem
                                className="hover:bg-gray-200"
                                onClick={() => {
                                  handleAssignToMe(caseItem);
                                }}
                              >
                                Assign to Myself
                              </MenuItem>
                              <MenuItem
                                className="hover:bg-gray-200 text-red-500"
                                onClick={() => {
                                  handleDeleteCase(caseItem.id);
                                }}
                              >
                                Delete
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Card>
          )}
        </CardHeader>

        {/* Pagination Controls */}
        <div className="flex items-center justify-center gap-8 mt-4">
          <IconButton
            size="sm"
            variant="outlined"
            onClick={handlePrevPage}
            disabled={pageNumber === 1}
          >
            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
          </IconButton>
          <Typography color="gray" className="font-normal text-navy-500">
            Page <strong className="text-navy-500">{pageNumber}</strong> of{" "}
            <strong className="text-navy-500">{totalPages}</strong>
          </Typography>
          <IconButton
            size="sm"
            variant="outlined"
            onClick={handleNextPage}
            disabled={pageNumber === totalPages}
          >
            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
          </IconButton>
        </div>
      </Card>
    </div>
  );
};

export default CaseDashboard;
