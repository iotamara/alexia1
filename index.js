// Import alexia and create new app
const alexia = require('alexia');
const app = alexia.createApp("Alexia1");

/*
 * Register HelloIntent with one utterance: `Hello`
 * and static responseText: `Hello from Alexia app`
 */

const jsonSME = {

    "smes" : [
        {
            "name" : "John Fremont",
            "expertise" : "AI"
        },
        {
            "name" : "Erik Pupo",
            "expertise" : "Block Chain"
        }
    ]
};

const jsonProject = {

    "projects" : [
        {
            "name" : "PSEG",
            "date" : "April 20, 2017",
            "venue" : "Board Room",
            "owner" : "Lily",
            "numAttendees" : "12 to 15"
        },
        {
            "name" : "The Hartford",
            "date" : "March 31, 2017",
            "venue" : "The Garage",
            "owner" : "Matt",
            "numAttendees" : "15 to 25"
        }
    ]
};

app.intent('HelloIntent', 'Hello', () => {
    return 'Hello from Alexia app';
});

app.intent('LookUpIntent', 'I am {myname:Person}', (slots) => {
    if(slots.age) {
        return `${slots.myname} is a nice name`;
    } else {
        return 'I did not hear what you said, please repeat ';
    }
});

app.intent('SlotsIntent', 'My name is {myname:Person} and I am {age:Number} years old', (slots) => {
    if(slots.age) {
        return `Hello ${slots.myname}, you are ${slots.age} years old`;
    } else {
        return 'I did not hear what you said, repeat please';
    }
});

app.intent('ToanIntent', 'Toan\'s daughter', () => {
    return 'How is your daughter doing today?';
});


app.intent('MaxIntent', 'Max\'s whereabouts', () => {
    return 'Hi Max, which country are you in today? We miss you!';
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

const intentA = app.intent('intentA', 'clear my calendar for {date:Date}', (slots) => {
    return {
        text: 'Are you sure you want to clear your calendar?',
        attrs: {
            date: slots.date
        },
        end: false
    };
});

// Or use built-in amazon intents. See: `examples/built-in-intents.js`
const intentB = app.intent('intentB', 'yes', (slots, attrs) => {
    // Clear calendar for date `attrs.date` here
    return 'Your calendar has been cleared';
});

app.intent('intentC', 'no', () => {
    return 'Your calendar was not modified';
});

app.action({
    from: '*', // Allow transition from any intent to `intent1`. Use '@start' to allow intent only on start
    to: 'intentA' // Refer to intent by its name or remember its reference. See below
});

app.action({
    from: intentA,
    to: intentB,
    if: (slots, attrs) => attrs.date, // Note: date should be validated here
    fail: (slots, attrs) => 'Sorry, your command is invalid'
});


// Create http server and start it
app.createServer().start(() => {
    // Once started, save speechAssets into directory
    app.saveSpeechAssets();
    app.onStart(() => {
        return 'Welcome, say Start Look Up to get started';
    });
    app.onEnd(() => {
        return 'See you later!';
    });

    console.log('Server started');
});
