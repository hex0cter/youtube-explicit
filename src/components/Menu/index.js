import React from 'react'
import styles from './index.module.css'

const Menu = (props) => {
  return(
  <div>
    <div className={styles.Menu}>
        <div className={styles.Default} onClick={() => window.location = '/'}><img src='/logo192.png' alt='logo' width='24px' />Play Now</div>
        <div className={props.current === 'admin' ? styles.Current : styles.Default} onClick={() => window.location = '/admin'}>Admin Portal</div>
        <div className={props.current === 'about' ? styles.Current : styles.Default} onClick={() => window.location = '/about'}>About</div>
    </div>
    <hr className={styles.styleFive} />
  </div>
)}

export default Menu
