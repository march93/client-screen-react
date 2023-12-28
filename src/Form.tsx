import * as React from 'react';
import {
  CalendarMonth,
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

const formName = (
  name: string,
  setName: React.Dispatch<React.SetStateAction<string>>,
  nameMatched: boolean,
  nameError: boolean,
  setNameError: React.Dispatch<React.SetStateAction<boolean>>
) => {
  return (
    <>
      {/* Full Name */}
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
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
          {nameMatched && <CheckCircleRounded />}
        </Box>
      </Box>
    </>
  );
};

const formBirth = (
  birthYear: number | undefined,
  setBirthYear: React.Dispatch<React.SetStateAction<number | undefined>>,
  birthYearMatched: boolean,
  birthError: boolean,
  setBirthError: React.Dispatch<React.SetStateAction<boolean>>
) => {
  return (
    <>
      {/* Birth Year */}
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
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
          value={birthYear}
          onChange={(e) => {
            if (e.target.value !== undefined) {
              setBirthError(false);
            }

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
          {birthYearMatched && <CheckCircleRounded />}
        </Box>
      </Box>
    </>
  );
};

const formCountry = (
  country: string,
  setCountry: React.Dispatch<React.SetStateAction<string>>,
  countryMatched: boolean,
  countryError: boolean,
  setCountryError: React.Dispatch<React.SetStateAction<boolean>>
) => {
  return (
    <>
      {/* Country */}
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
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
          {countryMatched && <CheckCircleRounded />}
        </Box>
      </Box>
    </>
  );
};

function Form() {
  const [name, setName] = React.useState('');
  const [birthYear, setBirthYear] = React.useState<number | undefined>();
  const [country, setCountry] = React.useState<string>('');

  const [nameMatched, setNameMatched] = React.useState(false);
  const [birthYearMatched, setBirthYearMatched] = React.useState(false);
  const [countryMatched, setCountryMatched] = React.useState(false);

  // Error States
  const [nameError, setNameError] = React.useState(false);
  const [birthError, setBirthError] = React.useState(false);
  const [countryError, setCountryError] = React.useState(false);

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

          {formName(name, setName, nameMatched, nameError, setNameError)}
          {formBirth(
            birthYear,
            setBirthYear,
            birthYearMatched,
            birthError,
            setBirthError
          )}
          {formCountry(
            country,
            setCountry,
            countryMatched,
            countryError,
            setCountryError
          )}
        </CardContent>
        <CardActions style={{ justifyContent: 'flex-end' }}>
          <Button size="medium" variant="contained">
            Submit
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default Form;
