import React from 'react'
import styles from './index.module.css'

class PlaylistConfiguration extends React.Component {
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

  render() {
    const id = this.props.id
    if (id === 'new') {
      return (
        <div className={styles.PlaylistConfiguration}>
          <div className={styles.PlaylistId}>
            <input type='text' className={styles.NewIdInput} size={34} id='id-new'/>
          </div>
          <div>
            <button onClick={this.onAddNewPlaylist}>Add</button>
          </div>
        </div>
      )
    }

    return (
      <div className={styles.PlaylistConfiguration}>
        <div className={styles.PlaylistId}>
          <input type="checkbox" name="disabled" checked={this.props.isEnabled} onChange={this.changeEnabled} />
          {id}
        </div>
        <div>
          <input type="checkbox" name="autoPlay" checked={this.props.shouldAutoPlay} onChange={this.changeAutoPlay} id={`auto-play-${id}`}/>Auto play
        </div>
        <div>
          <button onClick={this.deletePlaylist}>Delete</button>
        </div>
      </div>
    )
  }
}

export default PlaylistConfiguration
