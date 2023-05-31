//*********************** BASIC FUNCTIONALITY *************************//
import { capitalize, DiscordRequest } from "./utils.js";
export async function HasGuildCommands(appId, guildId, commands) {  if (guildId === "" || appId === "") return;commands.forEach((c) => HasGuildCommand(appId, guildId, c));}
// Checks for a command
async function HasGuildCommand(appId, guildId, command) {
  // API endpoint to get and post guild commands
  const endpoint = `applications/${appId}/guilds/${guildId}/commands`;
  try { const res = await DiscordRequest(endpoint, { method: "GET" }); const data = await res.json();
    if (data) {const installedNames = data.map((c) => c["name"]);
      if (!installedNames.includes(command["name"])) {
        console.log(`Installing "${command["name"]}"`);
        InstallGuildCommand(appId, guildId, command);
      } else { console.log(`"${command["name"]}" command already installed`);}}} catch (err) {console.error(err);}
}
// Command installation
export async function InstallGuildCommand(appId, guildId, command) {
  // API endpoint to get and post guild commands
  const endpoint = `applications/${appId}/guilds/${guildId}/commands`;
  // install command
  try {await DiscordRequest(endpoint, { method: "POST", body: command });} catch (err) {console.error(err);}}


//*********************** CUSTOM CODE *************************//

// -----------------------------------
// Core Protocols
// -----------------------------------

export const DECIDER_COMMAND = {
  name: "decider",
  description: "Decider: Immediately and unanimously move your team towards results",
  type: 1,
};
export const PROPOSAL_COMMAND = {
  name: "propose",
  description: "Decider: Immediately and unanimously move your team towards results",
  type: 1,
};

export const CHECK_IN_COMMAND = {
  name: "checkin",
  description: "Check In: Disclose emotional state and confirm you are adhering to the Core Commitments.",
  type: 1,
};

export const CHECK_OUT_COMMAND = {
  name: "checkout",
  description: "Check Out: Check Out when you are aware that you cannot maintain the Core Commitments.",
  type: 1,
};


// -----------------------------------
// Support (links to learn more)
// -----------------------------------

export const LEARN_COMMAND = {
  name: "learn",
  description: "Learn tools for high performance teamwork.",
  type: 1,
};
