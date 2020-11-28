import React from 'react'
import { grey } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'
import LeaderboardItem from './LeaderboardItem'
import { Button, Card } from '@material-ui/core'


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
        height: 275,
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

function GameLeaderboard(props) {
    const classes = useStyles()


    let content = (props.leaderboards === null) ? '' :                    
    <Card className={classes.userList}>
        <div className={classes.hideScroll}>
            <Card className={classes.list}>
                <ul className={classes.ul}>
                    {props.leaderboards.sort((a, b) => (b.score - b.user.matches.length) - (a.score - a.user.matches.length))
                    .map((user, index) => <li className={classes.li}>
                        <Button className={classes.button}>
                            <LeaderboardItem rank={index + 1} item={user}/>
                        </Button>
                        </li>)}
                </ul>
            </Card>
        </div>
    </Card>

    return (
        <React.Fragment>
            {content}
        </React.Fragment>
    );
}

export default GameLeaderboard;
