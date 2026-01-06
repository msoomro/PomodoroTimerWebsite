var focusHours = 0;
var focusMinutes = 25;
var focusSeconds = 0;
var break1Hours = 0;
var break1Minutes = 15;
var break1Seconds = 0;
var break2Hours = 0;
var break2Minutes = 5;
var break2Seconds = 0;

var x;
function startCounter() {
    // todo: troubleshoot why i'm losing the first second--fixed when updated interval to 250, is that bad?
    document.getElementById('startbtn').disabled = true;
    document.getElementById('pausebtn').disabled = false;
    document.getElementById('resetbtn').disabled = false;

    const targetDate = new Date().getTime() + (60* 60000 * (document.getElementById('hours').innerHTML)) + (60000 * (document.getElementById('minutes').innerHTML)) + (1000 * (document.getElementById('seconds').innerHTML));

    clearInterval(x);
    x = setInterval(function() {
        const distance = targetDate - new Date().getTime();

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        if (hours > 0) {
            document.getElementById("hours").innerHTML = String(hours).padStart(2, '0');
            document.getElementById("hours").hidden = false;
            document.getElementById("hourcolon").hidden = false;

        }
        else {
            document.getElementById("hours").innerHTML = String(hours).padStart(2, '0');
            document.getElementById("hours").hidden = true;
            document.getElementById("hourcolon").hidden = true;
        }
        document.getElementById("minutes").innerHTML = String(minutes).padStart(2, '0');
        document.getElementById("seconds").innerHTML = String(seconds).padStart(2, '0');

        if (distance <= 0) {
            clearInterval(x);
            document.getElementById("hours").innerHTML = String(0).padStart(2,'0');
            document.getElementById("minutes").innerHTML = String(0).padStart(2,'0');
            document.getElementById("seconds").innerHTML = String(0).padStart(2,'0');
            alert("Your timer has ended!")
            
            document.getElementById('startbtn').disabled = true;
            document.getElementById('pausebtn').disabled = true;
            document.getElementById('resetbtn').disabled = false;
        }
    }, 250);
}

function pauseCounter() {
    document.getElementById('startbtn').disabled = false;
    document.getElementById('pausebtn').disabled = true;
    clearInterval(x);
}

function resetCounter() { //not working after timer goes to 0
    document.getElementById('startbtn').disabled = false;
    document.getElementById('pausebtn').disabled = true;
    document.getElementById('resetbtn').disabled = true;
    
    clearInterval(x);
    updateTime();
}

function toggleCountdownType(btn) {
    document.getElementById(btn.id).className = "selectedTab";
    
    if (btn.id != "focus"){
        document.getElementById("focus").className = "unselectedTab";
    }
    if (btn.id != "break1"){
        document.getElementById("break1").className = "unselectedTab";
    }
    if (btn.id != "break2"){
        document.getElementById("break2").className = "unselectedTab";
    }

    updateTime();
}

function updateTime() {
    var btn = document.getElementsByClassName("selectedTab")[0];
    
    if (btn.id == "focus"){
        document.getElementById("hours").innerHTML = String(focusHours).padStart(2,'0');
        document.getElementById("minutes").innerHTML = String(focusMinutes).padStart(2,'0');
        document.getElementById("seconds").innerHTML = String(focusSeconds).padStart(2,'0');
    }
    else if (btn.id == "break1"){
        document.getElementById("hours").innerHTML = String(break1Hours).padStart(2,'0');
        document.getElementById("minutes").innerHTML = String(break1Minutes).padStart(2,'0');
        document.getElementById("seconds").innerHTML = String(break1Seconds).padStart(2,'0');
    }
    else if (btn.id == "break2"){
        document.getElementById("hours").innerHTML = String(break2Hours).padStart(2,'0');
        document.getElementById("minutes").innerHTML = String(break2Minutes).padStart(2,'0');
        document.getElementById("seconds").innerHTML = String(break2Seconds).padStart(2,'0');
    }
}

function makeTimeEditable(element) {
    // todo: only allow editing when timer is not counting down?
    // todo: only allow numbers to be inputted --> need to change span to input... eh
    // todo: default to 00 if left empty? or do not change? for min do not change, for seconds default 0??
    element.contentEditable = true;
    element.focus();
    element.onblur = function() {
        
        var timerType = document.getElementsByClassName("selectedTab")[0].id;
        
        if (timerType=="focus") {
            focusHours = document.getElementById("hours").innerHTML;
            focusMinutes = document.getElementById("minutes").innerHTML;
            focusSeconds = document.getElementById("seconds").innerHTML;
        }
        else if (timerType=="break1") {
            break1Hours = document.getElementById("hours").innerHTML;
            break1Minutes = document.getElementById("minutes").innerHTML;
            break1Seconds = document.getElementById("seconds").innerHTML;
        }
        else if (timerType=="break2") {
            break2Hours = document.getElementById("hours").innerHTML;
            break2Minutes = document.getElementById("minutes").innerHTML;
            break2Seconds = document.getElementById("seconds").innerHTML;
        }

    };
    //todo: only do this if there is a change made
    document.getElementById('startbtn').disabled = false;
    document.getElementById('pausebtn').disabled = true;
    document.getElementById('resetbtn').disabled = true;
}