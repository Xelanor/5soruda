import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../../store/actions/authActions";

class Navbar extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    return (
      <div className="navbar-fixed">
        <nav>
          <div style={{ margin: "0 10px 0 10px" }} className="nav-wrapper">
            <Link to="/" className="brand-logo">5Soruda.com</Link>
            <a href="/" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
            <ul className="right hide-on-med-and-down">
              <li><Link to="/new-question">Soru Oluştur</Link></li>
              {!(this.props.auth.isAuthenticated)
                ?
                <>
                  <li><Link to="/login">Giriş</Link></li>
                  <li><Link to="/register">Kayıt Ol</Link></li>
                </>
                :
                <>
                  <li><Link to="/dashboard">Panel</Link></li>
                  <button
                    style={{
                      width: "auto",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      height: "50px",
                      color: "red",
                      marginTop: "-5px"
                    }}
                    onClick={this.onLogoutClick}
                    className="btn btn-large waves-effect waves-light hoverable white accent-3"
                  >
                    Logout
                  </button>
                </>
              }
              <li><Link to="/demo">Demo</Link></li>
            </ul>
          </div>
        </nav>

        <ul className="sidenav" id="mobile-demo">
          <li><Link to="/new-question">Soru Oluştur</Link></li>
          <li><Link to="/login">Giriş</Link></li>
          <li><Link to="/register">Kayıt Ol</Link></li>
          <li><Link to="/demo">Demo</Link></li>
        </ul>
      </div>

    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);