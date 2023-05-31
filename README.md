# Core Protocols Discord Bot
Structured use of the [Core Protocols](https://mccarthyshow.com/the-core/) in Discord.

## Why The Core Protocols?
The Core is a set of best practices from over 25 years of research from [Jim](https://twitter.com/mccarthyjim1) and [Michele](https://twitter.com/michmccarthy) McCarthy and the teams they have worked with. It includes Core Commitments for the team to create a high functioning environment, and a set of Core Protocols to help the team better understand and support those commitments.

Communication and collaboration are improved when team members have a shared understanding of terms and responsibilities; people know what's expected of them. For example, using The Core, everyone understands that when someone **Checks In** that they are agreeing to a [set of commitments](https://greatness.rocks/the-core/) for high-functioning team work.

To learn more about The Core read the book [Software For Your Head](https://liveingreatness.com/software-for-your-head-book/). It's online, free, and covers the protocols in depth.

Additionally, you may want to:
* [Attend a Bootcamp](https://mccarthyshow.com/boot-camp/)
* [Listen to the Podcasts](https://mccarthyshow.com/category/podcasts/page/14/)

## How to Use
There are four slash commands available: learn, checkin, checkout, and propose. See screenshots and information about the commands at [greatness.rocks/core-protocols-discord-bot](https://greatness.rocks/core-protocols-discord-bot).

### Set Up Your Bot
You can create your own free bot by following [Discord’s Getting Started guide](https://discord.com/developers/docs/getting-started). If you don’t have a server, you can use [Glitch](https://github.com/janell-baxter/Core_Protocols_Discord_Bot/blob/main/glitch.com) for development and short-term testing. Use the bot as is, or change The Core Protocols functionality in the app.js, commands.js, and utils.js files. You can set your own name and avatar for the bot, too.

Steps:
1. Create a Discord app. Follow the [Discord’s Getting Started guide](https://discord.com/developers/docs/getting-started) to see how to create one.
2. Setup hosting for the code (you can use [Glitch](https://github.com/janell-baxter/Core_Protocols_Discord_Bot/blob/main/glitch.com) for development and short-term testing for free).
3. Create a .env file for environment variables. Example variables: GUILD_ID, DISCORD_TOKEN, PUBLIC_KEY, and APP_ID.
4. Connect the app to the server you want to use it in.

# Project Information
This project is released under the GPLv3 license. You can add additional functionality or other improvements.

## Structure
This is an open source project built using the [example](https://github.com/discord/discord-example-app) provided by [Shay DeWael](https://github.com/shaydewael) as a starting point.

Below is a basic overview of the project structure:
```
├── .env -> .env file (you need to create your own environment variables file)
├── app.js      -> main entrypoint for app
├── commands.js -> slash command payloads + helpers
├── utils.js    -> utility functions and enums
├── package.json
├── README.md
```
## Core Protocols Code
The Core Protocols functionality can be updated in the app.js, commands.js, and utils.js files.

### Check-In Emoji
The emoji for Check-In can be updated in utils.js.
```
export function getCheckinEmoji() {
  const emojiList = "😡 😭 😄 😨";
  return emojiList;
}
```
### Command Descriptions
The descriptions for protocols are located in commands.js.
Example:
```
// -----------------------------------
// Core Protocols
// -----------------------------------
export const DECIDER_COMMAND = {
  name: "decider",
  description: "Decider: Immediately and unanimously move your team towards results",
  type: 1,
};
```
### Functionality
To change how the protocols work, see the apps.js file.

Example:
```
// -----------------------------------
// Handle modal submissions
// -----------------------------------
  if (type === InteractionType.APPLICATION_MODAL_SUBMIT) {
    // custom_id of modal
    const modalId = data.custom_id;
    // user ID of member who filled out modal
    const userId = req.body.member.user.id;

    if (modalId === "decider_proposal") {
      let proposal_text = "";
       for (let action of data.components) {
        let inputComponent = action.components[0];
        proposal_text += `${inputComponent.value}\n`;
      }
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `@here <@${userId}> has initiated a Decider. Respond with 👍 thumbs up or 👎 thumbs down.\n\n<@${userId}> proposes ${proposal_text}`,
        },
      });
    }
  }
});
```
## Licenses
This project is open source. See [GPLv3](https://choosealicense.com/licenses/gpl-3.0/) for details.
* The Core Protocols are distributed under a GNU-PL license. See [Core Protocols](https://mccarthyshow.com/the-core/).
* The [example](https://github.com/discord/discord-example-app) provided by [Shay DeWael](https://github.com/shaydewael) used as a starting point for this project is distributed under the [MIT license](https://choosealicense.com/licenses/mit/).

