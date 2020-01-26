import React from 'react'
import styles from './index.module.css'
import Menu from '../Menu'

const About = () => (
  <div className={styles.About}>
    <Menu current='about' />
    <div className={styles.Content}>
      <div className={styles.Image}>
        <img src='/images/kids-with-tablet.jpg' alt='kids with tablet'className={styles.ImgKidsWithTablet} />
      </div>
      <div className={styles.Title}>Why?</div>
      <div className={styles.Paragraph}>
      <span className={styles.Youtube}><img src='/images/youtube.png' alt='youtube' height='20px' /></span>is a good tool for kids, sometimes, for entertaining, learning.
      But it also causes frustrations. You have no idea what your kids are going to watch. You don't know how much time they will spend on it.
      </div>
      <div className={styles.Paragraph}>
        <span className={styles.SiteName}>Youtube Explicit</span> returns the control back to you. With it you can define what you want to show, and how they are gonna be shown. All you need to do
        is to create a couple of playlists on Youtube, or just share a playlist from a friend. Then add this web site as a standalone icon onto your device's
        home screen. Now you are confident to give it to the little ones, without worrying about what they are gonna watch.
      </div>
    </div>
    <div className={styles.Break}></div>
    <div className={styles.Content}>
      <div className={styles.StepTitle}>
        Step by step guide:
      </div>
      <div className={styles.Steps}>
        1. Visit the <a href='/admin'><span className={styles.AdminPortalLink}>Admin Portal</span></a>, where you can generate a new user identifier for yourself. Then you can add get
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
    <div className={styles.Break}></div>
    <div className={styles.Content}>
      <div className={styles.StepTitle}>
        TV mode shortcuts:
      </div>
      <div>
      When the main page is displayed on a display that is wider than 1280 pixels, it will show in TV mode. In this mode you can use the TV remote to control the videos (configuration needed)
      </div>
      <div className={styles.Steps}>
      &rarr; Select video on the right
      </div>
      <div className={styles.Steps}>
      &larr; Select video on the left
      </div>
      <div className={styles.Steps}>
      &darr; Select next playlist
      </div>
      <div className={styles.Steps}>
      &uarr; Select previous playlist
      </div>
      <div className={styles.Steps}>
      <span className={styles.KeyName}>Enter</span> Play selected video
      </div>
      <div className={styles.Steps}>
      <span className={styles.KeyName}>Space</span> Pause/Resume the playback
      </div>
      <div className={styles.Steps}>
      <span className={styles.KeyName}>Escape</span> Return to the playlists
      </div>
    </div>
    <div className={styles.Footer}>
      Daniel Han. 2020.
    </div>
  </div>
)

export default About
