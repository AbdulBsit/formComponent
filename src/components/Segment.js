import React, { useState, useContext, useEffect } from "react";
import AddFields from "./AddFields";
import { useActions } from "../contextState/actions";
import { store } from "../contextState/store";

function Segment({ activeIndex, prevSegment, nextSegment }) {
  const { state } = useContext(store);
  const {
    editSegmentField,
    addSegmentField,
    removeSegment,
    removeField,
    setSegmentKeys
  } = useActions();
  const [editIndex, setEditIndex] = useState(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [value, setvalue] = useState(null);
  // TODO deepCompare
  useEffect(() => {}, [activeIndex, state, value]);

  const openEditDialog = index => {
    // TODO async dialog
    // const values = await showEditPrompt(initialValues);
    setEditIndex(index);
    setIsDialogVisible(true);
  };

  const editFieldValue = value => {
    editSegmentField(activeIndex, value, editIndex);
    setEditIndex(null);
  };

  if (state[activeIndex] == null) {
    return null;
  }

  const fieldPreview = (item, index) => {
    switch (item.type) {
      case "custom_text_input":
        return (
          <div style={styles.field} key={index}>
            <p>
              <b>{item.label}</b>
              <br />
              Required :{item.required}, Max Length :{item.maxLength}
            </p>
            <button onClick={() => openEditDialog(index)}>Edit</button>
            <button onClick={() => removeField(activeIndex, index)}>
              Delete
            </button>
          </div>
        );
      case "custom_picker":
        return (
          <div style={styles.field} key={index}>
            <p>
              <b>{item.label}</b>
              <br />
              Required :{item.required},
              <br />
              <h4>Options</h4>
              {item.options.map((item, index) => {
                return (
                  <p>
                    {index + 1} - {item.label}
                  </p>
                );
              })}
            </p>
            <button onClick={() => openEditDialog(index)}>Edit</button>
          </div>
        );
      default:
        return null;
    }
  };

  let { title, subtitle, illustration } = state[activeIndex];
  return (
    <div style={styles.container}>
      <button
        disabled={state.length === 1}
        onClick={() => {
          activeIndex !== 0 && prevSegment();
          removeSegment(activeIndex);
        }}
      >
        Delete
      </button>
      {isDialogVisible && (
        <AddFields
          field={state[activeIndex].fields[editIndex]}
          editField={editIndex !== null}
          toggleDialog={setIsDialogVisible}
          editFieldValue={editFieldValue}
          addField={value => addSegmentField(activeIndex, value)}
          name={state[activeIndex].title}
        />
      )}
      <input
        style={styles.input}
        value={title}
        type="text"
        placeholder="Enter Section Title"
        onChange={e => {
          setvalue(Math.random());
          setSegmentKeys(activeIndex, { title: e.target.value });
        }}
      />
      <input
        value={subtitle}
        style={styles.input}
        type="text"
        placeholder="Enter Section Subtitle"
        onChange={e => {
          setvalue(Math.random());
          setSegmentKeys(activeIndex, { subtitle: e.target.value });
        }}
      />
      <input
        style={styles.input}
        value={illustration}
        type="url"
        placeholder="Enter URL for illustration (optional)"
        onChange={e => {
          setvalue(Math.random());
          setSegmentKeys(activeIndex, { illustration: e.target.value });
        }}
      />

      {state[activeIndex].fields.map((item, index) => {
        return fieldPreview(item, index);
      })}

      <button onClick={() => setIsDialogVisible(true)}>Add Field</button>
    </div>
  );
}
const styles = {
  input: { padding: 5, margin: 5 },
  container: {
    display: "flex",
    border: "1px solid black",
    margin: 15,
    width: "50%",
    height: "100%",
    padding: 15,
    flexDirection: "column"
  },
  field: { border: "3px solid black", padding: 15, margin: 15 }
};
export default Segment;
