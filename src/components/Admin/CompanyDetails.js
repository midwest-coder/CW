import React, { useState } from 'react'
import { Button, Card, Typography, Grid, TextField } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'
import GameItem from '../GameItem'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import LineChart from '../LineChart'

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
        background: 'linear-gradient(45deg, #113C70, #3D0757)',
        overflowY: 'scroll',
        height: 250
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

function CompanyDetails(props) {
    const classes = useStyles()
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [selectedDate2, setSelectedDate2] = useState(new Date())

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };

    const handleDateChange2 = (date) => {
      setSelectedDate2(date);

    };

    const getMatchList = () => {
        const m = props.matches.filter((match) => Date.parse(match.createdAt) >= selectedDate && Date.parse(match.createdAt) <= selectedDate2)
        .map((match) => {
            return(
            <li className={classes.li}>
            <Button className={classes.button}>
                <GameItem match={match}/>
            </Button>
            </li>
            )
        })
        return m
    }
    
    const getVarianceList = () => {
        const m = props.matches.filter((match) => Date.parse(match.createdAt) >= selectedDate && Date.parse(match.createdAt) <= selectedDate2)
        .map((match) => match.kills)
        return m
    }

    const getKillCount = () => {
        let m = 0
        props.matches.filter((match) => Date.parse(match.createdAt) >= selectedDate && Date.parse(match.createdAt) <= selectedDate2)
        .map((match) => m += match.kills)
        return m
    }

    const getMatchCount = () => {
        let m = 0
        props.matches.filter((match) => Date.parse(match.createdAt) >= selectedDate && Date.parse(match.createdAt) <= selectedDate2)
        .map((match) => m++)
        return m
    }

    const getUserCount = () => {
        let m = 0
        props.users.filter((user) => Date.parse(user.createdAt) >= selectedDate && Date.parse(user.createdAt) <= selectedDate2)
        .map(() => m++)
        return m
    }

    const getVariance = () => {
        return (isNumeric(getKillCount() / getMatchCount())) ? (getKillCount() / getMatchCount()).toFixed(3) : 0
    }
    
    const isNumeric = (n) => {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }

    return (
        <Card className={classes.card}>
            
            <Grid container spacing={4}>
                <Grid item sm={12} md={6}>
                    <Grid container>
                        <Grid item>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                {/* <Grid container justify="space-around"> */}
                                <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Date picker dialog"
                                format="yyyy-MM-dd"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                    className: classes.textField
                                }}
                                />
                            {/* </Grid> */}
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                {/* <Grid container justify="space-around"> */}
                                <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Date picker dialog"
                                format="yyyy-MM-dd"
                                value={selectedDate2}
                                onChange={handleDateChange2}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                    className: classes.textField
                                }}
                                />
                            {/* </Grid> */}
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} sm={4}>
                            <Typography>users: {getUserCount()}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography>matches: {getMatchCount()}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography>Variance: {getVariance()}</Typography>
                        </Grid>
                    </Grid>
                    
                    <Card className={classes.userList}>
                        <div className={classes.hideScroll}>
                            <Card className={classes.list}>
                                <ul className={classes.ul}>
                                    {getMatchList()}
                                </ul>
                            </Card>
                        </div>
                    </Card>
                </Grid>
                <Grid item sm={12} md={6}>
                    <Card className={classes.userList}>
                        <LineChart data={getVarianceList()} height={400} width={400} />
                    </Card>
                </Grid>
            </Grid>
        </Card>
    );
}

export default CompanyDetails