import * as React from 'react';
import {
  CalendarMonth,
  CancelRounded,
  CheckCircleRounded,
  FlagRounded,
  PersonRounded,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';

interface SearchResult {
  name: boolean;
  dob: boolean;
  citizenship: boolean;
}

const formName = (
  name: string,
  setName: React.Dispatch<React.SetStateAction<string>>,
  nameMatched: boolean,
  nameError: boolean,
  setNameError: React.Dispatch<React.SetStateAction<boolean>>,
  searched: boolean,
  setSearched: React.Dispatch<React.SetStateAction<boolean>>
) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end', margin: '2em 0 0 0' }}>
      <PersonRounded sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
      <TextField
        required
        id="name-required"
        label="Full Name"
        variant="standard"
        style={{ minWidth: '50%' }}
        error={nameError}
        value={name}
        onChange={(e) => {
          if (e.target.value.length > 0) {
            setNameError(false);
          }

          setSearched(false);
          setName(e.target.value);
        }}
      />
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'flex-end',
        }}
      >
        {nameMatched && searched && <CheckCircleRounded />}
        {!nameMatched && searched && <CancelRounded />}
      </Box>
    </Box>
  );
};

const formBirth = (
  birthyear: number | undefined,
  setBirthYear: React.Dispatch<React.SetStateAction<number | undefined>>,
  birthYearMatched: boolean,
  birthError: boolean,
  setBirthError: React.Dispatch<React.SetStateAction<boolean>>,
  searched: boolean,
  setSearched: React.Dispatch<React.SetStateAction<boolean>>
) => {
  return (
    <Box
      sx={{ display: 'flex', alignItems: 'flex-end', margin: '1em 0 1em 0' }}
    >
      <CalendarMonth sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
      <TextField
        required
        id="year-required"
        label="Birth Year"
        type="number"
        variant="standard"
        inputProps={{ min: 0, max: new Date().getFullYear() }}
        style={{ minWidth: '50%' }}
        error={birthError}
        value={birthyear}
        onChange={(e) => {
          if (!!!e.target.value) {
            setBirthError(false);
          }

          setSearched(false);
          setBirthYear(parseInt(e.target.value));
        }}
      />
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'flex-end',
        }}
      >
        {birthYearMatched && searched && <CheckCircleRounded />}
        {!birthYearMatched && searched && <CancelRounded />}
      </Box>
    </Box>
  );
};

const formCountry = (
  country: string,
  setCountry: React.Dispatch<React.SetStateAction<string>>,
  countryMatched: boolean,
  countryError: boolean,
  setCountryError: React.Dispatch<React.SetStateAction<boolean>>,
  searched: boolean,
  setSearched: React.Dispatch<React.SetStateAction<boolean>>
) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end', margin: '0 0 1em 0' }}>
      <FlagRounded sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
      <TextField
        required
        id="country-required"
        label="Country"
        variant="standard"
        style={{ minWidth: '50%' }}
        error={countryError}
        value={country}
        onChange={(e) => {
          if (e.target.value.length > 0) {
            setCountryError(false);
          }

          setSearched(false);
          setCountry(e.target.value);
        }}
      />
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'flex-end',
        }}
      >
        {countryMatched && searched && <CheckCircleRounded />}
        {!countryMatched && searched && <CancelRounded />}
      </Box>
    </Box>
  );
};

function Form() {
  const [name, setName] = React.useState('');
  const [birthyear, setBirthYear] = React.useState<number | undefined>();
  const [country, setCountry] = React.useState<string>('');

  const [nameMatched, setNameMatched] = React.useState(false);
  const [birthYearMatched, setBirthYearMatched] = React.useState(false);
  const [countryMatched, setCountryMatched] = React.useState(false);
  const [searched, setSearched] = React.useState(false);

  // Error States
  const [nameError, setNameError] = React.useState(false);
  const [birthError, setBirthError] = React.useState(false);
  const [countryError, setCountryError] = React.useState(false);

  const search = async () => {
    setSearched(true);

    if (!name || !!!birthyear || !country) {
      // Set error states if any are empty
      setNameError(!!!name);
      setBirthError(!!!birthyear);
      setCountryError(!!!country);
      return;
    }

    const request = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/search`,
      {
        name,
        birthyear,
        country,
      }
    );
    const data: SearchResult = request.data;

    // Update matcher states
    setNameMatched(data.name);
    setBirthYearMatched(data.dob);
    setCountryMatched(data.citizenship);
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Card
        variant="outlined"
        sx={{ minWidth: '50vh', margin: '2em', padding: '1em' }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            OFAC User Search
          </Typography>

          {formName(
            name,
            setName,
            nameMatched,
            nameError,
            setNameError,
            searched,
            setSearched
          )}
          {formBirth(
            birthyear,
            setBirthYear,
            birthYearMatched,
            birthError,
            setBirthError,
            searched,
            setSearched
          )}
          {formCountry(
            country,
            setCountry,
            countryMatched,
            countryError,
            setCountryError,
            searched,
            setSearched
          )}
        </CardContent>
        <CardActions style={{ justifyContent: 'flex-end' }}>
          <Button size="medium" variant="contained" onClick={search}>
            Submit
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default Form;
