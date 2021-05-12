import React from 'react'
import { Typography, Grid } from '@material-ui/core'

function TransactionItem(props) {
    const amount = props.transaction.amount
    const type = props.transaction.type
    const status = props.transaction.status
    const hash = props.transaction.hash
    const date = new Date(props.transaction.createdAt)

    const trimmedHash = () => {
        return hash === '0' ? 'NA' : hash.slice(0,6) + "..." + hash.slice(hash.length - 4,hash.length)
    }

    const styledStatus = () => {
        switch(status){
            case 'Success':
                return <Typography align="left" color="primary">{status}</Typography>
            break;
            case 'Error':
                return <Typography align="left" color="secondary">{status}</Typography>
            break;
            default:
                return <Typography align="left">{status}</Typography>
        }
    }

    return (
        <Grid container>
            <Grid item xs={12} sm={3}>
            <Typography align="left">{type}: {amount} coins</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
            <Typography align="left">{date.toLocaleString()}</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
            <Typography align="left">{trimmedHash()}</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
            {styledStatus()}
            </Grid>
        </Grid>
    );
}

export default TransactionItem;
