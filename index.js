// Import alexia and create new app
const alexia = require('alexia');
const app = alexia.createApp();

/*
 * Register HelloIntent with one utterance: `Hello`
 * and static responseText: `Hello from Alexia app`
 */
app.intent('HelloIntent', 'Hello', () => {
    return 'Hello from Alexia app';
});

app.intent('ToanIntent', 'Toan\'s daughter', () => {
    return 'How is your daughter doing?';
});

// Create http server and start it
app.createServer().start(() => {
    // Once started, save speechAssets into directory
    app.saveSpeechAssets();
console.log('Server started');
});