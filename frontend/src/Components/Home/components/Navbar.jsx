import React, { Fragment } from 'react'

import PropTypes from 'prop-types'

import './navbar.css'

const Navbar = (props) => {
  return (
    <header className="navbar-container">
      <div data-thq="thq-navbar" className="navbar-navbar-interactive">
        <img
          src="/public/favicon1/favicon-32x32.png"
          alt={props.imageAlt}
          className="navbar-image"
        />
        <span>
          {props.text ?? (
            <Fragment>
              <span className="navbar-text1">
                <span className="navbar-text2">Docu</span>
                <span className="navbar-text3">Zen</span>
              </span>
            </Fragment>
          )}
        </span>
        <nav className="navbar-links">
          <span className="thq-link thq-body-small">{props.link1}</span>
          <span className="thq-link thq-body-small">{props.link2}</span>
          <span className="thq-link thq-body-small">{props.link3}</span>
          <span className="thq-link thq-body-small">{props.link4}</span>
          <span className="thq-link thq-body-small">{props.link5}</span>
        </nav>

        <div className="navbar-buttons1">
          <a href="/login"><button className="thq-button-filled">Login</button></a>
          <a href="/register"><button className="thq-button-outline">Register</button></a>
        </div>

      </div>
    </header>
  )
}

Navbar.defaultProps = {
  link1: 'Home',
  link5: 'Contact',
  link2: 'Features',
  logoSrc:
    'https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/84ec08e8-34e9-42c7-9445-d2806d156403/fac575ac-7a41-484f-b7ac-875042de11f8?org_if_sml=1&force_format=original',
  action2: 'Try for Free',
  logoAlt: 'DocuZen',
  link3: 'Pricing',
  action1: 'Get Started',
  link4: 'About',
  imageSrc: '/docuzen-removebg-preview-200h.png',
  imageAlt: 'image',
  text: undefined,
}

Navbar.propTypes = {
  link1: PropTypes.string,
  link5: PropTypes.string,
  link2: PropTypes.string,
  logoSrc: PropTypes.string,
  action2: PropTypes.string,
  logoAlt: PropTypes.string,
  link3: PropTypes.string,
  action1: PropTypes.string,
  link4: PropTypes.string,
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string,
  text: PropTypes.element,
}

export default Navbar
