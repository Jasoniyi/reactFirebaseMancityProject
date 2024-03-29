import React from "react";

// formfields receives props, checks form and returns jsx
const Formfields = ({ formdata, id, change }) => {
  const showError = () => {
    let errorMessage = (
      <div className="error_label">
        {formdata.validation && !formdata.valid
          ? formdata.validationMessage
          : null}
      </div>
    );

    return errorMessage;
  };

  const renderTemplate = () => {
    let formTemplate = null;

    switch (formdata.element) {
      case "input":
        formTemplate = (
          // shows label of AddEditMatch
          <div>
            {formdata.showlabel ? (
              <div className="label_input">{formdata.config.label}</div>
            ) : null}

            <input
              {...formdata.config}
              value={formdata.value}
              onChange={event => change({ event, id })}
            />
            {showError()}
          </div>
        );
        break;

      case "select":
        formTemplate = (
          <div>
            {formdata.showlabel ? (
              <div className="label_input">{formdata.config.label}</div>
            ) : null}

            <select
              value={formdata.value}
              onChange={event => change({ event, id })}
            >
              <option value="">Select One</option>
              {formdata.config.options.map(item => (
                <option key={item.key} value={item.key}>
                  {item.value}
                </option>
              ))}
            </select>
            {showError()}
          </div>
        );
        break;

      default:
        formTemplate = null;
    }
    return formTemplate;
  };

  return <div>{renderTemplate()}</div>;
};

export default Formfields;
