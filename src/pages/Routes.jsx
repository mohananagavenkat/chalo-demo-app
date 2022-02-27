import React, {useContext, useEffect, useRef, useState} from 'react';
import {RoutesContext} from '../context/RoutesContext';
import Navbar from '../components/Navbar';
import Typography from '@material-ui/core/Typography';
import {useFormik} from 'formik';
import TextField from '@material-ui/core/TextField';
import * as Yup from 'yup';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import {Chip, FormHelperText} from '@material-ui/core';
import {makeStyles, createStyles} from '@material-ui/core/styles';
import {Autocomplete} from '@material-ui/lab';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {commonStyles} from '../style';
import Checkbox from '@material-ui/core/Checkbox';
import {StopsContext} from '../context/StopContext';
import Button from '@material-ui/core/Button';
import {v4 as uuidv4} from 'uuid';
import {useNavigate, useParams} from 'react-router-dom';

const useStyles = makeStyles((theme) =>
  createStyles({
    ...commonStyles(theme),
    root: {
      maxWidth: 400,
      margin: 'auto',
      padding: '2rem 0',
    },
    radios: {
      position: 'relative',
      top: '-25%',
    },
    button: {
      borderRadius: 50,
      marginRight: '4px',
      minWidth: '100px',
    },
  })
);

export default function Routes({mode = 'add', title = 'Add Route'}) {
  const classes = useStyles();

  const {routes, setRoutes} = useContext(RoutesContext);
  const {stops, stopsContext} = useContext(StopsContext);
  const navigate = useNavigate();
  const {id} = useParams();

  const routeCreationSchema = Yup.object().shape({
    routeName: Yup.string().trim().required().max(500),
    direction: Yup.string().trim().required(),
    stops: Yup.array().min(2),
    active: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      routeName: '',
      direction: 'up',
      active: '',
      stops: [],
    },
    validationSchema: routeCreationSchema,
    onSubmit: (values) => {
      console.log(values);
      let newRoutes;
      if (mode === 'add') {
        newRoutes = [
          ...routes,
          {
            ...values,
            stops: values.stops.map((s) => s.id),
            id: uuidv4(),
          },
        ];
      } else {
        const editingRouteIndex = routes.findIndex((r) => r.id === id);
        newRoutes = [...routes];
        newRoutes[editingRouteIndex] = {
          ...values,
          stops: values.stops.map((s) => s.id),
          id,
        };
      }
      setRoutes(newRoutes);
      navigate('/');
    },
  });

  useEffect(() => {
    if (mode === 'edit') {
      if (!id) {
        navigate('/');
      } else {
        const editableRoute = routes.find((r) => r.id === id);
        console.log(editableRoute);
        formik.setFieldValue('routeName', editableRoute['routeName']);
        formik.setFieldValue('direction', editableRoute['direction']);
        formik.setFieldValue('active', editableRoute['active']);
        formik.setFieldValue(
          'stops',
          stops.filter((s) => editableRoute['stops'].includes(s.id))
        );
      }
    }
  }, [mode]);

  return (
    <>
      <Navbar title={`chalo - ${title}`} />
      <div className={classes.root}>
        <form
          onSubmit={formik.handleSubmit}
          className={classes.verticalAlignBottom}
          autoComplete="off"
        >
          <Box mt={3}>
            <TextField
              className={classes.textField}
              label={'routeName'}
              id="routeName"
              name="routeName"
              type="text"
              value={formik.values.routeName}
              onChange={formik.handleChange}
              variant="outlined"
              error={formik.touched.routeName && !!formik.errors.routeName}
              helperText={
                formik.touched.routeName ? formik.errors.routeName : ''
              }
            />
            <Box display={'flex'}>
              <Typography>Direction</Typography>
              <RadioGroup
                aria-label="direction"
                name="direction"
                value={formik.values.direction}
                onChange={formik.handleChange}
              >
                <Box className={classes.radios} display={'flex'} ml={3}>
                  <FormControlLabel value="up" control={<Radio />} label="up" />
                  <FormControlLabel
                    value="down"
                    control={<Radio />}
                    label="down"
                  />
                </Box>
              </RadioGroup>
            </Box>
            <Box display={'flex'} alignItems={'center'}>
              <Typography>Active</Typography>
              <Box display={'flex'} ml={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="active"
                      id="active"
                      onChange={formik.handleChange}
                      checked={!!formik.values.active}
                      color="primary"
                    />
                  }
                />
              </Box>
            </Box>

            <FormControl variant="outlined" className={classes.textField}>
              <Autocomplete
                multiple
                id="stops"
                data-testid="stops-select"
                onBlur={(e) => {
                  formik.handleBlur(e);
                }}
                onChange={(event, value) => {
                  formik.setFieldValue('stops', value);
                }}
                value={formik.values.stops}
                options={stops}
                getOptionLabel={(option) => option.name}
                getOptionSelected={(option, value) => option.id === value.id}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    error={formik.touched.stops && !!formik.errors.stops}
                    label="stops"
                    name="stops"
                    {...params}
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      classes={{
                        label: classes.chipLabel,
                      }}
                      style={{
                        margin: '1rem',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        width: 'auto',
                        backgroundColor: 'gold',
                        maxWidth: '200px',
                      }}
                      label={option.name}
                      {...getTagProps({index})}
                    />
                  ))
                }
              />
              <FormHelperText error={true}>
                {formik.touched.stops ? formik.errors.stops : ''}
              </FormHelperText>
            </FormControl>
          </Box>
          <Button
            variant="contained"
            type="button"
            className={classes.button}
            color="secondary"
            onClick={() => navigate('/')}
          >
            Back
          </Button>
          <Button
            variant="contained"
            id="button"
            data-testid="submit-button"
            type="submit"
            className={classes.button}
            color="primary"
            aria-label={'Submit'}
            onClick={formik.handleSubmit}
          >
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}
