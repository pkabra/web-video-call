const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const lessMiddleware = require('less-middleware');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
// const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config.js');

const isDeveloping = process.env.NODE_ENV !== 'production';
const jsCompiler = webpack(config);
const jsMiddleware = webpackMiddleware(jsCompiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false,
  },
});
const cssMiddleware = lessMiddleware(path.join(__dirname, '../public'), {
  dest: path.join(__dirname, '../build'),
  preprocess: {
    path: pathname => (pathname.replace('/static', '')),
  },
});

module.exports = {
  jsMiddleware: jsMiddleware,
  isDeveloping: isDeveloping,
  init: (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    if (isDeveloping) {
      app.use(cssMiddleware);
      app.use(jsMiddleware);
      // app.use(webpackHotMiddleware(compiler));
    }
    app.use('/static', express.static(path.join(__dirname, '../build')));
  },
};
