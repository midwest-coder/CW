import React from 'react'
import { Card, Typography, Grid } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    card: {
        background: 'linear-gradient(45deg, #113C70, #3D0757)',
        color: grey[100],
        marginTop: 5,
        marginBottom: 5,
        padding: 15
    },
})

function TopStats(props) {
    const classes = useStyles()

    return (
        <Card className={classes.card}>
            <Grid container>
                <Grid item xs={12} sm={3}>
                    <Typography align="center">Users: {props.userLength}</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Typography align="center">Matches: {props.userMatches}</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Typography align="center">Variance: {(props.userKills / props.userMatches).toFixed(3)}</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Typography align="center">Profits: {((props.userMatches * 3) - props.points) / 10}</Typography>
                </Grid>
            </Grid>
        </Card>
    );
}

export default TopStats;
