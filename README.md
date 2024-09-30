# bevy_react_inspector
A small [web based inspector](https://villor.github.io/bevy_react_inspector/) for bevy (using BRP) written in React.

NOTE: This currently works only on bevys `main` branch since BRP is not yet released.

## Usage
Set up your Bevy app as a BRP server, see [example](https://github.com/bevyengine/bevy/blob/main/examples/remote/server.rs).

The application expects BRP to be available at `http://localhost:15703`. (custom url/port is coming).

Since BRP doesn't allow any origin by default, install Node and run the following to start a local proxy:
```
npx local-cors-proxy --proxyUrl http://localhost:15702 --port 15703 --proxyPartial /
```

[Open](https://villor.github.io/bevy_react_inspector/) the inspector and enjoy!

## Development
1. Install NodeJS (latest LTS should be fine)
2. Clone this repo
3. `npm install`
4. `npm run dev`

## License
MIT
