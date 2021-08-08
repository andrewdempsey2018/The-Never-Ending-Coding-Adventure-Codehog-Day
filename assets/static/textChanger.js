String.prototype.crosscheck = function () {
    return this.toUpperCase().trim();
};

$(document).ready(function () {
    count = 0;
    i = 0;
    txt = '';
    speed = 100;
    whiskey = false;
    theCode = '';
    $('#next').click(function () {
        nextScreen();

    });

    $('input').on("change", function () {
        if (count === 1) {
            if ($('#input').val().crosscheck() === "good".crosscheck()) {
                nextScreen();
            }
            if ($('#input').val().crosscheck() === "bad".crosscheck()) {
                txt = 'Back to bed!';
                resetTyper();
                sleepScreen();
            }
        }
        if (count === 2) {
            if ($('#input').val().crosscheck() === "yes".crosscheck()) {
                nextScreen();
            }
            if ($('#input').val().crosscheck() === "no".crosscheck()) {
                                txt = 'Back to bed!';
                resetTyper();
                sleepScreen();
            }
        }
        if (count === 4) {
            if ($('#input').val().crosscheck() === "tea".crosscheck()) {
                nextScreen();
            }
            if ($('#input').val().crosscheck() === "coffee".crosscheck()) {
                nextScreen();
            }
            if ($('#input').val().crosscheck() === "whiskey".crosscheck()) {
                whiskey = true;
                nextScreen();
            }
        }
        if (count === 10) {
            theCode = $('#input').val();
            endGame();
        }
    }
    );
});

function textChanger() {
    if (count === 1) {
        txt = 'How did you sleep? Was it a "good" or "bad" nights rest?';
        resetTyper();
        $('#input').prop('disabled', false);
        $('#next').prop('disabled', true).text('');
    }
    if (count === 2) {
        txt = 'I am glad you slept well. Ready to start work?';
        resetTyper();
        $('#input').val("");
    }
    if (count === 3) {
        txt = 'You need something to get your day started. What do you want to perk yourself up?';
        resetTyper();
        $('#image').attr("src", "assets/media/kitchen.png");
        $('#pong').css('display', 'none');
        $('#breakout').css('display', 'block');
        $('#input').prop("disabled", true);
        $('#input').val("");
        $('#next').prop('disabled', false).text('Next');
        $('#i-2').addClass('green');
        $('#h-5').removeClass('red');
        $('#e-5').removeClass('yellow');
    }
    if (count === 4) {
        txt = 'Tea? Coffee? Whiskey?....';
        $('#input').prop("disabled", false);
        $('#next').prop('disabled', true).text('');
        resetTyper();
    }
    if (count === 5) {
        if (whiskey) {
            txt = 'Whiskey it is!';
        } else {
            txt = "That's a sensible choice!";
        }
        $('#input').prop("disabled", true);
        $('#input').val("");
        $('#next').prop('disabled', false).text('Next');
        resetTyper();
    }
    if (count === 6) {
        txt = '*30 seconds later...*';
        resetTyper();
    }
    if (count === 7) {
        if (whiskey) {
            txt = '*cough cough*';
            $('#i-3').addClass('green');
            $('#h-4').removeClass('red');
            $('#e-4').removeClass('yellow');
        } else {
            txt = 'Ahh, I feel more energized and ready to get some work done!';
            $('#i-2').removeClass('green');
            $('#h-5').addClass('red');
            $('#e-5').addClass('yellow');
        }
        resetTyper();
    }
    if (count === 8) {
        if (whiskey) {
            txt = 'Work to start time...';
            $('#i-4').addClass('green');
        } else {
            txt = 'Time to start working!';
        }
        resetTyper();
        $('#image').attr("src", "assets/media/office.png");
        $('#breakout').css('display', 'none');
        $('#bird').css('display', 'block');
    }
    if (count === 9) {
        txt = 'Let me just get ready...';
        resetTyper();
    }
    if (count === 10) {
        if (whiskey) {
            txt = 'ZzZzZzZzZzZz';
            sleepScreen();
        } else {
            txt = "Let's see you write some code!";
        }
        $('#input').prop("disabled", false);
        resetTyper();

    }
}

function typeWriter() { // source: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_typewriter
    if (i < txt.length) {
        document.getElementById("text").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

function resetTyper() {
    document.getElementById('text').innerHTML = "";
    i = 0;
}

function sleepScreen() {
    setTimeout(function () {
        setTimeout(function () {
            document.location.href = "index.html";
        }, 5000);
        $('#image').css('display', 'none');
        $('#sleeping').css('display', 'block');
        $('.textbox-container').addClass('d-none');
    }, 2000);
}

function nextScreen() {
    count++;
    textChanger();
    typeWriter();
}

function endGame() {
    if (theCode === "Patrik rules") {
        window.alert('Yeah, that guy sure is awesome!');
    } else {
        window.alert('Great!\nYou have successfully managed to stay away from distractions\nand stay sober to write your code!\nHere it is:\n' + theCode);
    }
    setTimeout(function () {
        document.location.href = "index.html";
    }, 3000);
}