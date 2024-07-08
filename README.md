# Agora Solid.js demo

## Getting started

Ensure you have an Agora account and registered app. Put the app id in the `VITE_AGORA_APPID` environment variable. An easy way to get this done is to copy the `.env.example` file to `.env` and fill out the value. 

## Known issues

 - For testing from a different device other than the hosting server, tls is required. One will need to provide their own https termination for the application to work.
 - Firefox doesn't allow autoplaying of audio without user interaction. The Agora library doesn't seem to play well with this restriction, nor does it offer an easy way to retrieve the AudioContext, in order to manually approve the playback of audio.

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

Solid apps are built with _presets_, which optimise your project for deployment to different environments.

By default, `npm run build` will generate a Node app that you can run with `npm start`. To use a different preset, add it to the `devDependencies` in `package.json` and specify in your `app.config.js`.

## Testing

Tests are written with `vitest`, `@solidjs/testing-library` and `@testing-library/jest-dom` to extend expect with some helpful custom matchers.

To run them, simply start:

```sh
npm test
```

#### This project was created with the [Solid CLI](https://solid-cli.netlify.app)
