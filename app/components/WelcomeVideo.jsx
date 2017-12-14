import React, { Component } from 'react'
import {render} from 'react-dom'

function WelcomeVideo(props) {
  return (
    <div id="welcome-video-container">
      <div id="videoBlock">
        <video width="100%" autoPlay loop preload="true" muted>
          <source src="/videos/welcome-video.mp4" type="video/mp4"/>
        </video>
        <div id="video-logo">
          <h1 id="video-logo-text">grooveBase</h1>
          <p id="video-logo-caption">Your personal live music experience tracker.</p>
          <div id="social-icons">
            <img className="social-icon-image" src="/social-icons/facebook.png"/>
            <img className="social-icon-image" src="/social-icons/twitter.png"/>
            <img className="social-icon-image" src="/social-icons/instagram.png"/>
            <img className="social-icon-image" src="/social-icons/snapchat.png"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeVideo
