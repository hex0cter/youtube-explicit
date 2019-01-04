import React from 'react'
import styles from './index.module.css'

const Home = () => (
  <div className={styles.Home}>
    <div className={styles.Title}>What is Youtube Explicit?</div>
    <div className={styles.Background}>
      <div className={styles.ImgCrying} >
        <img src='/images/cry.jpg' alt='crying' width='176px'/>
      </div>
      <div className={styles.Paragraph}>
      <span className={styles.Youtube}><img src='/images/youtube.png' alt='youtube' height='20px' /></span>is a good tool for kids, sometimes, for entertaining, learning.
      But it also causes frustrations. You have no idea what your kids are going to watch. You don't know how much time they will spend on it.
      </div>
    </div>
    <div>
      <div className={styles.Paragraph}>
        <span className={styles.SiteName}>Youtube Explicit</span> returns the control back to you. With it you can define what you want to show, and how they are gonna be shown. All you need to do
        is to create a couple of playlists on Youtube, or just share a playlist from a friend. Then add this web site as a standalone icon onto your device's
        home screen. Now you are confident to give it to the little ones, without worrying about what they are gonna watch.
      </div>
    </div>
    <div>
      <div className={styles.StepTitle}>
        Step by step guide:
      </div>
      <div className={styles.Steps}>
        1. Visit the <a href='/admin'>admin portal</a>, where you can generate a new user identifier for yourself. Then you can add get
        some playlists Ids from youtube, and add them into your list. Please save the user identifier.
      </div>
      <div className={styles.Steps}>
        2a. If you are using an Android device, open up <strong>Google Chrome</strong>, visit <a href='https://solna.xyz'>https://solna.xyz</a>, and click on the <strong>settings</strong> icon, then choose <strong>Add to Home Screen</strong>.
      </div>
      <div className={styles.Steps}>
        2b. If you are using an iOS device, open up <strong>Safari</strong>, visit <a href='https://solna.xyz'>https://solna.xyz</a>, and click on the <strong>sharing</strong> icon, then choose <strong>Add to Home Screen</strong>.
      </div>
      <div className={styles.Steps}>
        3. From the Home Screen you will see the new icon added. Open it up, and fill in the user identifier created in the first step. Done!
      </div>
    </div>
    <div className={styles.QuickLinks}>
      Quick links: <a href='/admin'> Admin portal </a>, <a href='/play'> Play now </a>
    </div>
  </div>
)

export default Home
