import React from 'react'
import styles from './index.module.css'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const pages = [
  {
    index: 1,
    value: "admin",
    url: "/admin"
  },
  {
    index: 2,
    value: "about",
    url: "/about"
  }
]

const handleNav = (event, index) => {
  const page = pages.filter(e => e.index === index)[0]
  window.location = page.url
}

const Menu = (props) => {
  const page = pages.filter(e => e.value === props.current)[0]
  const current = page.index

  return(
  <div className={styles.Menu}>
    <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={current}
          onChange={handleNav}
          aria-label="nav tabs example"
        >
          <LinkTab label={<PlayArrowIcon fontSize="large" />} href="/" {...a11yProps(0)} />
          <LinkTab label="Admin portal" href="/admin" {...a11yProps(1)} />
          <LinkTab label="About" href="/about" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
  </div>
)}

export default Menu
