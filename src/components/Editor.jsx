import Editor from "react-simple-code-editor";
import React from "react";
import { useState } from "react";
import { Box } from "@mui/material";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";

export default function PostEditor({code, setCode}) {
	
	return (
		<Box sx={{ width: "100%", border: "1px solid black" }}>
			<Editor
				value={code}
				onValueChange={(code) => setCode(code)}
				highlight={(code) => highlight(code, languages.js)}
				padding={10}
				style={{
					fontFamily: '"Fira code", "Fira Mono", monospace',
					fontSize: 12,
					maxHeight: "75vh",
					minHeight: "200px",
					backgroundColor: "white",
				}}
				className="editor"
			/>
		</Box>
	);
}
