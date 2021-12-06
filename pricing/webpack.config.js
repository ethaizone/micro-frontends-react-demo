'use strict'
const { DefinePlugin } = require('webpack')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const areYouES5 = require('are-you-es5')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const packageDeps = require('./package.json').dependencies

const result = areYouES5.checkModules({
  path: '', // Automatically find up package.json from cwd
  checkAllNodeModules: true,
  ignoreBabelAndWebpackPackages: true
})

const REACT_REFRESH_ENABLED = false

/**
 * Create config for webpack.
 * Note: All default values in here must for production.
 * @param {String} entryFilePath Initial file for entry
 * @param {String} environment (local|integration|staging|production)
 * @returns
 */
function createConfig(environment) {

  let devtool = false // For production
  if (environment === 'integration' || environment === 'staging') {
    devtool = 'source-map'
  }
  if (environment === 'local') {
    devtool = 'cheap-module-source-map'
  }

  const isDevelopment = environment !== 'production'

  const config = {
    mode: isDevelopment ? 'development' : 'production',
    devtool,
    entry: './src/index.tsx',
    target: ['browserslist', 'web'],
    resolve: {
      plugins: [
        new TsconfigPathsPlugin(),
      ],
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      // fallback: {
      //   assert: false,
      // },
    },
    module: {
      rules: [
        {
          test: /\.(tsx|ts|jsx|js)$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                plugins: [
                  (REACT_REFRESH_ENABLED && isDevelopment) && require.resolve('react-refresh/babel')
                ].filter(Boolean),
              },
            },
          ],
          exclude: [
            {
              and: [
                areYouES5.buildExcludeRegexp(result.es6Modules),
                // /[\\/]node_modules[\\/](?!(@googlemaps)[\\/])/,
              ]
            }
          ],
        },
        {
          test: /\.(less|css)$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            { loader: 'less-loader'},
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'images',
                postTransformPublicPath: function (p) {
                  p = p.replace('__webpack_public_path__ + ', '');
                  // This function is in 'src/utils/webpack.ts'
                  return `getWebpackBundleRootPath() + ${p}`;
                },
              },
            },
          ],
        },
        {
          test: /\.(ttf|eot|woff|woff2)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'fonts',
                postTransformPublicPath: function (p) {
                  p = p.replace('__webpack_public_path__ + ', '');
                  // This function is in 'src/utils/webpack.ts'
                  return `getWebpackBundleRootPath() + ${p}`;
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      // Don't enable ModuleFederation because it doesn't work property with React-refresh.
      (!isDevelopment || !REACT_REFRESH_ENABLED) &&
      new ModuleFederationPlugin(
        {
          name: 'pricing',
          filename: 'remoteEntry.js',
          exposes: {
            './Pricing': './src/Pricing',
          },
          shared: {
            ...packageDeps,
            react: { singleton: true, requiredVersion: packageDeps.react },
            "react-dom": { singleton: true, requiredVersion: packageDeps["react-dom"] },
            "@emotion/react": { singleton: true, requiredVersion: packageDeps["@emotion/react"] },
            "react-helmet-async": { singleton: true, requiredVersion: packageDeps["react-helmet-async"] },
          },
        }
      ),
      new DefinePlugin({
        __FRONTEND_ENVIRONMENT__: JSON.stringify(environment),
      }),
    ].filter(Boolean),
  }

  if (isDevelopment) {
    config.plugins.push(new HtmlWebpackPlugin({
      template: './public/index.html',
    }))
    if (REACT_REFRESH_ENABLED) {
      config.plugins.push(new ReactRefreshWebpackPlugin())
    }

    config.devServer = {
      port: 8093,
      hot: REACT_REFRESH_ENABLED ? true : false,
      open: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
      },
      allowedHosts: 'all',
    }
  }

  return config
}

module.exports = (env) => {
  let environment = env.target

  if (! environment) {
    throw Error('Required --env target={env} value. Possible value is local/integration/staging/production.')
  }

  if (! ['integration', 'staging', 'production'].includes(environment)) {
    environment = 'local'
  }

  console.log(`Running webpack with environment as "${environment}".`)

  const webPackConfig = createConfig(environment)
  return webPackConfig
}
