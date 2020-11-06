import { Card, Grid, Typography } from '@material-ui/core';
import React , { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { grey, cyan, lightBlue } from '@material-ui/core/colors'
import { CloudDownload } from '@material-ui/icons'

const useStyles = makeStyles({
    card: {
        marginTop: 20,
        background: 'linear-gradient(45deg, #113C70, #3D0757)',
    },
    statsBox: {
        background:'black',
        margin: 10
    },
    username: {
        color: grey[100],
        padding: 15
    },
    userData: {
        color: grey[100],
    },
    text: {
        color: cyan[800],
        padding: 10
    },
    userText: {
        color: lightBlue[900],
        marginLeft: 10,
        marginRight: 10,
    },
    button: {
        background: 'linear-gradient(45deg, #32a883, #3290a8)',
        color: grey[100]
    },
    a: {
        textDecoration: 'none'
    }
})

function Gamebox() {
    const classes = useStyles()
    const { user } = useContext(AuthContext)
    return(
        <Card className={classes.card}>
            <Grid container>
                <Grid item xs={12} md={3}>
                    <Grid container>
                        <Grid item xs={4}>
                            <Card className={classes.statsBox}>
                                <Typography variant="subtitle1" className={classes.text} align="left">
                                    Kills
                                </Typography>
                                <Typography variant="subtitle1" className={classes.text} align="left">
                                    Deaths
                                </Typography>
                            </Card>
                        </Grid>
                        <Grid item xs={8}>
                            <Card className={classes.statsBox}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" className={classes.text}>
                                        {/* <span className={classes.userData}>{user.balance}</span> */}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" className={classes.text}>
                                        {/* <span className={classes.userData}>{user.balance}</span> */}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card className={classes.statsBox}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" className={classes.text}>
                                It works
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" className={classes.text}>
                            It works
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                    <Button
                    className={classes.button}
                    endIcon={<CloudDownload />} 
                    size="large"
                    variant="contained"
                    href="game/Battle_Royal_V0.1.5.zip"
                    download="Battle-Royal.zip">    
                        Download Game
                    </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    )
}

export default Gamebox;
