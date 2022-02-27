import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    background: `${theme.palette.primary.main}`,
  },
  title: {
    color: 'white',
    textTransform: 'uppercase',
  },
}));

export default function Navbar({title = 'Chalo'}) {
  const classes = useStyles();
  return (
    <>
      <Toolbar className={classes.root}>
        <Typography className={classes.title} variant="h6">
          {title}
        </Typography>
      </Toolbar>
    </>
  );
}
