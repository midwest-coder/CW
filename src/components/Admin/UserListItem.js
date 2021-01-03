import React from 'react'
import { Typography, Grid } from '@material-ui/core'

function UserListItem(props) {
    const user = props.user
    const matches = props.user.matches

    // const getKills = () => {
        // alert(matches[0].kills)
        // return matches.reduce((kills, match) => kills + parseInt(match.kills), 0)
        
    // }

  const getKills = () => {
    let k = 0
    // let p = 0
    props.user.matches.forEach((matchID) => {
        const match = props.matches.find((e) => e._id === matchID)
        k += parseInt(match.kills)
        // p += parseInt(match.points)
    })
    // alert(kills)
    return k
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
                <Typography>Variance: {(matches.length > 0) ? (getKills() / matches.length).toFixed(3) : 0}</Typography>
            </Grid>
        </Grid>
    );
}

export default UserListItem;
