var focusMinutes = 25;
var focusSeconds = 0;
var break1Minutes = 15;
var break1Seconds = 0;
var break2Minutes = 5;
var break2Seconds = 0;

var x;
function startCounter() {
    // todo: troubleshoot why i'm losing the first second--fixed when updated interval to 250, is that bad?
    document.getElementById('startbtn').disabled = true;
    document.getElementById('pausebtn').disabled = false;
    document.getElementById('resetbtn').disabled = false;

    const targetDate = new Date().getTime() + (60000 * (document.getElementById('minutes').innerHTML)) + (1000 * (document.getElementById('seconds').innerHTML));

    clearInterval(x);
    x = setInterval(function() {
        const distance = targetDate - new Date().getTime();

        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("minutes").innerHTML = String(minutes).padStart(2, '0');
        document.getElementById("seconds").innerHTML = String(seconds).padStart(2, '0');

        if (distance <= 0) {
            clearInterval(x);
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
    // alert(btn.id);
    if (btn.id == "focus"){
        document.getElementById("minutes").innerHTML = String(focusMinutes).padStart(2,'0');
        document.getElementById("seconds").innerHTML = String(focusSeconds).padStart(2,'0');
    }
    else if (btn.id == "break1"){
        document.getElementById("minutes").innerHTML = String(break1Minutes).padStart(2,'0');
        document.getElementById("seconds").innerHTML = String(break1Seconds).padStart(2,'0');
    }
    else if (btn.id == "break2"){
        document.getElementById("minutes").innerHTML = String(break2Minutes).padStart(2,'0');
        document.getElementById("seconds").innerHTML = String(break2Seconds).padStart(2,'0');
    }
}

function makeTimeEditable(element) {
    // todo: only allow editing when timer is not counting down
    // todo: save new time as reset
    // todo: why does setting a 3-digit minute not work when hitting start?
    // todo: only allow numbers to be inputted
    // todo: default to 00 if left empty? or do not change? for min do not change, for seconds default 0??
    element.contentEditable = true;
    element.focus();
    element.onblur = function(){
        // console.log(element.textContent);
        var timerType = document.getElementsByClassName("selectedTab")[0].id;
        // var inputType = element.id;
        if (timerType=="focus") {
            focusMinutes = document.getElementById("minutes").innerHTML;
            focusSeconds = document.getElementById("seconds").innerHTML;
        }
        else if (timerType=="break1") {
            break1Minutes = document.getElementById("minutes").innerHTML;
            break1Seconds = document.getElementById("seconds").innerHTML;
        }
        else if (timerType=="break2") {
            break2Minutes = document.getElementById("minutes").innerHTML;
            break2Seconds = document.getElementById("seconds").innerHTML;
        }

    };
    //todo: only do this if there is a change made
    document.getElementById('startbtn').disabled = false;
    document.getElementById('pausebtn').disabled = true;
    document.getElementById('resetbtn').disabled = true;
}