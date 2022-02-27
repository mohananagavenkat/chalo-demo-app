import React, {useContext, useEffect, useRef, useState} from 'react';
import {RoutesContext} from '../context/RoutesContext';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@mui/material/Typography';
import Button from '@material-ui/core/Button';
import {useNavigate} from 'react-router-dom';
import RoutesTable from './RoutesTable';
import Box from '@material-ui/core/Box';
import stops from '../data/stops.json';
import {v4 as uuidv4} from 'uuid';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '1rem 0',
  },
  dataWrapper: {
    padding: '1rem',
  },
  tableWrapper: {
    flex: 1,
  },
  map: {
    width: '50%',
    minHeight: 'calc(100vh - 100px)',
  },
}));

export default function RoutesList() {
  const classes = useStyles();
  const {routes, setRoutes} = useContext(RoutesContext);
  const [selectedRoutes, setSelectedRoutes] = useState([]);
  const navigate = useNavigate();
  const MapmyIndia = window.MapmyIndia;
  const map = useRef(null);

  const handleClick = () => {
    navigate('/routes');
  };

  const onSelectionModelChange = (sr) => {
    setSelectedRoutes(sr);
  };

  const getDirectionOptions = (finalStopData) => {
    const startPos = finalStopData.shift();
    const endPos = finalStopData.pop();
    return {
      id: uuidv4(),
      map: map.current,
      via: [...finalStopData],
      start: startPos,
      end: endPos,
      Resource: 'route_eta',
      Profile: ['driving'],
    };
  };

  useEffect(() => {
    map.current = new MapmyIndia.Map('map', {
      center: [25.09, 80.3],
      zoom: 5,
      search: false,
    });
    console.log(map.current);
  }, []);

  useEffect(() => {
    const finalRoutes = routes.filter((r) => selectedRoutes.includes(r.id));
    if (finalRoutes && finalRoutes.length > 0) {
      finalRoutes.forEach((route) => {
        const finalStopData = route.stops.map((stopId) => {
          const currentStop = stops.find((s) => s.id === stopId);
          return {
            id: route.id,
            label: currentStop.name,
            geoposition: `${currentStop.lat},${currentStop.long}`,
          };
        });
        const directionOptions = getDirectionOptions(finalStopData);
        console.log(directionOptions);
        MapmyIndia.direction(directionOptions);
      });
    }
  }, [selectedRoutes]);

  const onEditRoute = (id) => {
    console.log(`Edit route ${id}`);
    navigate(`/routes/edit/${id}`);
  };

  const onDeleteRoute = (id) => {
    console.log(`Delete route ${id}`);
    setRoutes(routes.filter((route) => route.id !== id));
  };

  const onViewRouteRoute = (id) => {
    setSelectedRoutes([id]);
  };

  const formatedRoutess = () => {
    return routes.map((route) => ({
      ...route,
      stops: stops.filter((stop) => route.stops.includes(stop.id)),
    }));
  };

  return (
    <>
      <Typography className={classes.root} variant="h4">
        Routes:{' '}
        <Button onClick={handleClick} variant="contained" color="primary">
          Add Route
        </Button>
      </Typography>
      {routes && routes.length > 0 ? (
        <>
          <Box className={classes.dataWrapper} display={'flex'}>
            <div className={classes.tableWrapper}>
              <RoutesTable
                routes={formatedRoutess()}
                onSelectionModelChange={onSelectionModelChange}
                deleteRoute={onDeleteRoute}
                editRoute={onEditRoute}
                viewRoute={onViewRouteRoute}
              />
            </div>
            <div id="map" ref={map} className={classes.map}></div>
          </Box>
        </>
      ) : (
        <Typography className={classes.root}>
          There are no routes yet..!
        </Typography>
      )}
    </>
  );
}
