import React from "react";

function FormMaker() {
  const [textLayers, setTextLayers] = React.useState([
    "product_name",
    "product_desc",
    "product_price"
  ]);
  const [showPreview, setShowPreview] = React.useState(false);
  const [object, setObject] = React.useState({});
  const generateJSON = e => {
    e.preventDefault();
    var obj = { fields: [] };
    textLayers.map((item, index) => {
      obj.fields.push({
        name: item,
        type: document.getElementById(index + "type").value,
        label: document.getElementById(index + "label").value,
        required: document.getElementById(index + "required").value,
        maxLength: document.getElementById(index + "maxLenght").value
      });
    });
    setObject(obj);
    setShowPreview(true);
    return false;
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
        onSubmit={generateJSON}
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
        <input type="submit" value="Preview Form" />
      </form>
      {showPreview && (
        <div
          style={{
            padding: 25,
            backgroundColor: "pink",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {object.fields.map((item, index) => {
            return (
              <div>
                <h4>{item.label}</h4>
                <input
                  type={item.type === "custom_no_input" ? "number" : "text"}
                  id={item.name}
                  maxLength={item.maxLength}
                  required={item.required}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default FormMaker;
