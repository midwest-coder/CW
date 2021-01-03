import React, { useContext } from 'react'
import { Typography, Grid } from '@material-ui/core'
import LineChart from './LineChart'
import { purple } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    purple: {
        color: purple[200],
    },
})


function GameStats(props) {
    const classes = useStyles()

    let content = (props.user === undefined || props.user.username === '' || props.totalKills === undefined) ? '' :
    <Grid container>
        <Grid item xs={12} sm={4}>
            <Typography>Matches: { props.user.matches.length}</Typography>
            <Typography>Kills: {props.totalKills}</Typography>
            <Typography>KDA: {(props.totalKills / props.user.matches.length).toFixed(3)}</Typography>
            <Typography>Profits: <span className={classes.purple}>{props.totalPoints} 
            {(props.totalPoints != 1) ? ' Credits' : ' Credit'} </span></Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
            <LineChart data={props.userKills} height={300} width={350} />
        </Grid>
    </Grid>

    return (
        <React.Fragment>
            {content}
        </React.Fragment>
    );
}

export default GameStats;
