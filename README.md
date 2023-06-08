# Machata

Machata is a desktop application that provides a quick and convenient way to access ChatGPT on macOS. 

This app takes inspiration from [chatgpt-mac](https://github.com/vincelwt/chatgpt-mac), but written from scratch with some much-needed improvements.

It might also work on Windows and Linux but hasn't been tested yet.

## Features

* Native macOS integration with a menubar icon for quick access
* You don't need any OpenAI API key to use it, just an OpenAI account.
* Configurable hotkey to show/hide the chat window (default is CMD+Shift+g).
* The window stays on top until you press your hotkey again, copy-pasting parts of the conversation is easier than ever.
* You can press CMD+1, CMD+2... to access your first history items.
* No analytics, so you can use this on your day job (as long as they allow using ChatGPT).

## Usage

```
git clone https://github.com/mmaorc/machata.git
cd machata 
npm install
npm start
```

### Configuration

You can customize the app's settings by creating a `config.ini` file in the app's user data folder. This folder is located at `~/Library/Application Support/Machata` on macOS.

Here's a sample `config.ini` file:

```
key = CommandOrControl+g
showDevTools = false
```

- `key`: The hotkey for showing/hiding the chat window (default: `CommandOrControl+g`)
- `showDevTools`: Whether to show the developer tools when the app starts (default: `false`)

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss your proposed changes.

## License

This project is licensed under the Apache-2.0 License. See the [LICENSE](LICENSE) file for details.

## Contact

Find me on [Twitter](https://bit.ly/3CgS5XA).