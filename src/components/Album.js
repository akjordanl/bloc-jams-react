import React, { Component } from 'react';
import albumData from './../data/albums';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      isPlaying: false,
      isHovered: false,
      buttonPlayPause: 'none',
      buttonPlayPauseTarget: 0
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true});
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
      this.setState({ buttonPlayPause: 'pause'})
    }
  }

  handleMouseEnter (song, index) {
    console.log(song, index);
    if (song !== this.state.currentSong) {this.setState({ isHovered: true, buttonPlayPause: 'play', buttonPlayPauseTarget: index }) };
    if (song == this.state.currentSong && !this.state.isPlaying) {this.setState({ isHovered: true, buttonPlayPause: 'play', buttonPlayPauseTarget: index }) };
    if (song == this.state.currentSong && this.state.isPlaying) {this.setState({ isHovered: true, buttonPlayPause: 'pause', buttonPlayPauseTarget: index }) };
    console.log(this.state);
  }

    render() {
    return (
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title} />
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="releaseInfo">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody>
            {
              this.state.album.songs.map( (song, index) =>
                <tr className="song" key={index} onClick={() => this.handleSongClick(song)} onMouseEnter={() => this.handleMouseEnter(song, index)}>
                  <td>
                    <span> {index + 1} </span>
                    <span> {(this.state.isHovered && this.state.buttonPlayPause == 'play' && this.state.buttonPlayPauseTarget == index) ? <i class="icon ion-md-play"></i> : ''} </span>
                    <span> {(this.state.isHovered && this.state.buttonPlayPause == 'pause' && this.state.buttonPlayPauseTarget == index) ? <i class="icon ion-md-pause"></i> : ''} </span>
                  </td>
                  <td> { song.title} </td>
                  <td> { song.duration} </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </section>
    );
  }
}

export default Album;
