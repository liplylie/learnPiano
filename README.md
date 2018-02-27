### LearnPiano
website for interactive learning with the piano
Currently in development. Please see other branches to look at progress.

## Table of Contents

- [TechStack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm run start-nodemon](#npm-run-start-nodemon)
  - [npm run compile-watch](#npm-run-compile-watch)
  - [npm run all](#npm-run-all)
- [Supported Browsers](#supported-browsers)

## Tech Stack
- JavaScript
- React
- React Redux
- React Router Dom
- Web Audio Api
- BootStrap
- Font Awesome
- Webpack
- NodeJS
- ExpressJS
- Firebase Auth and Database
- Webpack
## Available Scripts

In the terminal, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm start-nodemon`

Launches the test runner in the interactive watch mode.<br>

### `npm run compile-watch`

Runs the webpack and builds the bundle.js file. 

### `npm run all`

Runs npm start nodemon and npm run compile-watch <br/>

For production, modify the webpack.config.js file and add the uglify and production plugins.

## Supported Browsers

LearnPianoFun works on all browsers. However, the web audio api is unable to work properly on mobile browsers, so the lessons and mini games cannot be played on mobile devices.

You can refer [to the React documentation](https://reactjs.org/docs/react-dom.html#browser-support) for more information about supported browsers.



