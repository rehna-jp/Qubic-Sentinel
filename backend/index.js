require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js'); // Make sure this line matches
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// --- FIX IS HERE: ADD "GuildMessages" ---
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent, 
        GatewayIntentBits.GuildMessages // <--- 🚨 THIS WAS MISSING!
    ]
});

client.once('ready', () => {
    console.log(`✅ Qubic Sentinel is ONLINE as ${client.user.tag}`);
    console.log(`👀 Watching for commands...`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    // Debug: Print what it hears
    console.log(`👂 HEARD: "${message.content}" from ${message.author.tag}`);

    if (message.content === '!verify') {
        const verifyLink = `https://qubic-sentinel.vercel.app/verify?user=${message.author.id}`;
        try {
            await message.reply(`🛡️ **Initiate Protocol:** [Click here to verify](${verifyLink})`);
            console.log("🚀 Reply sent!");
        } catch (error) {
            console.error("❌ Error sending reply:", error);
        }
    }
});

client.login(process.env.DISCORD_TOKEN);

app.get('/', (req, res) => {
    res.json({ status: "online", system: "Qubic Sentinel" });
});

app.listen(PORT, () => {
    console.log(`🌐 API Server running on port ${PORT}`);
});