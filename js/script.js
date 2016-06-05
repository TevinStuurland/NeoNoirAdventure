//Hulp gekregen met performance/best practices van Rick Lancee github.com/ricklancee
//Variables
var inventory = [];
var story = [];
var i;
var storyContainer = document.querySelector('.story');


var inputContainer = document.querySelector('.input-field');
var inputField = inputContainer.querySelector('input');
var nameField = document.querySelector(".result");
var allAppear = document.querySelectorAll('.appear, .appear-2, .appear-3, .clock');
var dayofWeek = document.querySelector('.dayoftheweek');
var timeofday = document.querySelector('.timeoftheday');
var messageofday = document.querySelector('.messageofday');
var timeClock = document.querySelector('.clock');
var inventoryOpenClose = document.querySelector('.inventory');
var inventoryCard = inventoryOpenClose.querySelector('.inventory-text');

var items = {
    knife: {
        name: "Knife:",
        description: "a small knife"
    },
    test: {
        name: "test:",
        description: "a simple test"
    }
};

function createInventory(){
    var count = inventory.length;
    for (var i = 0; i < count; i++) {
        inventoryCard.innerHTML += inventory[i].name + " " + inventory[i].description + '<br> <br>';
    }
};


//Dit creëert de scenario's
var storyScenario = {
    scenario1: {
        text: "test"
    },
    scenario2: {
        text: "test 2"
    }
};

function createStory(){
    var count = story.length;
    for (var i = 0; i < count; i++) {
        storyContainer.innerHTML += story[i].text + '<br> <br>';
    }
};




//voegt een klok toe Bron: http://www.w3schools.com/js/tryit.asp?filename=tryjs_timing_clock
function startTime(){
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    timeClock.innerHTML =
    h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
};
function checkTime(i){
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
};

//Laat teksten verschijnen
function makeAppear(){
    var arrayLength = allAppear.length;
    for (var i = 0; i < arrayLength; i++) {
        allAppear[i].classList.add("opacityAnimation");
    }
};

//Wanneer je op enter drukt saved hij de naam die je hebt gegeven
inputField.addEventListener('keydown', function(saveName) {
    if (saveName.keyCode === 13) {
      var welcomeText = "Ah, that's right. My name is " + inputField.value + " how could I forget that?";
      // Store
      localStorage.setItem("yourName", welcomeText);
      // Retrieve
      nameField.innerHTML = welcomeText;

      inputContainer.classList.add("invisible");

      inventory.push(items.knife); //pickup knife
      story.push(storyScenario.scenario1); //add scenario
    }
});

//Wanneer je i ingedrukt houdt opent de inventory
window.addEventListener('keydown', function(openInventory) {
    if (openInventory.keyCode ===  73) {
     inventoryOpenClose.classList.toggle('show');
    }
});

//Dit zorgt ervoor dat het de huidige dag & tijd pakt Bron: http://www.w3schools.com/jsref/jsref_getday.asp
function introMessage() {
    var d = new Date();
    var weekday = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

    var n = weekday[d.getDay()];
    dayofWeek.innerHTML = n;

    //Dit zorgt ervoor dat het bericht verandert aan de hand van de tijd Bron: http://www.javascriptsource.com/time-date/good-morning-afternoon-and-evening-by-brad-jones-120319202500.html;
    if ( d.getHours() < 12 )
    {
        timeofday.innerHTML = "morning";
        messageofday.innerHTML = "the rays of the sun hit my face. It's a new day, a new crime to solve. But first, what was my name again?";
    }
    else  /* Hour is from noon to 5pm (actually to 5:59 pm) */
    if ( d.getHours() >= 12 && d.getHours() <= 17 )
    {
        timeofday.innerHTML = "afternoon";
        messageofday.innerHTML = "the sky is colored blue with hues of red. It's beautiful... But crime doesn't stop. It never does so I won't either. But first, what was my name again?";
    }
    else  /* the hour is after 5pm, so it is between 6pm and midnight */
    if ( d.getHours() > 17 && d.getHours() <= 24 )
    {
        timeofday.innerHTML = "evening";
        messageofday.innerHTML = "the reflection of the moon hits my face. It's night, crime doesn't sleep and so won't I. But first, what was my name again?";
    }
}

function initialize() {
    createInventory();
    createStory();
    introMessage();
    startTime();
    makeAppear();
}

initialize();