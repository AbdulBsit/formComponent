import React from "react";
import Segment from "./Segment";
function FormMaker() {
  const [segments, setSegments] = React.useState([
    {
      title: "Section Title",
      subtitle: "Section Subtitle",
      illustration: "",
      fields: []
    }
  ]);

  const addSection = () => {
    setSegments([
      ...segments,
      {
        title: "Section Title",
        subtitle: "Section Subtitle",
        illustration: "",
        fields: []
      }
    ]);
  };

  return (
    <div
      style={{
        margin: 25,
        height: window.innerHeight - 50,
        display: "flex",
        justifyContent: "center"
      }}
    >
      {segments.map((item, index) => (
        <Segment
          setSegmentKeys={value => {
            setSegments(
              segments.map((item, i) => {
                if (index === i) {
                  return { ...item, ...value };
                } else return item;
              })
            );
          }}
          value={item}
        />
      ))}

      <div style={{ alignSelf: "center" }}>
        <button onClick={addSection}>Add Section</button>
      </div>
    </div>
  );
}
export default FormMaker;
