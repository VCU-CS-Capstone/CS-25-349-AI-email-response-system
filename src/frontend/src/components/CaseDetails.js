import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance.js";
import { useParams } from "react-router-dom";
import RichTextEditor from "./RichTextEditor";
import { useNavigate } from "react-router-dom";
import { Button, Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import AIResponseModal from "./AIResponseModal.js";
import { Status } from "../enums/status.js";
import CaseTimeline from "./CaseTimeline.js";
import { useCallback } from "react";

const CaseDetails = () => {
  const navigate = useNavigate();
  const { caseId } = useParams();

  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [styledDescription, setStyledDescription] = useState("");
  const [editedStyledDescription, setEditedStyledDescription] = useState("");
  const [statusId, setStatusId] = useState(-1);
  const [createdBy, setCreatedBy] = useState("");
  const [assignedTo, setAssignedTo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Toggle between read-only and edit mode.
  const [isEditing, setIsEditing] = useState(false);;
  // Loading state for messages.
  const [messages, setMessages] = useState([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);

  const assignedOptions = [
    { label: "Emma", value: 1 },
    { label: "Cameron", value: 2 },
    { label: "Angela", value: 3 },
    { label: "Sohil", value: 4 },
    { label: "Keroles", value: 5 },
    { label: "Unassigned", value: "" },
  ];

  // Fetch messages related to the case.
  const fetchMessages = useCallback(async () => {
    try {
      console.log(`Fetching messages for case ID: ${caseId}`);
      const response = await axiosInstance.get(`/cases/${caseId}/messages`);
      const messages = response.data;
      setMessages(messages);
      if (messages.length === 0) {
        console.log("No messages found.");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
    setIsLoadingMessages(false);
  }, [caseId]);

  // Fetch case details and messages when component mounts or when caseId changes.
  useEffect(() => {

    const fetchCaseDetails = async () => {
      try {
        const response = await axiosInstance.get(`/cases/${caseId}/details`);
        const {
          subject,
          description,
          formatted_description,
          status_id,
          created_by_user,
          repID,
        } = response.data;
        setSubject(subject);
        setDescription(description);
        setStyledDescription(formatted_description);
        setEditedStyledDescription(formatted_description);
        setStatusId(status_id);
        setCreatedBy(created_by_user);
        setAssignedTo(repID ?? null);
      } catch (error) {
        console.error("Error fetching case:", error);
      }
    };

    fetchCaseDetails();
    fetchMessages();
  }, [caseId, fetchMessages]);

  const handleEditedContentChange = (content) => {
    if (content && typeof content === "object") {
      setEditedStyledDescription(content.styled);
      setDescription(content.plain);
    } else {
      setEditedStyledDescription(content);
    }
  };

  const handleEdit = () => {
    setEditedStyledDescription(styledDescription);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedStyledDescription(styledDescription);
  };

  const handleSaveEdit = async () => {
    try {
      const payload = {
        description,
        formatted_description: editedStyledDescription,
        status_id: statusId,
        repID: assignedTo,
      };
      const response = await axiosInstance.put(`/cases/${caseId}`, payload);
      setStyledDescription(response.data.formatted_description);
      setDescription(response.data.description);
      setStatusId(response.data.status_id);
      setAssignedTo(response.data.repID ?? null);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving description:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-4">
        <Button
          className="bg-navy-300 text-xs px-3 py-2 w-fit"
          onClick={() => navigate("/casedashboard")}
        >
          ← Return to Case Dashboard
        </Button>
      </div>
      <h1 className="text-3xl font-bold mb-6">Case Details</h1>

      <div className="flex grid grid-cols-12 gap-6">
        {/* Timeline Column */}
        <div className="col-span-12 md:col-span-4 lg:col-span-3 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Timeline</h2>
          <CaseTimeline caseId={caseId} />
        </div>

        {/* Case Details Column */}
        <div className="col-span-12 md:col-span-8 lg:col-span-9 bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Case #{caseId}</h2>
            {!isEditing ? (
              <div className="flex gap-2">
                <Button
                  className="bg-navy-300 text-xs px-3 py-2 w-fit text-white rounded-md shadow-md"
                  onClick={() => setIsModalOpen(true)}
                >
                  Reply
                </Button>
                <Button
                  onClick={handleEdit}
                  className="bg-navy-300 text-xs px-3 py-2 w-fit text-white rounded-md shadow-md"
                >
                  Edit
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button
                  onClick={handleSaveEdit}
                  className="bg-navy-300 text-xs px-3 py-2 w-fit text-white rounded-md shadow-md"
                >
                  Save
                </Button>
                <Button
                  onClick={handleCancelEdit}
                  className="border bg-white text-xs px-3 py-2 w-fit text-navy-300 rounded-md shadow-md border-navy-300"
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>

          <div className="mb-4 flex flex-col md:flex-row md:justify-between p-4 rounded-lg border">
            {/* Status Dropdown */}
            <div className="mb-2 md:mb-0">
              <h3 className="text-lg font-semibold">Status</h3>
              {isEditing ? (
                <Menu>
                  <MenuHandler>
                    <button className="flex items-center text-sm text-navy-400 hover:bg-gray-200 font-semibold btn border border-navy-400">
                      {Object.keys(Status).find((key) => Status[key] === statusId) || "Select Status"}
                      <ChevronDownIcon className="h-4 w-4 ml-1" />
                    </button>
                  </MenuHandler>
                  <MenuList className="bg-white border border-gray-200 shadow-lg rounded-md">
                    {Object.keys(Status).map((key) => (
                      <MenuItem
                        key={key}
                        onClick={() => setStatusId(Status[key])}
                        className="text-sm text-navy-400 hover:text-navy-500 hover:bg-gray-100"
                      >
                        {key}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              ) : (
                <p className="text-gray-700">
                  {Object.keys(Status).find((key) => Status[key] === statusId)}
                </p>
              )}
            </div>

            {/* Created By */}
            <div className="mb-2 md:mb-0">
              <h3 className="text-lg font-semibold">Created By</h3>
              <p className="text-gray-700">{createdBy.full_name}</p>
            </div>

            {/* Assigned Dropdown */}
            <div>
              <h3 className="text-lg font-semibold">Assigned</h3>
              {isEditing ? (
                <Menu>
                  <MenuHandler>
                    <button className="flex items-center text-sm text-navy-400 hover:bg-gray-200 font-semibold btn border border-navy-400">
                      {assignedOptions.find((opt) => opt.value === assignedTo)?.label || "Select Assigned"}
                      <ChevronDownIcon className="h-4 w-4 ml-1" />
                    </button>
                  </MenuHandler>
                  <MenuList className="bg-white border border-gray-200 shadow-lg rounded-md">
                    {assignedOptions.map((opt) => (
                      <MenuItem
                        key={opt.label}
                        onClick={() =>
                          setAssignedTo(opt.value === "" ? null : Number(opt.value))
                        }
                        className="text-sm text-navy-400 hover:text-navy-500 hover:bg-gray-100"
                      >
                        {opt.label}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              ) : (
                <p className="text-gray-700">
                  {assignedOptions.find((opt) => opt.value === assignedTo)?.label || "Unassigned"}
                </p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold">Subject</h3>
            <p className="text-gray-700">{subject}</p>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold">Description</h3>
            {isEditing ? (
              <RichTextEditor
                onContentChange={handleEditedContentChange}
                placeholder="Enter case description here..."
                readOnly={false}
                height={"h-48"}
                styledText={editedStyledDescription}
              />
            ) : styledDescription ? (
              <RichTextEditor
                onContentChange={setDescription} // read-only mode
                placeholder="Enter case description here..."
                readOnly={true}
                height={"h-48"}
                styledText={styledDescription}
              />
            ) : (
              <p className="text-gray-700">{description}</p>
            )}
          </div>

          {/* Message History */}
          <div className="mt-6 p-4 border rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">Message History</h3>
            {isLoadingMessages ? (
              <p>Loading messages...</p>
            ) : messages.length > 0 ? (
              <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                {messages.map((msg) => {
                  console.log("Message sender type:", msg.sender_type, "Message content:", msg.content);

                  const senderLabel = msg.sender_type === "Client" ? "Client" : "Representative";

                  return (
                    <div key={msg.id} className="p-2 bg-gray-200 rounded-md">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-navy-700">
                          {senderLabel}
                        </p>
                        <p className="text-sm text-gray-600">
                          {new Date(msg.created_date).toLocaleString()}
                        </p>
                      </div>
                      <div

                        className="mt-1 text-sm text-gray-800">
                        {/* Render the message content */}
                        <RichTextEditor
                          onContentChange={setDescription} // won't be called in read-only mode
                          readOnly={true}
                          height={"auto"}
                          styledText={msg.content}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-600">No messages yet for this case</p>
            )}
          </div>

          <AIResponseModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              fetchMessages(); // Refresh messages after closing modal
            }}
            caseDescription={styledDescription}
          />
        </div>
      </div>
    </div>
  );
};

export default CaseDetails;
