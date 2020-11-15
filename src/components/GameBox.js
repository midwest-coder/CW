import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { grey } from '@material-ui/core/colors'
import { CloudDownload } from '@material-ui/icons'
import gameScreenshot from '../images/ew-screenshot-crop.png'
import ewCover from '../images/ew-game-cover.jpg'

const useStyles = makeStyles({
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
})

function Gamebox() {
    const classes = useStyles()
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
                <Grid item xs={12} md={8}>
                    <Card className={classes.statsBox}>
                        <CardContent>
                            <Grid container>
                                <Grid item xs={12} sm={7}>
                                    <Typography variant="h6" className={classes.title} align="center">
                                        Endless War
                                    </Typography>
                                    <Typography variant="subtitle1" className={classes.text} align="center">
                                        For anyone who enjoys old school shooters, like Contra, this game is made for you.
                                        Endless War is a blend of a sandbox shooter meets io. 
                                        It will cost credits to get into the game and each kill will earn you a credit.
                                        A simple game to pick up but still brings loads of fun and potential profits.
                                        Download today and see if you have what it takes to battle in the Endless War.
                                    </Typography>
                                    <Typography align="center">
                                        <Button
                                            className={classes.button}
                                            endIcon={<CloudDownload />} 
                                            size="large"
                                            variant="contained"
                                            href="game/Battle_Royal_V0.1.5.zip"
                                            download="Battle-Royal.zip">    
                                                Download Game
                                        </Button>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={5} className={classes.center}>
                                    <Card className={classes.gamePreviewBox}>
                                        <img src={gameScreenshot} title="Game Screenshot" className={classes.gamePreview}/>
                                        <Typography variant="subtitle2" className={classes.gamePreviewText} align="center">
                                            Screenshot
                                        </Typography>
                                    </Card>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Card>
    )
}

export default Gamebox;
