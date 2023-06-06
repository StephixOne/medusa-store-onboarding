import React, { useState } from "react";
import clsx from "clsx";
import { Highlight, themes } from "prism-react-renderer";

const CodeSnippets = ({
  snippets,
}: {
  snippets: {
    label: string;
    language: string;
    code: string;
  }[];
}) => {
  const [active, setActive] = useState(snippets[0]);
  return (
    <div className="rounded-lg bg-stone-900">
      <div className="flex gap-2 rounded-t-lg border-b border-b-stone-600 bg-stone-800 px-6 py-4">
        {snippets.map(snippet => (
          <div
            className={clsx(
              "text-small rounded-xl border border-transparent px-4 py-2 font-semibold",
              {
                "border-stone-600 bg-stone-900 text-white":
                  active.label === snippet.label,
              },
              {
                "cursor-pointer text-gray-400": active.label !== snippet.label,
              }
            )}
            key={snippet.label}
            onClick={() => setActive(snippet)}
          >
            {snippet.label}
          </div>
        ))}
      </div>
      <div className="p-6">
        <Highlight
          theme={{
            ...themes.palenight,
            plain: {
              color: "#7E7D86",
              backgroundColor: "#1C1C1F",
            },
          }}
          code={active.code}
          language={active.language}
        >
          {({ style, tokens, getLineProps, getTokenProps }) => (
            <pre
              style={{ ...style, background: "transparent", fontSize: "12px" }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
};

export default CodeSnippets;
