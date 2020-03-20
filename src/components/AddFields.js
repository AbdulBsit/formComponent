import React, { useEffect } from "react";
import { store } from "../contextState/store";
export default function AddFields(props) {
  //const { state, dispatch } = React.useContext(store);
  const [type, setType] = React.useState(props?.field?.type ?? null);
  const [name, setName] = React.useState(props?.field?.name ?? null);
  const [required, setRequired] = React.useState(
    props?.field?.required ?? "true"
  );
  const [label, setLabel] = React.useState(props?.field?.label ?? "");
  const [maxLength, setMaxLength] = React.useState(
    props?.field?.maxLength ?? null
  );
  const [textLayers, setTextLayers] = React.useState([]);
  const [imageLayers, setImageLayers] = React.useState([]);
  const [dateLayers, setDateLayers] = React.useState([]);
  const [musicLayers, setMusicLayers] = React.useState([]);
  const [pickerLayers, setPickerLayer] = React.useState([]);
  const [inputTypes, setInputTypes] = React.useState([
    { label: "Text", value: "custom_text_input" },
    { label: "Picker", value: "custom_picker" },
    { label: "Image", value: "custom_image_picker" }
  ]);

  React.useEffect(() => {
    // here all layers are fetched and sets

    setTextLayers(["bride_name", "grrom_name"]);
    setImageLayers(["asset:couple.png"]);
    setDateLayers(["wedding_date"]);
    setMusicLayers(["asset:music.mp3”"]);
    setPickerLayer(["primary_event_title"]);
  }, []);

  const toggleDialog = state => {
    props.toggleDialog(state);
  };

  const handleFieldSubmit = () => {
    props.editField
      ? props.editFieldValue({ type, label, required, maxLength, name })
      : props.addField({ type, label, required, maxLength, name });
    toggleDialog(false);
  };

  const renderTextInputCreator = () => (
    <div>
      <label for="label">Label : </label>
      <input
        value={label}
        type="text"
        onChange={e => setLabel(e.target.value)}
      />
      <br />
      <label for="required">Required : </label>
      <select
        value={required}
        id="required"
        onChange={e => {
          setRequired(e.target.value);
        }}
      >
        <option value={true}>Yes</option>
        <option value={false}>No</option>
      </select>
      <br />
      <label for="maxLength">Max length : </label>
      <input
        value={maxLength}
        type="number"
        onChange={e => setMaxLength(e.target.value)}
      />
      <br />
    </div>
  );
  const renderPickerCreator = () => <div>This is Picker Creator</div>;
  const renderImageCreator = () => <div>This is Image Creator</div>;

  return (
    <dialog open>
      <p>Add Field to {props.name} </p>
      <label for="type">Input Type : </label>
      <select
        id="type"
        onChange={e => {
          setType(e.target.value);
        }}
      >
        <option value="" disabled selected>
          Select Input Type
        </option>
        {inputTypes.map((item, index) => {
          return (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          );
        })}
      </select>

      <div>
        <label for="fields">Select Field : </label>
        <select
          id="fields"
          onChange={e => {
            setName(e.target.value);
          }}
        >
          {" "}
          <option value="" disabled selected>
            Select Field
          </option>
          {type === "custom_text_input"
            ? textLayers.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })
            : type === "custom_image_picker"
            ? imageLayers.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })
            : type === "custom_picker"
            ? pickerLayers.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })
            : null}
        </select>
      </div>
      {type === "custom_text_input"
        ? renderTextInputCreator()
        : type === "custom_picker"
        ? renderPickerCreator()
        : type === "custom_image_picker"
        ? renderImageCreator()
        : null}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          margin: 5,
          padding: 10
        }}
      >
        <button style={{ margin: 8 }} onClick={handleFieldSubmit}>
          {props.editField ? "Edit" : "Add Field"}
        </button>
        <button style={{ margin: 8 }} onClick={() => toggleDialog(false)}>
          Close
        </button>
      </div>
    </dialog>
  );
}
