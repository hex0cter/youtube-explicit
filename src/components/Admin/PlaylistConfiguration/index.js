import React from 'react'
import styles from './index.module.css'
import axios from 'axios'
import queryString from 'query-string'

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
    const inputText = elmentId.value.trim()

    let id
    if (inputText.indexOf('?') === -1) {
      id = inputText
    } else {
      const params = queryString.parse(queryString.extract(inputText))
      id = params.list
    }

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
      response = await axios.get(`https://api.solna.xyz/v1/playlists/${id}`)
    } catch {
      return
    }
    const data = response.data
    if (data.items.length === 0) {
      return
    }

    const items = data.items.filter(video => !!video.snippet.thumbnails)
    const firstItem = items.shift()
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
              <input type='text' className={styles.NewIdInput} placeholder='Youtube playlist URL' size={34} id='id-new'/>
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
            <button onClick={this.props.onMoveToTop}>Top</button>
            <button onClick={this.props.onMoveToBottom}>Bottom</button>
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
