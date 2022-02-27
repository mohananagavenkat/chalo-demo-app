import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
    marginBottom: '10px'
  },
  buttonRight: {
    margin: '4px'
  },
  special: {
    whiteSpace: 'pre-line'
  }
});



export default function RoutesTable({ routes: rows, editRoute, deleteRoute, viewRoute }) {
  const classes = useStyles();
  const download = () => {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(rows));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "routes.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
  return (
    <>
      <TableContainer className={classes.table} component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Up/Down</TableCell>
              <TableCell>Stops</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.routeName}>
                <TableCell >{row.id.slice(1, 7)}</TableCell>
                <TableCell>{row.routeName}</TableCell>
                <TableCell>{row.direction}</TableCell>
                <TableCell className={classes.special}>{row.stops.map(s => s.name).join('\n')}</TableCell>
                <TableCell>{row.active ? 'Active' : 'In-Active'}</TableCell>
                <TableCell>
                  <Button className={classes.buttonRight} onClick={() => viewRoute(row.id)} variant="contained" color="primary">
                    View On Map
                  </Button>
                  <Button className={classes.buttonRight} onClick={() => editRoute(row.id)} variant="contained" color="primary">
                    Edit
                  </Button>
                  <Button className={classes.buttonRight} onClick={() => deleteRoute(row.id)} variant="contained" color="primary">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={download} variant="contained" color="primary">
        Download Routes
      </Button>
    </>
  )
}