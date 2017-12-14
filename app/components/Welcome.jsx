import React, { Component } from 'react'
import {render} from 'react-dom'
import WelcomeVideo from './WelcomeVideo.jsx'

function Welcome(props) {
  return (
    <div id="welcome-page">
      <WelcomeVideo />
      <div className="padding-contianer">
        <div id="welcome-info">
          <div className="welcome-widget">
            <img className="welcome-image" src="/welcome-icons/concert.png" />
            <h3 className="header-text">Track Your Concerts</h3>
            <p className="caption-text">Add the concerts you've attended to your personal concert vault. Start building and tracking your live-music history.</p>
          </div>
          <div className="welcome-widget">
            <img className="welcome-image" src="/welcome-icons/setlist.png" />
            <h3 className="header-text">Add Your Setlists</h3>
            <p className="caption-text">Use our search engine to effortlessly populate your concerts with the setlists you saw live!</p>
          </div>
          <div className="welcome-widget">
            <img className="welcome-image" src="/welcome-icons/spotify.png" />
            <h3 className="header-text">Rock Out</h3>
            <p className="caption-text">Export your setlists to Spotify to automatically create a playlist inspired by the concerts you attended.</p>
          </div>
          <div className="welcome-widget">
            <img className="welcome-image" src="/welcome-icons/rockout.png" />
            <h3 className="header-text">Reminisce</h3>
            <p className="caption-text">Re-live and remember your live music experiences for the rest of your life.</p>
          </div>
        </div>
        </div>
        <div className="purple-background">
          <h1 className="join-header">Create Your Time Capsule</h1>
          <p className="join-text">Join grooveBase to start tracking</p>
          <p className="join-text">your live music experiences and re-living</p>
          <p className="join-text">the excitement any time you'd like!</p>
          <div className="center-bttn">
            <button id="join-button">Join Now</button>
          </div>
        </div>
        <div className="padding-container">
          <div id="current-jams">
            <div id="play-list">
              <h1 className="header-text play-list-header">What We're Listening To</h1>
              <iframe src="https://open.spotify.com/embed/user/1230356758/playlist/0g8qW0n1g0ymNBo2cVBnIR" width="300" height="380" frameBorder="0" allowtransparency="true"></iframe>
            </div>
            <div id="memories">
              <div id="memory-white-container">
                <h2 className="memory-header">#memories</h2>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Welcome;
