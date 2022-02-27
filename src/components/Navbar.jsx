import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {makeStyles} from '@material-ui/core/styles';

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
