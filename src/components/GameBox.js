import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { grey } from '@material-ui/core/colors'
import { CloudDownload } from '@material-ui/icons'
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
        margin: 10
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
                        Download today and see if you have what it takes to battle in the Endless War.
                    </Typography>
                    <Typography align="center">
                        <Button
                            className={classes.button}
                            endIcon={<CloudDownload />} 
                            size="large"
                            variant="contained"
                            href="game/Endless_War_V0.1.6.zip"
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

function Gamebox(props) {
    const classes = useStyles()
    const [value, setValue] = useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue)
    }

    return(
        <Card className={classes.card}>
            <Grid container>
                <Grid item xs={12} md={4}>
                    <Card className={classes.statsBox}>
                        <Typography variant="h6" className={classes.title} align="center">
                            Titles
                        </Typography>
                    </Card>
                    <Card className={classes.statsBox}>
                        <Typography align="center">
                            <img src={ewCover} title="Game Screenshot" className={classes.gameCover}/>
                        </Typography>
                    </Card>
                </Grid>
                <Grid item sm={12} md={8}>
                    <Card className={classes.statsBox}>
                    <div className={classes.tabsPanel}>
                        <AppBar position="static">
                            <Tabs
                            variant="fullWidth"
                            className={classes.tabs}
                            value={value}
                            onChange={handleChange}
                            aria-label="nav tabs example"
                            >
                            <LinkTab label="Overview" href="/drafts" {...a11yProps(0)} />
                            <LinkTab label="Stats" href="/trash" {...a11yProps(1)} />
                            <LinkTab label="Leaderboard" href="/spam" {...a11yProps(2)} />
                            </Tabs>
                        </AppBar>
                        <TabPanel value={value} index={0}>
                            {endlessWar()}
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <GameStats 
                                user={props.user}
                                totalKills={props.totalKills} 
                                totalPoints={props.totalPoints} 
                                userKills={props.userKills}  />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <GameLeaderbaord 
                                user={props.user}
                                leaderboards={props.leaderboards} 
                                matches={props.matches} 
                                totalKills={props.totalKills} 
                                totalPoints={props.totalPoints} 
                                userKills={props.userKills}  />
                        </TabPanel>
                        </div>
                    </Card>
                </Grid>
            </Grid>
        </Card>
    )
}

export default Gamebox