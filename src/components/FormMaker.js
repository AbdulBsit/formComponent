import React from "react";

function FormMaker() {
  const [textLayers, setTextLayers] = React.useState([
    "product_name",
    "product_desc",
    "product_price"
  ]);
  const [segmentedField, setSegmentedField] = React.useState([]);
  const [segments, setSegments] = React.useState([]);
  const [showPreview, setShowPreview] = React.useState(false);
  const [object, setObject] = React.useState({});

  const initSegment = () => {
    setSegments([
      ...segments,
      {
        title: document.getElementById("segmentTitle").value,
        subtitle: document.getElementById("segmentSubTitle").value,
        illustration: document.getElementById("segmentIllustration").value
      }
    ]);
    document.getElementById("segmentTitle").value = "";
    document.getElementById("segmentSubTitle").value = "";
    document.getElementById("segmentIllustration").value = "";
  };
  const generateFormObject = e => {
    setSegments(
      segments.map((item, index) => {
        var segmentIndex = document.getElementById(index).id;
        var fieldIndex = textLayers.indexOf(
          document.getElementById(index).value
        );
        setSegmentedField([
          ...segmentedField,
          document.getElementById(index).value
        ]);
        if (index == segmentIndex) {
          if (item.fields !== undefined) {
            return {
              ...item,
              fields: [
                ...item.fields,
                {
                  name: document.getElementById(index).value,
                  type: document.getElementById(fieldIndex + "type").value,
                  label: document.getElementById(fieldIndex + "label").value,
                  required: document.getElementById(fieldIndex + "required")
                    .value,
                  maxLength: document.getElementById(fieldIndex + "maxLenght")
                    .value
                }
              ]
            };
          } else
            return {
              ...item,
              fields: [
                {
                  name: document.getElementById(index).value,
                  type: document.getElementById(fieldIndex + "type").value,
                  label: document.getElementById(fieldIndex + "label").value,
                  required: document.getElementById(fieldIndex + "required")
                    .value,
                  maxLength: document.getElementById(fieldIndex + "maxLenght")
                    .value
                }
              ]
            };
        } else return item;
      })
    );
  };

  const previewForm = e => {
    console.log("calling");
    e.preventDefault();
    if (segments.length === 0) {
      alert("Please add atleast 1 segment");
      return false;
    } else {
      setShowPreview(true);
      return false;
    }
  };
  return (
    <form
      onSubmit={previewForm}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {showPreview && (
        <form
          style={{
            padding: 25,
            backgroundColor: "pink",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {segments.map((item, index) => {
            return (
              <div style={{ backgroundImage: item.illustration }}>
                <h2>{item.title}</h2>
                <p>{item.subtitle}</p>
                {item.fields !== undefined &&
                  item?.fields.map((item, index) => {
                    return (
                      <div>
                        <p>{item.label}</p>
                        {item.required ? (
                          <input
                            type={
                              item.type === "custom_no_input"
                                ? "number"
                                : "text"
                            }
                            id={item.name}
                            maxLength={item.maxLength}
                            required={item.required}
                          />
                        ) : (
                          <input
                            type={
                              item.type === "custom_no_input"
                                ? "number"
                                : "text"
                            }
                            id={item.name}
                            maxLength={item.maxLength}
                          />
                        )}
                      </div>
                    );
                  })}
              </div>
            );
          })}

          <input type="submit" value="submit" />
        </form>
      )}
      <div
        style={{
          display: "flex",
          padding: 25,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {textLayers.map((item, index) => {
          return (
            <div>
              <h5 id={index + "name"}>{item}</h5>
              <br />
              <label for={index + "label"}>Enter label : </label>
              <input id={index + "label"} type="text" name="label" required />
              <br />
              <label for={index + "type"}>Choose Input Type : </label>
              <select id={index + "type"}>
                <option value="custom_no_input">Number Input</option>
                <option value="custom_text_input">Text Input</option>
              </select>
              <br />
              <label for={index + "required"}>Required : </label>
              <select id={index + "required"} required>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
              <br />
              <label for={index + "maxLenght"}>Maximum Length : </label>
              <input
                id={index + "maxLenght"}
                type="number"
                name="maxLength"
                required
              />
            </div>
          );
        })}
      </div>
      <div
        style={{
          padding: 25,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {segments.length !== 0 && (
          <div>
            {segments.map((item, index) => {
              return (
                <div>
                  <p>Segment {index + 1}</p>
                  <p>Title : {item.title}</p>
                  <p>Subtitle : {item.subtitle}</p>
                  <p>Illustration : {item.illustration}</p>
                  {item.fields !== undefined &&
                    item?.fields.map(item => <p>{item.name}</p>)}
                  {textLayers.length === segmentedField.length ? null : (
                    <div>
                      <select id={index}>
                        {textLayers.map((item, index) => {
                          if (segmentedField.includes(item)) {
                            return;
                          }
                          return (
                            <option id={index} value={item}>
                              {item}
                            </option>
                          );
                        })}
                      </select>
                      <button onClick={generateFormObject}>Add field</button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        {segmentedField.length === textLayers.length ? null : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h2>Create Segments</h2>
            <input
              type="text"
              id="segmentTitle"
              placeholder="Enter Segment title"
            />
            <input
              type="text"
              id="segmentSubTitle"
              placeholder="Enter Segment Sub title"
            />
            <input
              type="url"
              id="segmentIllustration"
              placeholder="URL for illustration"
            />

            <button onClick={initSegment}>create segment</button>
          </div>
        )}
      </div>
      <input type="submit" value="Preview Form" />
    </form>
  );
}
export default FormMaker;
