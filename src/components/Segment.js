import React from "react";
import AddFields from "./AddFields";
import { useActions } from "../contextState/actions";
import { store } from "../contextState/store";

function Segment(props) {
  const { state, dispatch } = React.useContext(store);
  const { editSegmentField, addSegmentField, setSegmentKeys } = useActions();
  const [editIndex, setEditIndex] = React.useState(null);
  const [editField, setEditField] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(props.activeIndex);
  const [dialog, setDialog] = React.useState(false);
  const [title, setTitle] = React.useState(state[props.activeIndex].title);
  const [subtitle, setSubTitle] = React.useState(
    state[props.activeIndex].subtitle
  );
  const [illustration, setIllustration] = React.useState(
    state[props.activeIndex].illustration
  );
  React.useEffect(() => {
    setActiveIndex(props.activeIndex);
    setTitle(state[props.activeIndex].title);
    setSubTitle(state[props.activeIndex].subtitle);
    setIllustration(state[props.activeIndex].illustration);
  }, [props.activeIndex]);

  const toggleAddField = status => {
    setDialog(status);
  };

  const EditField = index => {
    setEditField(true);
    setEditIndex(index);
    setDialog(true);
  };
  if (state[activeIndex] !== null) {
    return (
      <div
        style={{
          display: "flex",
          border: "1px solid black",
          margin: 15,
          width: "50%",
          height: "100%",
          padding: 15,
          flexDirection: "column"
        }}
      >
        {dialog && (
          <AddFields
            field={state[activeIndex].fields[editIndex]}
            editField={editField}
            toggleDialog={toggleAddField}
            editFieldValue={value => {
              editSegmentField(activeIndex, value, editIndex);
              setEditIndex(null);
              setEditField(false);
            }}
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
            setSegmentKeys(activeIndex, { title: e.target.value });
            setTitle(e.target.value);
          }}
        />
        <input
          value={subtitle}
          style={styles.input}
          type="text"
          placeholder="Enter Section Subtitle"
          onChange={e => {
            setSegmentKeys(activeIndex, { subtitle: e.target.value });
            setSubTitle(e.target.value);
          }}
        />
        <input
          style={styles.input}
          value={illustration}
          type="url"
          placeholder="Enter URL for illustration (optional)"
          onChange={e => {
            setSegmentKeys(activeIndex, { illustration: e.target.value });
            setIllustration(e.target.value);
          }}
        />
        {state[activeIndex].fields.length !== 0 &&
          state[activeIndex].fields.map((item, index) => {
            return (
              <div
                style={{ border: "3px solid black", padding: 15, margin: 15 }}
                key={index}
              >
                <p>
                  <b>{item.label}</b>
                </p>
                <p>
                  Required :{item.required}, Max Lenght :{item.maxLength}
                </p>
                <button onClick={() => EditField(index)}>Edit</button>
              </div>
            );
          })}
        <button onClick={() => toggleAddField(true)}>Add Field</button>
      </div>
    );
  } else return null;
}
const styles = {
  input: { padding: 5, margin: 5 }
};
export default Segment;
