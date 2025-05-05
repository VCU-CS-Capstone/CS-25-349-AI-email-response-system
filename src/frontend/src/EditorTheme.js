const EditorTheme = {
  code: "bg-white p-2 border border-navy-300 rounded",
  heading: {
    h1: "text-navy-600 text-3xl font-bold mb-4",
    h2: "text-navy-500 text-2xl font-bold mb-3",
    h3: "text-navy-400 text-xl font-bold mb-2",
    h4: "text-navy-400 text-lg font-semibold mb-2",
    h5: "text-navy-300 text-md font-semibold mb-2",
  },
  image: "my-4", // Margin for images
  link: "text-navy-500 underline hover:text-navy-600", // Link styles with hover effect
  list: {
    listitem: "list-disc list-inside mb-2 text-navy-600", // List item styles
    nested: {
      listitem: "list-disc list-inside ml-4 text-navy-600", // Nested list styles
    },
    ol: "list-decimal list-inside mb-2 text-navy-600", // Ordered list styles
    ul: "list-disc list-inside mb-2 text-navy-600", // Unordered list styles
  },
  ltr: "ltr", // Left-to-right text
  paragraph: "mb-4 text-navy-500",
  placeholder: "text-navy-400 italic",
  quote: "border-l-4 border-navy-300 pl-4 italic text-navy-600 bg-navy-50",
  rtl: "rtl", // Right-to-left text
  text: {
    bold: "font-bold text-navy-600",
    code: "bg-white p-1 rounded",
    hashtag: "text-navy-600",
    italic: "italic text-navy-600",
    overflowed: "overflow-hidden",
    strikethrough: "line-through text-navy-600",
    underline: "underline text-navy-600",
    underlineStrikethrough: "line-through underline text-navy-600",
  },
  exportDomTimeTravel: "bg-white p-2 border border-navy-300 rounded",
};
export default EditorTheme;
