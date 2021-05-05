import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { grey } from '@material-ui/core/colors'
import { CloudDownload, ArrowBackIosTwoTone } from '@material-ui/icons'
import gameScreenshot from '../images/ew-screenshot-crop.png'
import ewCover from '../images/ew-game-cover.jpg'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import GameStats from './GameStats'
import GameLeaderbaord from './GameLeaderboard'

const useStyles = makeStyles((theme) => ({
    tabsPanel: {
        flexGrow: 1,
        backgroundColor: 'black',
        color: grey[100],
        minHeight: 420
    },
    tabs: {
        flexGrow: 1,
        backgroundColor: 'black',
        color: grey[100],
    },
    card: {
        background: 'linear-gradient(45deg, #113C70, #3D0757)',
    },
    statsBox: {
        background:'black',
        margin: 10,
    },
    gamePreview: {
        width: 250,
        height: 250,
        padding: 10
    },
    gameCover: {
        width: 260,
        height: 260,
        padding: 10
    },
    gamePreviewBox: {
        background: 'linear-gradient(45deg, #113C70, #3D0757)',
    },
    gamePreviewText: {
        color: grey[300],
        padding: 10,
        paddingTop: 0
    },
    title: {
        color: grey[100],
        padding: 10
    },
    text: {
        color: grey[400],
        fontSize: 14,
        padding: 10
    },
    button: {
        background: 'linear-gradient(45deg, #32a883, #3290a8)',
        color: grey[100],
        marginTop: 20,
        marginBottom: 5
    },
    center: {
        display: 'flex',
        justifyContent: 'center'
    },
    a: {
        textDecoration: 'none'
    }
}))

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`nav-tabpanel-${index}`}
        aria-labelledby={`nav-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
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

function endlessWar() {
    const classes = useStyles()
    return(
        <CardContent>
            <Grid container>
                <Grid item sm={12} md={7}>
                    <Typography variant="h6" className={classes.title} align="center">
                        Endless War
                    </Typography>
                    <Typography variant="subtitle1" className={classes.text} align="center">
                        For anyone who enjoys a good old top down shooter this game is for you.
                        Endless War is a free for all where every kill earns you credits back.
                        There are streak bonuses and progressives to give people a chance 
                        at great rewards. A simple, yet challenging, game that can lead to potential profits.
                        Download today and see if you have what it takes to enter the battle.
                    </Typography>
                    <Typography align="center">
                        <Button
                            className={classes.button}
                            endIcon={<CloudDownload />} 
                            size="large"
                            variant="contained"
                            href="game/V0.1.2.zip"
                            download="Endless War">    
                                Download Game
                        </Button>
                    </Typography>
                </Grid>
                <Grid item sm={12} md={5} className={classes.center}>
                    <Card className={classes.gamePreviewBox}>
                        <img src={gameScreenshot} title="Game Screenshot" className={classes.gamePreview}/>
                        <Typography variant="subtitle2" className={classes.gamePreviewText} align="center">
                            Screenshot
                        </Typography>
                    </Card>
                </Grid>
            </Grid>
        </CardContent>
    )
}

function ProfilePage(props) {
    const classes = useStyles()
    const [value, setValue] = useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue)
    }

    const closeProfilePage = () => {
        props.setProfileOpen(false)
    }

    return(
        <Card className={classes.card}>
            <Card className={classes.statsBox}>
                <Button
                    className={classes.button}
                    startIcon={<ArrowBackIosTwoTone />}
                    onClick={closeProfilePage} 
                    size="large"
                    variant="contained"
                    ml={0.5}>    
                        Back
                </Button>
            <div className={classes.tabsPanel}>
                <AppBar position="static">
                    <Tabs
                    variant="fullWidth"
                    className={classes.tabs}
                    value={value}
                    onChange={handleChange}
                    aria-label="nav tabs example"
                    >
                    <LinkTab label="General Info" href="/general" {...a11yProps(0)} />
                    <LinkTab label="Transactions" href="/trans" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                    <TabPanel value={value} index={0}>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                    </TabPanel>
                </div>
            </Card>
        </Card>
    )
}

export default ProfilePage