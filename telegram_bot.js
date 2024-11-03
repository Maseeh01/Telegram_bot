const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
    console.error("Bot token not found. Please set the TELEGRAM_BOT_TOKEN environment variable.");
    process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

const classSchedule = {
    ComputerNetworks: "Saturday, 7:00 PM - 10:00 PM",
    DAA: "Sunday, 7:00 PM - 10:00 PM",
    DBMS: "Monday, 7:00 PM - 10:00 PM",
    SAD: "Tuesday, 7:00 PM - 10:00 PM",
    leadership: "Wednesday, 5:00 PM - 8:00 PM"
};

// Start command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Welcome to the Class Schedule Bot! 👋\n\nSend me a class name to get its schedule.\nAvailable classes: ${Object.keys(classSchedule).join(', ')}`);
});

// Help command
bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `How to use this bot:\n\n1. Simply send the name of the class\n2. I will reply with the class schedule\n\nAvailable classes: ${Object.keys(classSchedule).join(', ')}`);
});

// Handle class schedule requests
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const className = msg.text.toUpperCase();

    console.log(`Received class name: ${className}`);

    if (classSchedule[className]) {
        bot.sendMessage(chatId, `📚 ${className.charAt(0).toUpperCase() + className.slice(1)} Class:\n⏰ ${classSchedule[className]}`);

    } else {
        bot.sendMessage(chatId, `Sorry, I couldn't find that class. 😕\nAvailable classes: ${Object.keys(classSchedule).join(', ')}`);
        console.log(`Available classes: ${Object.keys(classSchedule)}`);
    }
});

console.log('Bot is running...');

