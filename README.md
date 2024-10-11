# bevy_react_inspector
A small [web based inspector](https://villor.github.io/bevy_react_inspector/) for bevy (using BRP) written in React.

NOTE: This currently works only on bevys `main` branch since BRP is not yet released.

![image](https://github.com/user-attachments/assets/b0d8772b-3fbc-4b46-ad7e-c1f2640792df)

## Usage
Set up your Bevy app as a BRP server, see [example](https://github.com/bevyengine/bevy/blob/main/examples/remote/server.rs).

Since BRP doesn't allow any origin by default, add a CORS header to allow the browser to access it:

```rust
app.add_plugins(
    RemoteHttpPlugin::default()
        .with_header("Access-Control-Allow-Origin", "https://villor.github.io"),
)
```

[Open](https://villor.github.io/bevy_react_inspector/) the inspector and enjoy!

## Development
1. Install NodeJS (latest LTS should be fine)
2. Clone this repo
3. `npm install`
4. `npm run dev`

## License
MIT
