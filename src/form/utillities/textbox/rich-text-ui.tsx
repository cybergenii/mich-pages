 
// import Quill from "quill";
// import "quill/dist/quill.snow.css";
// import { useEffect, useRef } from "react";

// const PresetQuillEditor = ({
//   initialValue = "",
//   onChange,
// }: {
//   onChange: (data: any) => void;
//   initialValue: string;
// }) => {
//   const editorRef = useRef<HTMLDivElement>(null);
//   const quillRef = useRef<Quill | null>(null);
//   const toolbarRef = useRef<HTMLDivElement>(null);

//   // Set up the editor once on mount
//   useEffect(() => {
//     if (!editorRef.current || quillRef.current) return;

//     // Create container for toolbar
//     if (!toolbarRef.current) return;

//     // Initialize Quill with the toolbar reference
//     const quill = new Quill(editorRef.current, {
//       theme: "snow",
//       modules: {
//         toolbar: toolbarRef.current,
//         clipboard: {
//           matchVisual: false,
//         },
//       },
//     });

//     // Set initial value
//     if (initialValue) {
//       quill.root.innerHTML = initialValue;
//     }

//     // Set up change handler
//     quill.on("text-change", () => {
//       const html = quill.root.innerHTML;
//       onChange(html);
//     });

//     quillRef.current = quill;

//     // Cleanup function
//     return () => {
//       quillRef.current = null;
//     };
//   }, [initialValue, onChange]);

//   // Handle updates to initialValue
//   useEffect(() => {
//     const quill = quillRef.current;
//     if (!quill) return;

//     // Only update if value differs and editor isn't focused
//     // This prevents disrupting user typing
//     if (initialValue !== quill.root.innerHTML && !quill.hasFocus()) {
//       quill.root.innerHTML = initialValue;
//     }
//   }, [initialValue]);

//   return (
//     <div className="h-full w-fit min-h-[100px]">
//       {/* Separate toolbar container */}
//       <div ref={toolbarRef}>
//         <span className="ql-formats">
//           <select className="ql-header">
//             <option value="1">Heading 1</option>
//             <option value="2">Heading 2</option>
//             <option value="">Normal</option>
//           </select>
//           <select className="ql-font"></select>
//         </span>
//         <span className="ql-formats">
//           <select className="ql-size"></select>
//         </span>
//         <span className="ql-formats">
//           <button className="ql-bold"></button>
//           <button className="ql-italic"></button>
//           <button className="ql-underline"></button>
//           <button className="ql-strike"></button>
//           <button className="ql-blockquote"></button>
//         </span>
//         <span className="ql-formats">
//           <button className="ql-list" value="ordered"></button>
//           <button className="ql-list" value="bullet"></button>
//           <button className="ql-indent" value="-1"></button>
//           <button className="ql-indent" value="+1"></button>
//         </span>
//         <span className="ql-formats">
//           <button className="ql-link"></button>
//           <button className="ql-image"></button>
//           <button className="ql-video"></button>
//         </span>
//         <span className="ql-formats">
//           <button className="ql-clean"></button>
//         </span>
//       </div>

//       {/* Editor container */}
//       <div ref={editorRef} />
//     </div>
//   );
// };

// export default PresetQuillEditor;
import Quill, { Delta } from "quill";
import "quill/dist/quill.snow.css";
import React, { forwardRef, useEffect, useLayoutEffect, useRef } from "react";

// Define prop types for the editor
interface EditorProps {
  readOnly?: boolean;
  defaultValue?: Delta | string;
  onTextChange?: (delta: Delta, oldContents: Delta, source: string) => void;
  onSelectionChange?: (
    range: { index: number; length: number } | null,
    oldRange: { index: number; length: number } | null,
    source: string
  ) => void;
}

// Editor component using forwardRef to match the example
const Editor = forwardRef<Quill, EditorProps>(
  (
    { readOnly = false, defaultValue, onTextChange, onSelectionChange },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    // Update callback refs when they change
    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    // Handle readOnly state changes
    useEffect(() => {
      if (ref && "current" in ref && ref.current) {
        ref.current.enable(!readOnly);
      }
    }, [ref, readOnly]);

    // Initialize Quill
    useEffect(() => {
      if (!containerRef.current) return;

      const container = containerRef.current;

      // Create toolbar div
      const toolbarDiv = container.ownerDocument.createElement("div");
      toolbarDiv.id = "toolbar";
      toolbarDiv.innerHTML = `
        <span class="ql-formats">
          <select class="ql-header">
            <option value="1">Heading 1</option>
            <option value="2">Heading 2</option>
            <option selected>Normal</option>
          </select>
          <select class="ql-font"></select>
        </span>
        <span class="ql-formats">
          <select class="ql-size"></select>
        </span>
        <span class="ql-formats">
          <button class="ql-bold"></button>
          <button class="ql-italic"></button>
          <button class="ql-underline"></button>
          <button class="ql-strike"></button>
          <button class="ql-blockquote"></button>
        </span>
        <span class="ql-formats">
          <button class="ql-list" value="ordered"></button>
          <button class="ql-list" value="bullet"></button>
          <button class="ql-indent" value="-1"></button>
          <button class="ql-indent" value="+1"></button>
        </span>
        <span class="ql-formats">
          <button class="ql-link"></button>
          <button class="ql-image"></button>
          <button class="ql-video"></button>
        </span>
        <span class="ql-formats">
          <button class="ql-clean"></button>
        </span>
      `;
      container.appendChild(toolbarDiv);

      // Create editor div
      const editorDiv = container.ownerDocument.createElement("div");
      container.appendChild(editorDiv);

      // Initialize Quill with toolbar
      const quill = new Quill(editorDiv, {
        theme: "snow",
        modules: {
          toolbar: "#toolbar",
          clipboard: {
            matchVisual: false,
          },
        },
      });

      // Set forwarded ref value
      if (ref && typeof ref === "object") {
        ref.current = quill;
      }

      // Set initial content if provided
      if (defaultValueRef.current) {
        if (typeof defaultValueRef.current === "string") {
          quill.root.innerHTML = defaultValueRef.current;
        } else {
          quill.setContents(defaultValueRef.current);
        }
      }

      // Set up event listeners
      quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        onTextChangeRef.current?.(...args);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      // Cleanup function
      return () => {
        if (ref && typeof ref === "object") {
          ref.current = null;
        }
        container.innerHTML = "";
      };
    }, [ref]);

    return (
      <div className="h-full w-fit min-h-[100px]">
        <div ref={containerRef}></div>
      </div>
    );
  }
);

Editor.displayName = "Editor";

// Define prop types for the main App component using the Editor
interface PresetQuillEditorProps {
  initialValue?: string;
  onChange?: (data: string) => void;
  readOnly?: boolean;
}

// Main component that uses the Editor
const PresetQuillEditor = ({
  initialValue = "",
  onChange,
  readOnly = false,
}: PresetQuillEditorProps) => {
  const [_range, setRange] = React.useState<{
    index: number;
    length: number;
  } | null>(null);
  const [_lastChange, setLastChange] = React.useState<Delta | null>(null);
  const quillRef = useRef<Quill>(null);

  // Convert initialValue to Delta if it's a string
  const initialDelta = React.useMemo(() => {
    if (!initialValue) return new Delta();

    // Create a temporary div to convert HTML to Delta
    const div = document.createElement("div");
    div.innerHTML = initialValue;

    const tempQuill = new Quill(div);
    return tempQuill.getContents();
  }, [initialValue]);

  // Handle text changes
  const handleTextChange = (delta: Delta) => {
    setLastChange(delta);
    if (onChange && quillRef.current) {
      onChange(quillRef.current.root.innerHTML);
    }
  };

  return (
    <Editor
      ref={quillRef}
      readOnly={readOnly}
      defaultValue={initialDelta}
      onSelectionChange={(newRange) => setRange(newRange)}
      onTextChange={handleTextChange}
    />
  );
};

export default PresetQuillEditor;