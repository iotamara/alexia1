// Import alexia and create new app
const alexia = require('alexia');
const app = alexia.createApp("Alexia1");

/*
 * Register HelloIntent with one utterance: `Hello`
 * and static responseText: `Hello from Alexia app`
 */

app.intent('HelloIntent', 'Hello', () => {
    return 'Hello from Alexia app';
});

app.intent('SlotsIntent', 'My name is {myname:Person} and I am {age:Number} years old', (slots) => {
    if(slots.age) {
        return `Hello ${slots.myname}, you are ${slots.age} years old`;
    } else {
        return 'I did not hear what you said';
    }
});

app.intent('ToanIntent', 'Toan\'s daughter', () => {
    return 'How is your daughter doing today?';
});

app.intent('AzizIntent', 'Aziz\'s project', () => {
    return 'How is your project going?';
});

app.intent('MattIntent', 'Matt\'s design thinking', () => {
    return 'Do you like studying Design Thinking?';
});

app.intent('LilyIntent', 'Lily\'s party', () => {
    return 'Did you have fun at the party on Friday?';
});

app.intent('DomenicIntent', 'Domenic\'s shoes', () => {
    return 'Where did you get your cool shoes?';
});

// Create http server and start it
app.createServer().start(() => {
    // Once started, save speechAssets into directory
    app.saveSpeechAssets();
console.log('Server started');
});
