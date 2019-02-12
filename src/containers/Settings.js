import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Settings.css";
//Billing Stripe
import { Auth, API } from "aws-amplify";
import config from "../config";
import BillingForm from "../components/BillingForm";
import { Elements, StripeProvider } from "react-stripe-elements";

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userEmail: "",
      isLoading: false
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

  billUser(details) {
    return API.post("notes", "/billing", {
      body: details
    });
  }

  handleFormSubmit = async (storage, { token, error }) => {
    if (error) {
      alert(error);
      return;
    }
  
    this.setState({ isLoading: true });
  
    try {
      await this.billUser({
        storage,
        source: token.id
      });
  
      alert("Your card has been charged successfully!");
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
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


        <StripeProvider apiKey={config.STRIPE_KEY}>
          <Elements>
            <BillingForm
              loading={this.state.isLoading}
              onSubmit={this.handleFormSubmit}
            />
          </Elements>
        </StripeProvider>


      </div>
    );
  }
}