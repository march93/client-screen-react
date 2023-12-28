# Client Screen Web App

## Description
React frontend to help search a user using OFAC API. Full name, birth year, and country text fields are displayed on the main page. All fields are required to submit the form. Once submitted, a checkmark will be shown next to a text field if it matches any of the users returned by the backend. A cancel icon will be shown if it doesn't match any. If none of the fields match anything, `Clear` will be displayed under all text fields to indicate the user has not matched anything. `Hit` will be displayed if at least one of the fields matches something. Any errors caught will be displayed under the text fields. <br>

A public version of the web app is available at `https://client-screen-web.onrender.com`

## Params
- Full name of the user will be provided to the full name field
- The year of birth will be provided to the birth year field
- The country of citizenship will be provided to the country field

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Optimizations
- A full test suite (not written for this project)
- Better breakdown of components in the `Form.tsx` file
