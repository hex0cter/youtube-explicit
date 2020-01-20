import React from 'react'
import styles from './index.module.css'

const Menu = (props) => {
  return(
  <div>
    <div className={styles.Menu}>
        <div><a href='/'><img src='/logo192.png' alt='logo' width='24px' /></a></div>
        <div><a href='/admin' className={props.current === 'admin' ? styles.Current : null}> Admin Portal </a></div>
        <div><a href='/'> Play Now </a></div>
        <div><a href='/about' className={props.current === 'about' ? styles.Current : null}> About</a></div>
    </div>
    <hr className={styles.styleFive} />
  </div>
)}

export default Menu
