import React from 'react'
import { Typography, Grid } from '@material-ui/core'

function UserListItem(props) {
    const user = props.user
    const matches = props.user.matches

    const getKills = () => {
        // alert(matches[0].kills)
        return matches.reduce((kills, match) => kills + parseInt(match.kills), 0)
        
    }

    // const setUser = () => {
    //     props.setUser(props.user)
    // }

    return (
        <Grid container>
            <Grid item xs={12} sm={3}>
                <Typography>{user.username}</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
                <Typography>Matches: {matches.length}</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
                <Typography>Kills: {getKills()}</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
                <Typography>Variance: {(getKills() / matches.length).toFixed(3)}</Typography>
            </Grid>
        </Grid>
    );
}

export default UserListItem;
