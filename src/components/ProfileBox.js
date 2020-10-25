import React, { useState } from 'react'
import { Card, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { grey, cyan, lightBlue } from '@material-ui/core/colors'
import { CloudDownload } from '@material-ui/icons'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles({
    card: {
        background: 'linear-gradient(45deg, #113C70, #3D0757)',
    },
    userBox: {
        background: 'black'
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
        padding: 10
    },
    button: {
        background: cyan[800]
    },
    a: {
        textDecoration: 'none'
    }
})

function ProfileBox(props) {
    const classes = useStyles()
    const [user, setUser] = useState(props.user)



    return(
        <Card className={classes.card}>
            <Grid container>
                <Grid item xs={12} className={classes.userBox}>
                    <Typography variant="subtitle1" className={classes.userText} align="center">
                        Username: <span className={classes.username}>{user.username}</span>
                    </Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Grid container>
                        <Grid item xs={4}>
                            <Card className={classes.statsBox}>
                                <Typography variant="subtitle1" className={classes.text} align="left">
                                    Coins
                                </Typography>
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
                                        <span className={classes.userData}>{user.balance}</span>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" className={classes.text}>
                                        <span className={classes.userData}>{user.kills}</span>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" className={classes.text}>
                                        <span className={classes.userData}>{user.deaths}</span>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Button
                    endIcon={<CloudDownload />}
                    size="large"
                    color="primary"
                    variant="contained"
                    href="../game/test.txt"
                    download>    
                        Download Test
                    </Button>
                    <Button
                    className={classes.button}
                    endIcon={<CloudDownload />} 
                    size="large"
                    variant="contained"
                    href="../game/Battle_Royal_V0.1.5.zip"
                    download>    
                        Download Game
                    </Button>
                </Grid>
            </Grid>
        </Card>
    )
}

export default ProfileBox
