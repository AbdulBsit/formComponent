import React, { useState, useContext, useEffect } from "react";
import AddFields from "./AddFields";
import { useActions } from "../actions";
import { store } from "../store";

function Segment({ activeIndex }) {
  const { state, dispatch } = useContext(store);
  const { editSegmentField, addSegmentField, setSegmentKeys } = useActions();

  const [editIndex, setEditIndex] = useState(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [n, setN] = useState(0);

  // TODO deepCompare
  useEffect(() => {}, [activeIndex, state, n]);

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

  let { title, subtitle, illustration } = state[activeIndex];

  if (state[activeIndex] == null) {
    return null;
  }

  return (
    <div style={styles.container}>
      <AddFields
        isDialogVisible={isDialogVisible}
        field={state[activeIndex].fields[editIndex]}
        editField={editIndex !== null}
        toggleDialog={setIsDialogVisible}
        editFieldValue={editFieldValue}
        addField={value => addSegmentField(activeIndex, value)}
        name={state[activeIndex].title}
      />

      <input
        style={styles.input}
        value={title}
        type="text"
        placeholder="Enter Section Title"
        onChange={e => {
          setN(Math.random());
          setSegmentKeys(activeIndex, { title: e.target.value });
        }}
      />
      <input
        value={subtitle}
        style={styles.input}
        type="text"
        placeholder="Enter Section Subtitle"
        onChange={e => {
          setSegmentKeys(activeIndex, { subtitle: e.target.value });
        }}
      />
      <input
        style={styles.input}
        value={illustration}
        type="url"
        placeholder="Enter URL for illustration (optional)"
        onChange={e => {
          setSegmentKeys(activeIndex, { illustration: e.target.value });
        }}
      />

      {state[activeIndex].fields.map((item, index) => {
        return (
          <div style={styles.field} key={index}>
            <p>
              <b>{item.label}</b>Required :{item.required}, Max Length :
              {item.maxLength}
            </p>
            <button onClick={() => openEditDialog(index)}>Edit</button>
          </div>
        );
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
