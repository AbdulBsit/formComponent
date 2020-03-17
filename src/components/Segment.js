import React, { useEffect } from "react";
import AddFields from "./AddFields";
function Segment(props) {
  const [editIndex, setEditIndex] = React.useState(null);
  const [editField, setEditField] = React.useState(false);
  const [segment, setSegment] = React.useState(null);
  const [dialog, setDialog] = React.useState(false);
  useEffect(() => {
    setSegment(props?.value);

    return function() {
      console.log("unmounting");
    };
  }, [props.value]);

  const toggleAddField = state => {
    setDialog(state);
  };

  const setSegmentKeys = value => {
    props.setSegmentKeys(value);
  };
  const EditField = index => {
    setEditField(true);
    setEditIndex(index);
    setDialog(true);
  };
  if (segment !== null) {
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
            field={segment.fields[editIndex]}
            editField={editField}
            toggleDialog={toggleAddField}
            editFieldValue={value => {
              setSegmentKeys({
                fields: segment.fields.map((item, index) => {
                  if (index === editIndex) {
                    return value;
                  } else return item;
                })
              });
              setEditIndex(null);
              setEditField(false);
            }}
            addField={value =>
              setSegmentKeys({ fields: [...segment.fields, value] })
            }
            name={segment.title}
          />
        )}

        <input
          style={styles.input}
          // onFocus={()=>}
          type="text"
          placeholder={segment.title}
          onChange={e => setSegmentKeys({ title: e.target.value })}
        />
        <input
          style={styles.input}
          type="text"
          placeholder={segment.subtitle}
          onChange={e => setSegmentKeys({ subtitle: e.target.value })}
        />
        <input
          style={styles.input}
          type="url"
          placeholder="Enter URL for illustration (optional)"
          onChange={e => setSegmentKeys({ illustration: e.target.value })}
        />
        {segment.fields.length !== 0 &&
          segment.fields.map((item, index) => {
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
