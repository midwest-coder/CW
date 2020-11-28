import React, { useState } from 'react'
import { Button, Card, Typography, Grid, TextField } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'
import UserListItem from './UserListItem'
import GameItem from '../GameItem'

const useStyles = makeStyles({
    card: {
        background: 'black',
        color: grey[100],
        marginTop: 5,
        marginBottom: 5,
        padding: 15
    },
    hideScroll: {
        height: '100%',
        width: '100%',
        overflow: 'hidden',
    },
    button: {
        width: '100%',
        background: 'black',
        color: grey[100],
        padding: 10
    },
    purpleButton: {
        background: 'linear-gradient(45deg, #113C70, #3D0757)',
        color: grey[100],
    },
    userList: {
        background: grey[900],
        color: grey[100],
        marginTop: 5,
        marginBottom: 5,
        padding: 15,
    },
    gameList: {
        background: 'linear-gradient(45deg, #32a883, #3290a8)',
        height: '100%',
        width: 'calc(100% + 18px)',
        overflow: 'auto',
        height: 286
    },
    list: {
        background: 'linear-gradient(45deg, #113C70, #3D0757)',
        height: '100%',
        width: 'calc(100% + 18px)',
        overflow: 'auto',
        height: 300
    },
    textField: {
        color: grey[100],
    },
    ul: {
        listStyle: 'none',
        paddingLeft: 4,
        paddingRight: 4
    },
    li: {
        marginBottom: 4,
        marginTop: 4
    }
})

function UserDetails(props) {
    const classes = useStyles()
    const [searchResult, setSearchResult] = useState('')
    const [focusedUser, setFocusedUser] = useState({})
    // const setUser = (value) => {
    //     // alert(value)
    //     setFocusedUser(value)
    // }

    const search = (value) => {
        setFocusedUser(props.users.find((e) => e.username === value.toLowerCase()))
        setSearchResult(value.toLowerCase())
    }

    return (
        <Card className={classes.card}>
            <Grid container spacing={4}>
                <Grid item sm={12} md={6}>
                <TextField 
                    id="user-lookup" 
                    label="Username"
                    placeholder="Type in user"
                    type="text"
                    onInput={(e) => search(e.target.value)}
                    autoComplete="off"
                    InputProps={{
                        className: classes.textField
                    }}
                    fullWidth
                    />
                    <Card className={classes.userList}>
                        <div className={classes.hideScroll}>
                            <Card className={classes.list}>
                                <ul className={classes.ul}>
                                    {props.users.filter((user) => user.username.startsWith(searchResult.toLowerCase()))
                                    .map((user) => <li className={classes.li}>
                                        <Button className={classes.button}>
                                        <UserListItem user={user}/>
                                        </Button>
                                        </li>)}
                                </ul>
                            </Card>
                        </div>
                    </Card>
                </Grid>
                <Grid item sm={12} md={6}>
                    <Card className={classes.userList}>
                        <Grid container>
                            <Grid item xs={12} sm={4}>
                                <Typography variant="subtitle2">{(focusedUser === undefined) ? '' : focusedUser.username}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography variant="subtitle2">{(focusedUser === undefined) ? '' : focusedUser.email}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography variant="subtitle2">{(focusedUser === undefined) ? '' : focusedUser.balance}</Typography>
                            </Grid>
                        </Grid>
                        <Card className={classes.userList}>
                            <div className={classes.hideScroll}>
                                <Card className={classes.gameList}>
                                    <ul className={classes.ul}>
                                        {(focusedUser == undefined) ? '' : (focusedUser.matches == undefined) ? '' : 
                                            focusedUser.matches.map((matchID) => {
                                                return <li className={classes.li}>
                                            <Button className={classes.button}>
                                                <GameItem match={props.matches.find((e) => e._id === matchID)}/>
                                            </Button>
                                            </li>})
                                        }
                                    </ul>
                                </Card>
                            </div>
                        </Card>
                    </Card>
                </Grid>
            </Grid>
        </Card>
    );
}

export default UserDetails;