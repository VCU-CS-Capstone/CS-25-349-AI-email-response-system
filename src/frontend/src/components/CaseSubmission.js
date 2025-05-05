import React, { useState } from "react";
import { Button, Alert, Input } from "@material-tailwind/react";
import axiosInstance from "../api/axiosInstance";
import RichTextEditor from "./RichTextEditor";
import { useNavigate } from "react-router-dom";

const CaseSubmissionForm = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState(""); //subject has both plain and styled field
  const [description, setDescription] = useState({ plain: "", styled: "" }); //subject has both plain and styled field
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [caseId, setCaseId] = useState(null);
  const [showOptions, setShowOptions] = useState(false); // Flag to show options
  const [editorKey, setEditorKey] = useState(0); // key for editor to reset

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const caseData = {
      subject: subject || null,
      description: description?.plain || null, // send back plain text
      formatted_description: description?.styled || null, //send back styled text
    };

    try {
      const response = await axiosInstance.post("/cases/submit", caseData);
      console.log("Case submitted successfully.", response.data);
      setCaseId(response.data.id);
      setSuccess("Case submitted successfully.");
      setError(null);
      setShowOptions(true);
    } catch (error) {
      console.error("Network error: ", error);
      setError("There was a problem creating this case. Please try again.");
      setSuccess(null);
    }
  };

  const handleSubmitAnotherCase = () => {
    // Reset form, close the success message, and force re-render Lexical editor
    setSubject("");
    setDescription({ plain: "", styled: "" });
    setSuccess(null);
    setError(null);
    setShowOptions(false);
    setEditorKey((prevKey) => prevKey + 1); // reset lexical editor
  };

  return (
    <div className="min-h-screen flex justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg p-10 md:p-12 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-navy-600 mb-6 text-center">
          Submit a New Case
        </h2>
        {success && (
          <Alert color="green" className="mt-4 mb-4">
            {success}
          </Alert>
        )}
        {error && (
          <Alert color="red" className="mt-4 mb-4">
            {error}
          </Alert>
        )}

        {showOptions && (
          <div className="justify-center flex space-x-4 p-2">
            <Button
              onClick={() => navigate(`/cases/${caseId}`)}
              className="bg-navy-500"
              size="lg"
            >
              Go to Case Details
            </Button>
            <Button
              onClick={handleSubmitAnotherCase}
              className="bg-navy-400"
              size="lg"
            >
              Submit Another Case
            </Button>
          </div>
        )}

        <div className="mb-5">
          <label className="block text-navy-600 font-semibold mb-2">
            Case Subject
          </label>
          <Input
            label="Case Subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)} // Capture subject input
            required
            className="w-full"
            size="lg"
            placeholder="Enter Case Subject"
          />
        </div>
        <div className="mb-5">
          <label className="block text-navy-600 font-semibold mb-2">
            Case Description
          </label>
          <RichTextEditor
            key={editorKey} // reset editor
            onContentChange={setDescription}
            placeholder="Enter case description here..."
          />
        </div>

        <div className="flex flex-col space-y-4">
          {!showOptions && (
            <Button
              type="submit"
              size="lg"
              fullWidth
              onClick={handleSubmit}
              className="bg-navy-500"
            >
              Submit Case
            </Button>
          )}
          <Button
            className="bg-navy-400 self-end px-4 py-2 text-sm"
            onClick={() => navigate("/casedashboard")}
          >
            View all cases
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CaseSubmissionForm;
