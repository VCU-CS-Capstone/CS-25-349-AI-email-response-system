import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance.js";
import { useParams } from "react-router-dom";
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
  Typography,
} from "@material-tailwind/react";
import {
  HomeIcon,
  UserIcon,
  RefreshIcon,
  ExclamationIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowCircleUpIcon,
  DesktopComputerIcon,
  UserCircleIcon
} from "@heroicons/react/solid";

// Define a mapping of timeline types to colors
const timelineColors = {
  "Case Created": "bg-pink-300",
  "Case Assigned": "bg-blue-300",
  "Case Reassigned": "bg-orange-200",
  "Case Escalated": "bg-yellow-300",
  "Case Resolved": "bg-green-300",
  "Case Closed": "bg-gray-300",
  "Case Reopened": "bg-purple-300",
  "New AI Response": "bg-blue-400",
  "New Response": "bg-green-400",
};

// Define a mapping of timeline types to icons
const timelineIcons = {
  "Case Created": HomeIcon,
  "Case Assigned": UserIcon,
  "Case Reassigned": RefreshIcon,
  "Case Escalated": ExclamationIcon,
  "Case Resolved": CheckCircleIcon,
  "Case Closed": XCircleIcon,
  "Case Reopened": ArrowCircleUpIcon,
  "New AI Response": DesktopComputerIcon,
  "New Response": UserCircleIcon,
};

// Function to get the color based on timeline type
const getTimelineColor = (type) => timelineColors[type] || "bg-gray-500";

// Function to get the icon based on timeline type
const getTimelineIcon = (type) => timelineIcons[type] || HomeIcon;

const CaseTimeline = () => {
  const { caseId } = useParams(); // Fetch caseId from URL parameters
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const response = await axiosInstance.get(`/timelines/case/${caseId}`);
        if (response.data && response.data.length > 0) {
          setTimeline(response.data);
        } else {
          console.log(`No timelines found for case ID ${caseId}`);
        }
      } catch (error) {
        console.error("Error fetching timeline:", error);
      }
    };
    fetchTimeline();
  }, [caseId, timeline]);

  return (

    <div className="h-[1000px] overflow-y-auto pr-2">
      {timeline.length > 0 ? (
        <Timeline>
          {timeline.map((item) => {
            const timelineType =
              item.timeline_type?.description || "No description";
            const timelineColor = getTimelineColor(timelineType);
            const IconComponent = getTimelineIcon(timelineType);

            return (
              <TimelineItem
                key={item.timeline_id}
                className={`p-4 ${timelineColor} rounded-lg mb-2`}
              >
                <TimelineConnector className="opacity-[0.005]" />
                <TimelineHeader>
                  <TimelineIcon className="p-2">
                    <IconComponent className="h-5 w-5 text-white" />
                  </TimelineIcon>
                  <Typography variant="h5" color="blue-gray">
                    {timelineType}
                  </Typography>
                </TimelineHeader>
                <TimelineBody className="pb-8">
                  <Typography
                    color="gray"
                    className="font-normal text-gray-600"
                  >
                    {timelineType === "Case Created" ? (
                      <>
                        Created by: {item.created_by?.full_name || "Unknown"} on{" "}
                        {item.created_date
                          ? new Date(item.created_date).toLocaleString()
                          : "N/A"}
                      </>
                    ) : (
                      <>
                        {item.created_date
                          ? new Date(item.created_date).toLocaleString()
                          : "N/A"}
                      </>
                    )}
                  </Typography>
                </TimelineBody>
              </TimelineItem>
            );
          })}
        </Timeline>
      ) : (
        <Typography>No timeline available for this case.</Typography>
      )}
    </div>
  );
};

export default CaseTimeline;
