import React, { useState } from "react";
import RichTextEditor from "./RichTextEditor";
import { createStyledText } from "../utils/editorUtils";
import axiosInstance from "../api/axiosInstance.js";
import { useUserInfo } from "../context/useUserInfo"; // import user info to get userID
import LoadingSpinner from "./common/LoadingSpinner.js";
import { useParams } from "react-router-dom";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";

const AIResponseModal = ({ isOpen, onClose, caseDescription }) => {
  //for generate AI response endpoint
  const { caseId } = useParams(); //get case id from params
  const { user } = useUserInfo();
  const userID = user?.userID; //user id from context
  const [isLoading, setIsLoading] = useState(false); // loading state for spinner

  const [userInput, setUserInput] = useState({ styled: "", plain: "" }); // styled for frontend, plain to send to backend
  const [aiResponse, setAiResponse] = useState("");
  const [isUsingAIResponse, setIsUsingAIResponse] = useState(false);
  const [isAI, setIsAI] = useState(false);
  const initialDescription = caseDescription ?? "";
  if (!isOpen) return null;

  const handleGenerateAIResponse = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(
        `/cases/${caseId}/${userID}/response`,
        { content: userInput.plain, use_ai: true } // Send plain userinput to backend
      );

      if (response.data?.generatedContent) {
        const generatedResponse = createStyledText(
          response.data.generatedContent
        );
        setAiResponse(generatedResponse);
        setIsAI(true);
      } else {
        setAiResponse(createStyledText("No AI response available."));
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setAiResponse(createStyledText("Failed to generate AI response."));
    }
    setIsLoading(false);
  };

  const handleUserInputChange = (content) => {
    setUserInput({ styled: content.styled, plain: content.plain });
    setIsAI(false);
  };

  const handleAIResponseChange = (content) => {
    setAiResponse(content.styled); // Update AI response in the state
  };

  const handleClose = () => {
    setUserInput(""); // reset user input
    setAiResponse(""); // reset AI response
    setIsUsingAIResponse(false);
    setIsAI(false);
    onClose(); // calls the parent-provided onClose function
  };

  const handleSendReply = async () => {
    console.log("Sending Reply:", userInput.styled || aiResponse); // Simulate send
    try {
      const newReply = userInput.styled || aiResponse;
      const useAI = isAI;
      // Send the reply to the backend and save message from the user
      axiosInstance.post(`/cases/${caseId}/${userID}/send`, {
        content: newReply,
        use_ai: useAI, // Send AI flag
      });
      // Close the modal after sending
      handleClose();
    } catch (error) {
      console.error("Error sending reply:", error);
    }
    
  };

  const handleUseAIResponse = () => {
    setUserInput(aiResponse); // Replace user input with AI response
    setIsUsingAIResponse(true);
    setIsAI(true);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg w-[95%] max-w-6xl p-6 shadow-lg">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-semibold text-navy-500">
            Generate Response
          </h2>
          <button
            className="text-gray-500 hover:text-red-500 text-2xl"
            onClick={handleClose}
          >
            &times;
          </button>
        </div>
        {isUsingAIResponse && (
          <div className="flex justify-end pt-2">
            <button
              className="text-sm text-navy-400 hover:bg-gray-200 font-semibold btn border border-navy-400 px-3 py-1 rounded-md"
              onClick={handleSendReply}
            >
              Send Reply
            </button>
          </div>
        )}
        <div className="mt-2 flex flex-col border border-navy-500 p-2 rounded-lg">
          {/* User input editor */}
          <div className="flex items-start">
            {!isUsingAIResponse && (
              <button
                className="mt-12 bg-transparent p-0 border-none focus:outline-none hover:scale-105 active:scale-95"
                onClick={handleGenerateAIResponse}
              >
                <img
                  src="./assets/GenerateResponseIcon.png"
                  alt="Generate AI Response"
                  className="max-w-full max-h-12 object-contain"
                />
              </button>
            )}
            <div className="w-full">
              <RichTextEditor
                onContentChange={handleUserInputChange}
                placeholder="Type your message..."
                height={"h-48"}
                border={false}
                styledText={initialDescription}
              />
            </div>
          </div>

          {/* AI response editor */}
          {(isLoading || (aiResponse && !isUsingAIResponse)) && (
            <div className="mt-6">
              <div className="flex items-center justify-between border-b border-navy-500 mt-2">
                <h3 className="text-lg font-semibold text-navy-500">
                  AI Response
                </h3>
                {isLoading ? (
                  <></>
                ) : (
                  <Menu>
                    <MenuHandler>
                      <button className="flex text-sm text-navy-400 hover:bg-gray-200 font-semibold btn border border-navy-400 mb-2">
                        Actions
                        <svg
                          className="-mr-1 size-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                          data-slot="icon"
                        >
                          <path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" />
                        </svg>
                      </button>
                    </MenuHandler>
                    <MenuList className="bg-white border border-gray-200 shadow-lg rounded-md">
                      <MenuItem
                        onClick={handleSendReply}
                        className="text-sm text-navy-400 hover:text-navy-500 hover:bg-gray-100"
                      >
                        Send Reply
                      </MenuItem>
                      <MenuItem
                        onClick={handleUseAIResponse}
                        className="text-sm text-navy-400 hover:text-navy-500 hover:bg-gray-100"
                      >
                        Edit AI Generated
                      </MenuItem>
                    </MenuList>
                  </Menu>
                )}
              </div>
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <div className="mt-2 overflow-y-auto">
                  <RichTextEditor
                    onContentChange={handleAIResponseChange}
                    readOnly={false}
                    styledText={aiResponse}
                    height={"h-48"}
                    border={false}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIResponseModal;
