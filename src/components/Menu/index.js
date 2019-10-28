import React from 'react'
import styles from './index.module.css'

const Menu = () => (
  <div>
    <div className={styles.Menu}>
        <div><a href='/admin'> Admin Portal </a></div>
        <div><a href='/'> Play Now </a></div>
        <div><a href='/about'> About</a></div>
    </div>
    <hr className={styles.styleFive} />
  </div>
)

export default Menu
