# Example React Project for Micro-frontend.
This is for demo of Module Federation. It created with goal as separate repos and can develop separatly.

It's not finish properly yet.

**Note:** Module Federation can't work with React Refresh so I disabled React Refresh by default. If you want to enable then change `REACT_REFRESH_ENABLED` in `webpack.config.js` to be true but Module Federation will be disable.

## Structure
- `http` HTTP server to act as static server or CDN. Just demo server.
- `main` main repo that contains routes that will load micro-frontend. It will switch pages between home and pricing only.
- `home` home page.
- `pricing` pricing page.

## How to run?
### Running for local development.
- Run `yarn`.
- Run `yarn start:local`. It will run every things and open web browser.
  - `main` will run on `localhost:8091`.
  - `home` will run on `localhost:8092`.
  - `pricing` will run on `localhost:8093`.

### Running as production.
Later or never but you should get idea. It's not hard to do by your self.

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
