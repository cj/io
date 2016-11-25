import path                       from 'path'
import LoaderOptionsPlugin        from 'webpack/lib/LoaderOptionsPlugin'
import DefinePlugin               from 'webpack/lib/DefinePlugin'
import HtmlWebpackPlugin          from 'html-webpack-plugin'
import HotModuleReplacementPlugin from 'webpack/lib/HotModuleReplacementPlugin'
import ProgressPlugin             from 'webpack/lib/ProgressPlugin'
import NamedModulesPlugin         from 'webpack/lib/NamedModulesPlugin'

const config   = module.exports = {}
const NODE_ENV = process.env.NODE_ENV || 'development'
const HOST     = process.env.WEBPACK_HOST || '0.0.0.0'
const PORT     = process.env.WEBPACK_PORT || 3000
const includes   = [ path.resolve('./src') ]
const loaders    = {
  img: { test: /\.(jpg|png)$/, include: includes, loader: 'file-loader?name=assets/images/[name].[ext]' },
  js:  { test: /\.js$/,        include: includes, loader: 'babel-loader' },
  vue: {
    test: /\.vue$/,
    include: includes,
    loader: 'vue-loader',
    options: {
      postcss: [
        require('autoprefixer')({
          browsers: ['last 3 versions']
        })
      ]
    }
  },
  fonts: [
    { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,      loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]' },
    { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader?name=fonts/[name].[ext]' }
  ]
}

// resolve
config.resolve = {
  extensions: ['.js', '.styl', '.pug'],
  modules: [
    path.resolve('./src'),
    path.resolve('./node_modules')
  ]
}

// plugins
config.plugins = [
  new DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    hash: false,
    inject: 'body',
    template: './src/index.html'
  })
]

// entry
config.entry = {
  'index': './src/entries/browser.js'
}

// development
if (NODE_ENV === 'development') {
  config.output = {
    path: path.resolve('dist'),
    filename: '[name].js'
  }

  config.devtool = 'source-map'

  config.module = {
    rules: [ loaders.js, loaders.vue, loaders.img, ...loaders.fonts ]
  }

  config.plugins.push(
    new HotModuleReplacementPlugin(), new NamedModulesPlugin(),
    new ProgressPlugin()
  )

  config.devServer = {
    contentBase: './src',
    historyApiFallback: true,
    host: HOST,
    hot: true,
    port: PORT,
    stats: {
      cached: true,
      cachedAssets: true,
      chunks: true,
      chunkModules: false,
      colors: true,
      hash: false,
      reasons: true,
      timings: true,
      version: false
    }
  }
}
