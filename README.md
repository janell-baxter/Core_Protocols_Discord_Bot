# Core Protocols Discord Bot
An app that you can add to your Discord server to provide structured use of the [Core Protocols](https://mccarthyshow.com/the-core/) developed by [Jim](https://twitter.com/mccarthyjim1) and [Michele](https://twitter.com/michmccarthy) McCarthy.

## Why
The Core is a set of best practices culled from over 25 years of research from Jim and Michele McCarthy and the teams they have worked with. It includes commitments that are an agreement from the team to create a high functioning environment and to accept the responsibility to maintain it. A set of Core Protocols help the team better understand and support the Core Commitments.

Communication and collaboration are improved when team members have a shared understanding of terms and responsibilities; people know what's expected of them. For example, using The Core, everyone understands that when someone Checks In that they are agreeing to a [set of commitments](https://greatness.rocks/the-core/) for high-functioning team work.



## How

# Project 

### Project structure
This is an open source project built using the [example](https://github.com/discord/discord-example-app) provided by [Shay DeWael](https://github.com/shaydewael) as a starting point.

Below is a basic overview of the project structure:

```
├── .env -> .env file
├── app.js      -> main entrypoint for app
├── commands.js -> slash command payloads + helpers
├── utils.js    -> utility functions and enums
├── package.json
├── README.md
└── .gitignore
```
## Core Protocols Code
The Core Protocols functionality can be updated in the app.js, commands.js and utils.js files.

### Check-In Emoji
The emoji for Check-In can be updated in utils.js.

export function getCheckinEmoji() {
  const emojiList = "😡 😭 😄 😨";
  return emojiList;
}
### Command Descriptions
The descriptions for protocols are located in commands.js.
Example:
// -----------------------------------
// Core Protocols
// -----------------------------------
export const DECIDER_COMMAND = {
  name: "decider",
  description: "Decider: Immediately and unanimously move your team towards results",
  type: 1,
};
