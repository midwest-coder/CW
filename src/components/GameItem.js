import React from 'react'
import { Typography, Grid } from '@material-ui/core'
// import { grey } from '@material-ui/core/colors'
// import { makeStyles } from '@material-ui/core/styles'

// const useStyles = makeStyles({
//     card: {
//         width: '100%',
//         background: 'black',
//         color: grey[100],
//         padding: 10
//     },
// })

function GameItem(props) {
    // const classes = useStyles()

    return (
        <Grid container>
            <Grid item xs={12} sm={4}>
                <Typography>Kills: {props.match.kills}</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
                <Typography>Date: {props.match.createdAt}</Typography>
            </Grid>
        </Grid>
    );
}

export default GameItem;
