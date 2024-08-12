import React from 'react'

import PropTypes from 'prop-types'

import './cta.css'
import { Link } from 'react-router-dom'

const CTA = (props) => {
  return (
    <div className="thq-section-padding">
      <div className="thq-section-max-width">
        <div className="cta-accent2-bg">
          <div className="cta-accent1-bg">
            <div className="cta-container1">
              <div className="cta-content">
                <span className="thq-heading-2">{props.heading1}</span>
                <p className="thq-body-large">{props.content1}</p>
              </div>
              <div className="cta-actions">
                <Link to='/register'>
                  <button type="button" className="thq-button-filled cta-button">
                    {props.action1}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

CTA.defaultProps = {
  heading1: 'Ready to Revolutionize Your API Documentation?',
  content1: 'Sign up now and experience the power of DocuZen!',
  action1: 'Get Started',
}

CTA.propTypes = {
  heading1: PropTypes.string,
  content1: PropTypes.string,
  action1: PropTypes.string,
}

export default CTA
