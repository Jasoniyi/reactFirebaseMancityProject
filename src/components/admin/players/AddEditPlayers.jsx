import React, { Component } from "react";
import AdminLayout from "../../../Hoc/adminLayout";

import Formfields from "../../ui/Formfields";
import { validate } from "../../ui/misc";

import Fileuploader from "../../ui/Fileuploader";
import { firebaseDB, firebasePlayers, firebase } from "../../../firebase";

class AddEditPlayers extends Component {
  state = {
    playerId: "",
    formType: "",
    formError: false,
    formSuccess: "",
    defaultImg: "",
    formdata: {
      name: {
        element: "input",
        value: "",
        config: {
          label: "name",
          name: "name_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: true
      },
      lastname: {
        element: "input",
        value: "",
        config: {
          label: "lastname",
          name: "lastname_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: true
      },
      number: {
        element: "input",
        value: "",
        config: {
          label: "Number",
          name: "number_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: true
      },
      position: {
        element: "select",
        value: "",
        config: {
          label: "select position",
          name: "select_position",
          type: "select",
          options: [
            { key: "keeper", value: "keeper" },
            { key: "Defender", value: "Defender" },
            { key: "Midfielder", value: "Midfielder" },
            { key: "Striker", value: "Striker" }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: true
      },
      // state fro image
      image: {
        element: "image",
        value: "",
        validation: {
          required: true
        },
        valid: false
      }
    }
  };

  onFormSubmit(event) {
    event.preventDefault();
  }
  // the updateForm func grabs an element and accesses it thru d id(element.id)
  // then adds the event.target.value
  // content = '' is a default
  // meaning content is empty for the name, lastname...
  // except for the upload image field
  updateForm(element, content = "") {
    console.log(element);
    const newFormdata = { ...this.state.formdata };
    const newElement = { ...newFormdata[element.id] };

    if (content === "") {
      newElement.value = element.event.target.value;
    } else {
      newElement.value = content;
    }

    let validData = validate(newElement);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];

    newFormdata[element.id] = newElement;

    this.setState({
      formError: false,
      formdata: newFormdata
    });
  }

  updateFields = (player, playerId, formType, defaultImg) => {
    // get a copy of this.state.formdata
    const newFormdata = { ...this.state.formdata };

    //call the formdata and change the values
    for (let key in newFormdata) {
      newFormdata[key].value = player[key];
      newFormdata[key].valid = true;
    }

    this.setState({
      playerId,
      defaultImg,
      formType,
      formdata: newFormdata
    });
  };

  componentDidMount() {
    //this checks if d route has an id
    const playerId = this.props.match.params.id;

    // if it does not have an Id
    if (!playerId) {
      // goes to add player
      this.setState({ formType: "Add player" });
    } else {
      //else goto edit player
      //firstly fetch player data wit Id
      firebaseDB
        .ref(`players/${playerId}`)
        .once("value")
        .then(snapshot => {
          // access snapshot.val to get player info and pass to playerData
          const playerData = snapshot.val();

          //to get imageURL
          firebase
            .storage()
            .ref("players")
            .child(playerData.image)
            .getDownloadURL()
            .then(url => {
              // create func to update field
              this.updateFields(playerData, playerId, "Edit player", url);
            })
            .catch(e => {
              this.updateFields(
                {
                  ...playerData,
                  image: ""
                },
                playerId,
                "Edit player",
                ""
              );
            });
        });
    }
  }

  successForm = message => {
    this.setState({
      formSuccess: message
    });
    // clear message afta 2 secs
    setTimeout(() => {
      this.setState({
        formSuccess: ""
      });
    }, 2000);
  };

  // submits the details of d form
  // by updating dataToSubmit key wit the current value key in formdata
  // and setting formIsvalid to true
  submitForm(event) {
    event.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formdata) {
      dataToSubmit[key] = this.state.formdata[key].value;
      formIsValid = this.state.formdata[key].valid && formIsValid;
    }

    if (formIsValid) {
      // we want to submit form to EDIT player
      //console.log(dataToSubmit);
      if (this.state.formType === "Edit player") {
        // access firbaseDB and enter the ref and enta players route with Id
        // then use d ID, i have in this.state.playerId
        firebaseDB
          .ref(`players/${this.state.playerId}`)
          //perform update with values in dataToSubmit
          .update(dataToSubmit)
          .then(() => {
            // then run the successForm func with d message
            this.successForm("Updated Correctly");
          })
          .catch(e => {
            this.setState({
              formError: true
            });
          });
      } else {
        //we submit form to  ADD players
        firebasePlayers
          .push(dataToSubmit)
          .then(() => {
            // afta pushing to DB, open d admin_players route
            this.props.history.push("/admin_players");
          })
          .catch(e => {
            this.setState({
              formError: true
            });
          });
      }
    } else {
      this.setState({
        formError: true
      });
    }
  }

  resetImage = () => {
    const newFormdata = { ...this.state.formdata };
    newFormdata["image"].value = "";
    newFormdata["image"].valid = false;
    this.setState({
      defaultImg: "",
      formdata: newFormdata
    });
  };

  storeFilename = filename => {
    this.updateForm({ id: "image" }, filename);
  };

  render() {
    console.log(this.state.formdata);
    return (
      <AdminLayout>
        {/* add form to layout */}
        <div className="editplayers_dialog_wrapper">
          <h2>{this.state.formType}</h2>
          <div>
            <form onSubmit={event => this.onFormSubmit(event)}>
              <Fileuploader
                dir="players"
                tag={"Player image"}
                defaultImg={this.state.defaultImg}
                defaultImgName={this.state.formdata.image.value}
                resetImage={() => this.resetImage()}
                filename={filename => this.storeFilename(filename)}
              />

              <Formfields
                id={"name"}
                formdata={this.state.formdata.name}
                change={element => this.updateForm(element)}
              />

              <Formfields
                id={"lastname"}
                formdata={this.state.formdata.lastname}
                change={element => this.updateForm(element)}
              />

              <Formfields
                id={"number"}
                formdata={this.state.formdata.number}
                change={element => this.updateForm(element)}
              />

              <Formfields
                id={"position"}
                formdata={this.state.formdata.position}
                change={element => this.updateForm(element)}
              />

              <div className="success_label">{this.state.formSuccess}</div>
              {this.state.formError ? (
                <div className="error_label">Something is wrong</div>
              ) : (
                ""
              )}
              <div className="admin_submit">
                <button onClick={event => this.submitForm(event)}>
                  {this.state.formType}
                </button>
              </div>
            </form>
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default AddEditPlayers;
