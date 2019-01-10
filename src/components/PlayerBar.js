import React, { Component } from 'react';

class PlayerBar extends Component {
  render() {
    return (
      <section className="player-bar">
        <section id="buttons">
          <button id="previous" onClick={this.props.handlePrevClick}>
            <span><i className="icon ion-md-skip-backward"></i></span>
          </button>
          <button id="play-pause" onClick={this.props.handleSongClick}>
            <span> {this.props.isPlaying ? <i className="icon ion-md-pause"></i> : <i className="icon ion-md-play"></i>}</span>
          </button>
          <button id="next" onClick={this.props.handleNextClick}>
            <span><i className="icon ion-md-skip-forward"></i></span>
          </button>
        </section>
        <section id="time-control">
          <div></div>
          <input
            type="range"
            className="mdl-slider mdl-js-slider"
            value={(this.props.currentTime / this.props.duration) || 0}
            max="1"
            min="0"
            step="0.01"
            onChange={this.props.handleTimeChange}
          />
        <div className="current-time">Elapsed time: {this.props.formatTime(this.props.currentTime)}</div>
        <div className="total-time"> Duration: {this.props.formatTime(this.props.duration)}</div>
        </section>
        <section id="volume-control">
          <div></div>
          <input
           type="range"
           className="mdl-slider mdl-js-slider"
           value={this.props.volume || 0}
           min="0"
           max="1"
           step=".02"
           onChange={this.props.handleVolumeChange}
           />
          <div className="volume">Volume: {this.props.volume}</div>
        </section>
      </section>
    );
  }
}

export default PlayerBar;
