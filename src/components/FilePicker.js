import React, { useState, useEffect } from "react";
import "../App.css";
export default function FilePicker() {
  const [file, setFile] = useState(null);
  const pickFile = e => {
    try {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (function() {
        return function(e) {
          setFile(e.target.result);
        };
      })(file);
      reader.readAsDataURL(file);
    } catch (err) {}
  };

  return (
    <label
      for="apex_input"
      class="file_input"
      style={{
        margin: 30,
        padding: 20,
        borderRadius: 20,
        paddingTop: 100,
        paddingBottom: 100,
        display: "flex",
        flexDirection: "column",
        height: 200,
        boxShadow: "1px 1px 2px 2px lightgrey",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        border: "2px dashed grey"
      }}
    >
      <div>
        <p style={{ fontSize: 30, fontWeight: "bold" }}>
          Drag & Drop APEX File Here
        </p>
        <p>Or</p>
        <p class="choose_button">Choose File</p>
      </div>
      <input
        onChange={pickFile}
        id="apex_input"
        style={{ display: "none" }}
        type="file"
        accept=".apex"
      />
    </label>
  );
}
