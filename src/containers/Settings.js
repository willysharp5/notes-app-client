import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Settings.css";
import { Auth } from "aws-amplify";

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userEmail: ""
    };
  }

  async componentDidMount() {
    try {
        const currentUser = await Auth.currentAuthenticatedUser();
        this.setState({ userEmail: currentUser.attributes.email });
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  
    this.setState({ isAuthenticating: false });
  }

  render() {
    return (
      <div className="Settings">
        
        <h3>{this.state.userEmail}</h3>

        <LinkContainer to="/settings/email">
          <LoaderButton
            block
            bsSize="large"
            text="Change Email"
          />
        </LinkContainer>
        <LinkContainer to="/settings/password">
          <LoaderButton
            block
            bsSize="large"
            text="Change Password"
          />
        </LinkContainer>
      </div>
    );
  }
}