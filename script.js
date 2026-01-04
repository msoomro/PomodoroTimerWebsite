var minutes = 25;
var seconds = 0;
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
            document.getElementById('time').innerHTML="00:00";
            alert("Your timer has ended!")
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
    document.getElementById('minutes').innerHTML = "25";
    document.getElementById('seconds').innerHTML = "00";
    clearInterval(x);
}