export function createStyledText(text) {
    return {
      root: {
        children: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: text,
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                version: 1,
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "root",
        version: 1,
      },
    };
  }
  