import React from 'react'
import styles from './index.module.css'
import axios from 'axios'

class PlaylistConfiguration extends React.Component {
  state = {
    title: null,
    channelTitle: null,
    thumbnails: null
  }

  changeAutoPlay = (e) => {
    this.props.onUpdateAutoPlay(e.target.checked)
  }

  changeEnabled = (e) => {
    this.props.onUpdateEnabled(e.target.checked)
  }

  deletePlaylist = () => {
    this.props.onDelete()
  }

  onAddNewPlaylist = () => {
    const elmentId = document.getElementById('id-new')
    const id = elmentId.value.trim()
    if (id !== '') {
      this.props.onAdd(id)
      elmentId.value = ''
    }
  }

  componentDidMount = async() => {
    const id = this.props.id
    if (id === 'new') {
      return
    }

    let response
    try {
      response = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&key=AIzaSyBVrfMofoyGgP8KcCyHF9PSKQsayy7qNpI&maxResults=50`)
    } catch {
      return
    }
    const data = response.data
    const totalResults = data.pageInfo.totalResults
    if (totalResults === 0) {
      return
    }

    const firstItem = data.items.shift()
    const title = firstItem.snippet.title
    const channelTitle = firstItem.snippet.channelTitle
    const thumbnails = firstItem.snippet.thumbnails.high || firstItem.snippet.thumbnails.medium || firstItem.snippet.thumbnails.default
    this.setState({
      title,
      channelTitle,
      thumbnails
    })
  }

  render() {
    const id = this.props.id
    if (id === 'new') {
      return (
        <div className={styles.PlaylistConfiguration}>
          <div className={styles.PlaylistControls}>
            <div className={styles.PlaylistId}>
              <input type='text' className={styles.NewIdInput} placeholder='Youtube playlist Id' size={34} id='id-new'/>
            </div>
            <div>
              <button onClick={this.onAddNewPlaylist}>Add</button>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className={styles.PlaylistConfiguration}>
        <div className={styles.PlaylistControls}>
          <div className={styles.PlaylistId}>
            <input type="checkbox" name="disabled" checked={this.props.isEnabled} onChange={this.changeEnabled} />
            {id}
          </div>
          <div>
            <input type="checkbox" name="autoPlay" checked={this.props.shouldAutoPlay} onChange={this.changeAutoPlay} id={`auto-play-${id}`}/>Auto play
          </div>
          <div>
            <button onClick={this.props.onMoveUp}>Up</button>
            <button onClick={this.props.onMoveDown}>Down</button>
            <button onClick={this.props.onDelete}>Delete</button>
          </div>
        </div>
        <div className={styles.PlaylistPreview}>
          {this.state.thumbnails ? <div><img src={this.state.thumbnails.url}
                                          width={this.state.thumbnails.width}
                                          alt={this.state.title}
                                          className={styles.thumbnails}
                                        /> </div>: null}
          {this.state.title ? <div>{this.state.title}</div> : null}
        </div>
      </div>
    )
  }
}

export default PlaylistConfiguration
