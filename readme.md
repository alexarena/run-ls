## About
Reminds you what npm scripts are available for a given Node module.

## Install

`npm i -g run-ls`

## Example

This assumes our working directory is Node module (either it or its parent has a `package.json`).

For a `package.json` containing the following:
```json
"scripts": {
  "start": "node node_modules/react-native/local-cli/cli.js start",
  "start:sim": "react-native run-ios --configuration Debug --simulator=\"iPhone X\"",
  "start:device": "react-native run-ios --configuration Debug --device \"Alex’s iPhone X\"",
  "build:prod": "react-native run-ios --configuration Release --device \"Alex’s iPhone X\"",
  "test": "jest"
}
```

Running `run-ls` or `runls` in the working directory would output:
```
Commands for SampleModule:
- npm start (node node_modules/react-native/local-cli...)
- npm run start:sim (react-native run-ios --configuration Deb...)
- npm run start:device (react-native run-ios --configuration Deb...)
- npm run build:prod (react-native run-ios --configuration Rel...)
- npm test (jest)

```
