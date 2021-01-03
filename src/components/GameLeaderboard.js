import React, { useState, useEffect, useContext } from 'react'
import { grey } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'
import LeaderboardItem from './LeaderboardItem'
import { Button, Card, Typography } from '@material-ui/core'
import EmojiEvents from '@material-ui/icons/EmojiEvents'
import { AuthContext } from '../context/AuthContext'


const useStyles = makeStyles({
    button: {
        width: '100%',
        background: 'black',
        color: grey[100],
        padding: 10
    },
    hideScroll: {
        height: '100%',
        width: '100%',
        overflow: 'hidden',
    },
    userList: {
        background: grey[900],
        color: grey[100],
        padding: 15,
        marginTop: 5,
        marginBottom: 5,
    },
    list: {
        background: 'linear-gradient(45deg, #113C70, #3D0757)',
        height: '100%',
        width: 'calc(100% + 18px)',
        overflow: 'auto',
        height: 225,
    },
    ul: {
        listStyle: 'none',
        paddingLeft: 4,
        paddingRight: 4
    },
    li: {
        marginBottom: 4,
        marginTop: 4
    },
    grey: {
        color: grey[100],
    }
})

function GameLeaderboard(props) {
    const classes = useStyles()
    const [userRank, setUserRank] = useState(0)
    const [leaderList, setLeaderList] = useState(null)

    useEffect(() => {
        setList();
    }, [])
    
    const setList = () => {
        let tempRank = 0
        const list = props.leaderboards.sort((a, b) => (b.score - b.user.matches.length) - (a.score - a.user.matches.length))
        .map((item, index) => {
            // console.log(props.user.username)
            // console.log(item.user.username)
            if(props.user.username === item.user.username)
                tempRank = index + 1
            
            return(
            <li className={classes.li}>
            <Button className={classes.button}>
                <LeaderboardItem rank={index + 1} item={item}/>
            </Button>
            </li>)
            })
            setUserRank(tempRank)
            setLeaderList(list)
    }

    let content = (props.leaderboards === null) ? '' :       
    
    <React.Fragment>             
        <Card className={classes.userList}>
            <div className={classes.hideScroll}>
                <Card className={classes.list}>
                    <ul className={classes.ul}>
                        {leaderList}
                    </ul>
                </Card>
            </div>
        </Card>
        <Card className={classes.userList}>
            <Typography className={classes.grey}><EmojiEvents/> Rank {userRank}</Typography>
        </Card>
    </React.Fragment>

    return (
        <React.Fragment>
            {content}
        </React.Fragment>
    );
}

export default GameLeaderboard;
