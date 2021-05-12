import React, { useState, useEffect } from 'react'
import { grey, cyan } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'
import TransactionItem from './TransactionItem'
import { Button, Card, Typography, Grid } from '@material-ui/core'
import Auth from '../services/Auth'


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
    },
    cyan: {
        color: cyan[100],
    }
})

function TransactionHistory() {
    const classes = useStyles()
    const [transactionList, setTransactionList] = useState(null)

    useEffect(() => {
        Auth.getTransactions().then((data) =>{
            const { transactions } = data
            setList(transactions);
        })
    }, [])
    
    const setList = (transactions) => {
        const list = transactions.filter((transaction) => transaction.status === 'Success' || transaction.status === 'Error').reverse().map((transaction) => {
            return(
            <li className={classes.li}>
            <Button className={classes.button}>
                <TransactionItem transaction={transaction}/>
            </Button>
            </li>)
            })
            setTransactionList(list)
    }

    let content = (transactionList === null) ? '' :       
    
    <React.Fragment>             
        <Card className={classes.userList}>
            <Grid container>
                <Grid item xs={12} sm={3}>
                <Typography align="left">Info</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                <Typography align="left">Date</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                <Typography align="left">Transaction Hash</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                <Typography align="left">Status</Typography>
                </Grid>
            </Grid>
            <div className={classes.hideScroll}>
                <Card className={classes.list}>
                    <ul className={classes.ul}>
                        {transactionList}
                    </ul>
                </Card>
            </div>
        </Card>
    </React.Fragment>

    return (
        <React.Fragment>
            {content}
        </React.Fragment>
    );
}

export default TransactionHistory;
