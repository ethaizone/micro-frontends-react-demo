# Example React Project for Micro-frontend.
This is for demo of Module Federation. It created with goal as separate repos and can develop separatly.

**Note:** Module Federation can't work with React Refresh so I disabled React Refresh by default. If you want to enable then change `REACT_REFRESH_ENABLED` in `webpack.config.js` to be true but Module Federation will be disable.

## Structure
- `http` HTTP server to act as static server or CDN. Just demo server.
- `main` main repo that contains routes that will load micro-frontend. It will switch pages between home and pricing only.
- `home` home page.
- `pricing` pricing page.

## How to run?
### Running for local development.
- Run `yarn` in every directories. It will install packages.
- Run `yarn start` in `home` and `pricing` in each terminal session. It will start webpack server for it with TSC in watch mode. It will open web browser


### Running as example for production deployment.
Goal is created production version and put files in `http/cdn`.


### For main/home/pricing
- `yarn` install page.
- `yarn start` for starting dev server.
  - If you run in `http`. Root page will display main page from
  - If you run in `home` or `pricing` then it will open web browser automatically.
- `yarn build` for create production build.
- `yarn build:cdn` to create production build and put to `http`.


## Libraries.
- React
- Typescript
- Webpack
  - Module Federation
  - React Refresh (For HOT reload)
- Babel
- Eslint
- Prettier
