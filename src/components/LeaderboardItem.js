import React from 'react'
import { Typography, Grid } from '@material-ui/core'

function LeaderboardItem(props) {
    const user = props.item.user
    const score = props.item.score
    const rank = props.rank

    return (
        <Grid container>
            <Grid item xs={12} sm={6}>
            <Typography align="left">{rank}: {user.username}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography  align="right">{score - user.matches.length}</Typography>
            </Grid>
        </Grid>
    );
}

export default LeaderboardItem;
