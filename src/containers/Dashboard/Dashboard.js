import React, { Component } from "react";
import axios from 'axios'
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { logoutUser } from "../../store/actions/authActions";
import TestBoxes from '../../components/Layout/TestBoxes/TestBoxes'
import Spinner from '../../components/UI/Spinner/Spinner'

class Dashboard extends Component {
  state = {
    tests: null,
    loading: false
  }
  componentWillMount() {
    axios.get('/api/users/populate-tests/' + this.props.auth.user.id)
      .then(res => {
        this.setState({ tests: res.data.tests })
      })
      .catch(err => { })
  }

  onLogoutClick = e => {
    e.preventDefault();
    // console.log(this.state.tests)
    this.props.logoutUser();
  };

  render() {
    let testBoxes = <Spinner />

    const { user } = this.props.auth;

    if (this.state.tests) {
      testBoxes = (
        <TestBoxes
          data={this.state.tests}
        />
      )
    }

    return (
      <div className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <br></br>
              <b>Your email is: </b> {user.email}
              <br></br>
              <b>Your id is: </b> {user.id}
              <p className="flow-text grey-text text-darken-1">
                5Soruda.com ailesine{" "}
                <span style={{ fontFamily: "monospace" }}>hoşgeldiniz</span> 👏
              </p>
            </h4>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
            <h4>Şuana Kadar Çözdüğün Testler</h4>
            <i className="large material-icons">expand_more</i>
            {testBoxes}
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);