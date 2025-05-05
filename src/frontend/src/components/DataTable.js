import React from "react";

const DataTable = () => {
  const dataFeatures = [
    {
      feature: "id",
      description: "A unique identifier for each email in the dataset.",
    },
    {
      feature: "sentDateTime",
      description: "The timestamp when the email was sent",
    },
    {
      feature: "subject",
      description: "The subject line of the email",
    },
    {
      feature: "cleaned_content",
      description:
        "The preprocessed and cleaned text of the email body, removing unnecessary characters, PII, and formatting issues.",
    },
    {
      feature: "CaseID",
      description:
        "A unique identifier linking the email to a specific customer case",
    },
    {
      feature: "threadId",
      description:
        "The identifier for the email thread, helping group messages that are part of the same conversation.",
    },
    {
      feature: "cultureCode",
      description:
        "A code representing the language and region of the email (e.g., 'en-US' for English - United States)",
    },
    {
      feature: "direction",
      description:
        "Indicates whether the email is inbound (from a customer) or outbound (from a representative)",
    },
  ];

  return (
    <div className="overflow-x-auto w-full mt-8">
      <table className="min-w-full table-auto border-collapse border border-navy-400">
        <thead>
          <tr className="bg-navy-500 text-white">
            <th className="border border-white px-6 py-3 text-left font-semibold text-sm">Feature</th>
            <th className="border border-white px-6 py-3 text-left font-semibold text-sm">Description</th>
          </tr>
        </thead>
        <tbody>
          {dataFeatures.map((item, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-navy-400" : "bg-navy-300"
              } hover:bg-navy-500`}
            >
              <td className="border border-white px-6 py-3 text-white text-sm tracking-wide">
                {item.feature}
              </td>
              <td className="border border-white px-6 py-3 text-white text-sm">
                {item.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
