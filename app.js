import express from "express";
import {
  InteractionType,
  InteractionResponseType,
  InteractionResponseFlags,
  MessageComponentTypes,
  ButtonStyleTypes,
} from "discord-interactions";
import {
  VerifyDiscordRequest,
  getRandomEmoji,
  DiscordRequest,
} from "./utils.js";

// -----------------------------------
// Import commands
// -----------------------------------
import {
  DECIDER_COMMAND,
  CHECK_IN_COMMAND,
  CHECK_OUT_COMMAND,
  LEARN_COMMAND,
  PROPOSAL_COMMAND,
  HasGuildCommands,
} from "./commands.js";


// -----------------------------------
// Create app
// -----------------------------------
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;
// Parse request body and verifies incoming requests using discord-interactions package
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

// -----------------------------------
// Interactions endpoint URL where Discord will send HTTP requests
// -----------------------------------

app.post("/interactions", async function (req, res) {
// Interaction type and data
const { type, id, data } = req.body;
  
  
// -----------------------------------
// Handle verification requests
// -----------------------------------
  
if (type === InteractionType.PING) {
  return res.send({ type: InteractionResponseType.PONG });
}
  
// -----------------------------------
// Handle slash command requests
// See https://discord.com/developers/docs/interactions/application-commands#slash-commands
// -----------------------------------

  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;
    if (name === "decider" || name === "propose") {
    // Send a modal as response
    // Text inputs must be inside of an action component
    // See https://discord.com/developers/docs/interactions/message-components#text-inputs-text-input-structure
                  
      return res.send({
        type: InteractionResponseType.APPLICATION_MODAL,
        data: {
          custom_id: "decider_proposal",
          title: "Decider Protocol",
          components: [
            {
              type: MessageComponentTypes.ACTION_ROW,
              components: [
                {
                  type: MessageComponentTypes.INPUT_TEXT,
                  custom_id: "proposal",
                  style: 2,
                  label: "Complete this sentence: I propose ...",
                },
              ],
            },
          ],
        },
      });
    }
    else if (name === "learn") {
      // Send a message into the channel where command was triggered from
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: "Learn more about...",
          components: [
            {
              type: MessageComponentTypes.ACTION_ROW,
              components: [
                {
                  type: MessageComponentTypes.BUTTON,
                  url: "https://mccarthyshow.com/the-core/",
                  label: "Core Prototocols",
                  style: ButtonStyleTypes.LINK,
                },
                {
                  type: MessageComponentTypes.BUTTON,
                  url: "https://greatness.rocks/check-in-for-optimal-team-performance/",
                  label: "Check In",
                  style: ButtonStyleTypes.LINK,
                },
                {
                  type: MessageComponentTypes.BUTTON,
                  url: "https://greatness.rocks/check-out/",
                  label: "Check Out",
                  style: ButtonStyleTypes.LINK,
                },
                {
                  type: MessageComponentTypes.BUTTON,
                  url: "https://greatness.rocks/decider/",
                  label: "Decider",
                  style: ButtonStyleTypes.LINK,
                },
              ],
            },
          ],
        },
      })
 
    } 
    else if (name === "checkin") {
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: "",
          tts: false,
          components: [
            {
              type: 1,
              components: [
                {
                  custom_id: `checkin_protocol`,
                  placeholder: `✔️ Choose emotions. You can select more than one.`,
                  options: [
                    {
                      label: `Mad`,
                      value: `😡 mad`,
                      emoji: {
                        id: null,
                        name: `😡`,
                      },
                      default: false,
                    },
                    {
                      label: `Sad`,
                      value: `😭 sad`,
                      emoji: {
                        id: null,
                        name: `😭`,
                      },
                      default: false,
                    },
                    {
                      label: `Glad`,
                      value: `😄 glad`,
                      emoji: {
                        id: null,
                        name: `😄`,
                      },
                      default: false,
                    },
                    {
                      label: `Afraid`,
                      value: `😨 afraid`,
                      emoji: {
                        id: null,
                        name: `😨`,
                      },
                      default: false,
                    },
                  ],
                  min_values: 1,
                  max_values: 4,
                  type: 3,
                },
              ],
            },
          ],
          allowed_mentions: {
            replied_user: false,
            parse: ["everyone"],
          },
          embeds: [
            {
              type: "rich",
              title: `Check In Protocol`,
              description: `Use Check In to begin meetings, or anytime it would add more value to the current team interactions.`,
              color: 0x00ffff,
            },
          ],
        },
      });
    }
     
  else if (name === "checkout") {
     return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: "Your presence signifies engagement. Check Out when you cannot maintain the Core Commitments.",
            components: [
              {
                type: MessageComponentTypes.ACTION_ROW,
                components: [
                  {
                    type: MessageComponentTypes.BUTTON,
                    custom_id: "checkout_protocol",
                    label: "Check Out",
                    style: ButtonStyleTypes.PRIMARY,
                  },

                ],
              },
            ],
          },
        })
  }
}
   
//*********************** INTERACTION RESPONSES *************************//

// -----------------------------------
// Handle requests from interactive components
// -----------------------------------
  if (type === InteractionType.MESSAGE_COMPONENT) {
    // custom_id 
    const componentId = data.custom_id;
    // user who clicked button
    const userId = req.body.member.user.id;
    
//CHECK OUT Protocol  
     if (componentId === 'checkout_protocol') {
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: { content: `@here <@${userId}> checked out.` },
      }); 
     }
    
//CHECK IN Protocol
 if (componentId === 'checkin_protocol') {
//variable to hold all values selected from menu
 var checkinvalues = "";
   //find maximum number of values selected
   var max = data.values.length;
   //use loop to add the variables into a string with a ", and" between the last two values
   for (var i=0; i<max; i++)
     {
       checkinvalues += data.values[i];
       if (max > 1 && i < (max-2)){checkinvalues += ", ";}
       if (i === (max-2)){ checkinvalues += ", and ";}
     }
      console.log(req.body);

      // Send results
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: { content: `@here <@${userId}> checked in: ${checkinvalues}` },
      });
    }
  }
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

//-----------------------------------------------------
app.listen(PORT, () => {
  console.log("Listening on port", PORT);

  // Check if guild commands are installed (if not, install them)
  HasGuildCommands(process.env.APP_ID, process.env.GUILD_ID, [
    DECIDER_COMMAND,
    CHECK_IN_COMMAND,
    CHECK_OUT_COMMAND,
    LEARN_COMMAND,
    PROPOSAL_COMMAND,
  ]);
});
