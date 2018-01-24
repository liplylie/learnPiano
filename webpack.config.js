const path = require('path');

const SRC_DIR = path.resolve(__dirname, 'client');
const BUILD_DIR = path.resolve(__dirname, 'client/static');

module.exports = {
  entry: path.resolve(SRC_DIR, 'index.js'),
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015', 'react'] }
        }],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> styled default home page WORK ON LOGOUT FEATURE
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        loader: 'file-loader',
        options: {}
      }
<<<<<<< HEAD
=======
>>>>>>> basic set up with navBar and 404 route NEED TO ADD FIREB AUTH
=======
>>>>>>> styled default home page WORK ON LOGOUT FEATURE
    ]
  }
}