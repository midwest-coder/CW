import React from 'react'
import Backdrop from '@material-ui/core/Backdrop'
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    color: '#fff',
  },
}));

export default function LightLoading(props) {
  const classes = useStyles();

  return (
    <div>
      <Backdrop className={classes.backdrop} open={props.loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}