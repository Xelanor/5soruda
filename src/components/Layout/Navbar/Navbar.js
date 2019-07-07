import React, { Component } from "react";
import { Link } from "react-router-dom";
class Navbar extends Component {

  render() {
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo">5Soruda.com</Link>
            <a href="/" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
            <ul className="right hide-on-med-and-down">
              <li><Link to="/new-question">Soru Oluştur</Link></li>
              <li><Link to="/login">Giriş</Link></li>
              <li><Link to="/register">Kayıt Ol</Link></li>
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
export default Navbar;