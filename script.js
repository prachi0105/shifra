let btn = document.querySelector('#btn');
let content = document.querySelector('#content');
let voice = document.querySelector('#voice');


const contacts = {
    "mummy": "+918358889498", 
    "shakshi": "+919691233648",   
    "komal": "+917999509700",
    "ragani": "+917354573980",
    "prachi jabalpur": "+917725876123"    
};

let taskList = [];

// Function to speak out text
function speak(text) {
    let textspeak = new SpeechSynthesisUtterance(text);
    textspeak.rate = 1;
    textspeak.pitch = 1;
    textspeak.volume = 1;
    textspeak.lang = "hi-GB";
    window.speechSynthesis.speak(textspeak);
    
}

// Function to greet based on the time of the day
function wisheme() {
    let day = new Date();
    let Hours = day.getHours();
    if (Hours >= 0 && Hours < 12) {
        speak("Good morning, mam!");
    } else if (Hours >= 12 && Hours < 16) {
        speak("Good afternoon, mam!");
    } else {
        speak("Good evening, mam!");
    }
}

// window.addEventListener('load', () => {
//     // Only greet once when the button is clicked for the first time
//     btn.addEventListener('click', () => {
//         if (!greetingSpoken) {
//             wisheme(); // Greet the user
//             greetingSpoken = true; // Set the flag to true after greeting
//         }
//         startSpeechRecognition(); // Start listening after greeting
//     });
// });
window.addEventListener('load', () => {
    wisheme();
});



let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();

recognition.onresult = ((event) => {
    let currentinx = event.resultIndex;
    let transcript = event.results[currentinx][0].transcript;
    content.innerText = transcript;
    takecommand(transcript);
});

btn.addEventListener('click', () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
});

// Main function to handle voice commands
function takecommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";
    let normalizedMessage = message.trim().toLowerCase();

    // Basic Greetings
    if (normalizedMessage.includes("hello") || normalizedMessage.includes("hey")) {
        speak("Hello, how can I help you?");
    } else if (normalizedMessage.includes("who are you")||normalizedMessage.includes("tell me about yourself")|| normalizedMessage.includes("introduce yourself")) {
        speak(" I am Shifra, a virtual assistant created by team shifra.");
    } else if (normalizedMessage.includes("how are you") || normalizedMessage.includes("how r you")) {
        speak("I am doing great, thank you for asking! What about you?");
    } else if (normalizedMessage.includes("what is your name")||normalizedMessage.includes("name")) {
        speak("My name is Shifra, your virtual assistant.");
    }else if (normalizedMessage.includes("open password generator")) {
        speak("opening password generator");
        window.open("https://prachi0105.github.io/PASSWORD-GENERATOR/");
    }

    // WhatsApp Commands (with dynamic contact name extraction)
    else if (normalizedMessage.includes("whatsapp call")) {
        let contactName = normalizedMessage.replace("whatsapp call", "").trim();
        if (contacts[contactName]) {
            speak(`Opening WhatsApp chat with ${contactName}. You can make a call from there.`);
            window.open(`https://wa.me/${contacts[contactName]}`);
        } else {
            speak("Sorry, I couldn't find that contact.");
        }
    } else if (normalizedMessage.includes("whatsapp message")) {
        let contactName = normalizedMessage.replace("whatsapp message", "").trim();
        let messageContent = extractMessage(message);  // Extract message content
        if (contacts[contactName]) {
            if (messageContent) {
                speak(`Sending message to ${contactName}.`);
                window.open(`https://wa.me/${contacts[contactName]}?text=${encodeURIComponent(messageContent)}`);
            } else {
                speak("Please provide a message content.");
            }
        } else {
            speak("Sorry, I couldn't find that contact.");
        }
    } else if (normalizedMessage.includes("whatsapp video call")) {
        let contactName = normalizedMessage.replace("whatsapp video call", "").trim();
        if (contacts[contactName]) {
            speak(`Opening WhatsApp chat with ${contactName}. You can make a video call from there.`);
            window.open(`https://wa.me/${contacts[contactName]}`);
        } else {
            speak("Sorry, I couldn't find that contact.");
        }
    }

    // Phone Call Command: Access Contacts via Phone Call
    else if (normalizedMessage.includes("call")) {
        let contactName = normalizedMessage.replace("call", "").trim();
        if (contacts[contactName]) {
            speak(`Calling ${contactName} now.`);
            window.open(`tel:${contacts[contactName]}`); // This opens the phone call dialer on supported devices
        } else {
            speak("Sorry, I couldn't find that contact's phone number.");
        }
    }

    // Open Websites
    else if (normalizedMessage.includes("open youtube")) {
        speak("Opening YouTube");
        window.open("https://www.youtube.com");
    } else if (normalizedMessage.includes("open google")) {
        speak("Opening Google");
        window.open("https://www.google.co.in/");
    } else if (normalizedMessage.includes("open facebook")) {
        speak("Opening Facebook");
        window.open("https://www.facebook.com/?_rdr");
    } else if (normalizedMessage.includes("open instagram")) {
        speak("Opening Instagram");
        window.open("https://www.instagram.com/accounts/login/?next=%2Flivein.now%2Ftagged%2F&source=profile_tagged_tab");
    } else if (normalizedMessage.includes("open whatsapp")) {
        speak("Opening WhatsApp");
        window.open("whatsapp://");
    } else if (normalizedMessage.includes("open calculator")) {
        speak("Opening calculator");
        window.open("calculator://");
    }else if (normalizedMessage.includes("open Filpkart")) {
        speak("Opening Flipkart.");
        try {
            window.open("https://www.flipkart.com/", "_blank");
        } catch (error) {
            speak("Sorry, I couldn't open Flipkart at the moment.");
        }
    } else if (normalizedMessage.includes("open amazon")) {
        speak("Opening amazon");
        window.open("https://www.amazon.in/?&tag=googhydrabk1-21&ref=pd_sl_5szpgfto9i_e&adgrpid=155259813593&hvpone=&hvptwo=&hvadid=713930225169&hvpos=&hvnetw=g&hvrand=2724562980640777469&hvqmt=e&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9301385&hvtargid=kwd-64107830&hydadcr=14452_2402225&gad_source=1");
    }
    

    // Time and Date
    else if (normalizedMessage.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(time);
    } else if (normalizedMessage.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak(date);
    }

    // Weather Information (using OpenWeather API)
    else if (normalizedMessage.includes("weather")) {
        let location = message.replace("weather in", "").trim();
        getWeather(location || "Jabalpur");
    }

    // Setting a Timer (using setTimeout)
    else if (normalizedMessage.includes("set timer") || normalizedMessage.includes("remind me")) {
        let time = message.match(/\d+/); // Extract time (in minutes) from the command
        if (time) {
            speak(`Setting a reminder for ${time[0]} minutes.`);
            setTimeout(() => {
                speak(`Time's up! You asked me to remind you after ${time[0]} minutes.`);
            }, time[0] * 60000); // Convert minutes to milliseconds
        } else {
            speak("Please specify the time for the reminder in minutes.");
        }
    }

    // Play Music (open YouTube Music or Spotify)
    else if (normalizedMessage.includes("play music") || normalizedMessage.includes("play song")) {
        speak("Opening music for you.");
        window.open("https://www.youtube.com/music");
    }

    // Telling a Joke (using JokeAPI)
    else if (normalizedMessage.includes("tell me a joke")) {
        tellJoke();
    }

    // Searching on Google
    else if (normalizedMessage.includes("search")) {
        speak("Searching for " + normalizedMessage.replace("search", "").trim() + " on Google.");
        window.open(`https://www.google.com/search?q=${normalizedMessage.replace("search", "").trim()}`);
    }

    // Help with Commands
    else if (normalizedMessage.includes("help") || normalizedMessage.includes("commands")) {
        speak("You can say things like: 'open YouTube', 'tell me a joke', 'set a timer', 'whatsapp call', 'weather in [location]', 'news', and more!");
    }

    // News Update
    else if (normalizedMessage.includes("news")) {
        getNews();
    }

    // Currency Conversion
    else if (normalizedMessage.includes("convert currency")) {
        let match = message.match(/(\d+)\s(\w+)\s(to|into)\s(\w+)/);
        if (match) {
            let amount = parseFloat(match[1]);
            let fromCurrency = match[2].toUpperCase();
            let toCurrency = match[4].toUpperCase();
            convertCurrency(fromCurrency, toCurrency, amount);
        } else {
            speak("Please specify the amount and currencies you want to convert, like 'convert 100 USD to INR'.");
        }
    }

    // Task Management (Add, Show tasks)
    else if (normalizedMessage.includes("add task")) {
        let task = message.replace("add task", "").trim();
        if (task) {
            addTask(task);
        } else {
            speak("Please specify a task to add.");
        }
    } else if (normalizedMessage.includes("show task")) {
        showTask();
    }

    else if (normalizedMessage.includes("set alarm")) {
        let time = message.match(/(\d+):(\d+)/); // Extract time in HH:MM format
        if (time) {
            let hours = parseInt(time[1]);
            let minutes = parseInt(time[2]);
            let now = new Date();
            let alarmTime = new Date(now.setHours(hours, minutes, 0));
            
            let timeDiff = alarmTime - new Date();
            if (timeDiff > 0) {
                speak(`Setting alarm for ${hours}:${minutes}.`);
                setTimeout(() => {
                    speak(`Alarm ringing! It's ${hours}:${minutes}.`);
                }, timeDiff);
            } else {
                speak("Please set a future time for the alarm.");
            }
        } else {
            speak("Please specify the time for the alarm in HH:MM format.");
        }
    }
    // Basic calculation logic
function calculate(expression) {
    try {
        let result = eval(expression);
        speak("The result is " + result);
    } catch (error) {
        speak("Sorry, I couldn't compute that.");
    }
}

// Command to activate calculator
if (normalizedMessage.includes("calculate")) {
    let expression = message.replace("calculate", "").trim();
    calculate(expression);
}




    // Directions (Google Maps)
    else if (normalizedMessage.includes("direction")) {
        let location = message.replace("direction to", " ").trim();
        if (location) {
            getDirections(location);
        } else {
            speak("Please specify a location for directions.");
        }
    }
    else if (normalizedMessage.includes("playing")) {
        let song = message.replace("playing ", "").trim();
        speak("playing  " + normalizedMessage.replace("playing", "").trim() + " on youtube.");
        window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(song)}`);
    }
}

// Helper function to extract message content
function extractMessage(message) {
    let messageStartIndex = message.indexOf("message") + "message".length;
        return message.slice(messageStartIndex).trim();
    }
    
    // Fetch Weather Information using OpenWeather API
    async function getWeather(location) {
        try {
            const apikey = "e01c758c84c71a34a8fbf0aa78191537";
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`);
            const data = await response.json();
            let weatherDescription = data.weather[0].description;
            let temp = data.main.temp;
            speak(`The current weather in ${location} is ${weatherDescription} with a temperature of ${temp} degrees Celsius.`);
        } catch (error) {
            speak("Sorry, I couldn't fetch the weather right now.");
        }
    }
    
    // Fetch News Updates using NewsAPI
    async function getNews() {
        try {
            window.open("https://www.youtube.com/@ABPNews");
        } catch (error) {
            speak("Sorry, I couldn't fetch the news right now.");
        }
    }
    
    // Convert Currency
    async function convertCurrency(fromCurrency, toCurrency, amount) {
        try {
            const apiKey = "3ad32678f796cd8d5653549a";
            // https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}
            const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`);
            const data = await response.json();
            if (data.result === "success") {
                let rate = data.conversion_rates[toCurrency];
                let convertedAmount = (rate * amount).toFixed(2);
                speak(`${amount} ${fromCurrency} is equal to ${convertedAmount} ${toCurrency}.`);
            } else {
                speak("Sorry, I couldn't fetch the conversion rates.");
            }
        } catch (error) {
            speak("Sorry, I couldn't fetch the conversion rates.");
        }
    }
    
    // Add Task to list
    function addTask(task) {
        taskList.push(task);
        speak(`Task '${task}' added to your list.`);
    }
    
    // Show Tasks
    function showTask() {
        if (taskList.length > 0) {
            speak("Here are your tasks: " + taskList.join(", "));
        } else {
            speak("Your task list is empty.");
        }
    }
    
    // Get Directions using Google Maps
    function getDirections(location) {
        let url = `https://www.google.com/maps?q=${location}`;
        speak(`Opening Google Maps for directions to ${location}.`);
        window.open(url);
    }
    
    // Telling a Joke (using JokeAPI)
    async function tellJoke() {
        try {
            const response = await fetch("https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single");
            const data = await response.json();
            speak(data.joke);
        } catch (error) {
            speak("Sorry, I couldn't fetch a joke right now.");
        }
    }


