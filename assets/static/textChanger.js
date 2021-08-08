$(document).ready(function () {
    count = 0;
    i = 0;
    txt = '';
    speed = 100;

    $('#next').click(function () {
        count++;
        textChanger();
        typeWriter();
        
    });

    $('input').on("change", function () {
        if (count === 1) {
            if ($('#input').val() === "good") {
                count++;
                textChanger();
                typeWriter();
            }}
        if (count === 2) {
            if ($('#input').val() === "yes") {
                    count++;
                    textChanger();
                    typeWriter();
                }
            if ($('#input').val() === "no") {
                    setTimeout(function () {
                        document.location.href = "index.html"
                    }, 5000);
                    $('#sleeping').css('display', 'block');
                    $('.textbox-container').addClass('d-none');
                }
            }
        }
    );
});

function textChanger() {
    if (count === 1) {
        //$('#text').text('How did you sleep?');
        txt = 'How did you sleep?';
        resetTyper();
        $('#input').prop('disabled', false);
        $('#next').prop('disabled', true).text('');
    }
    if (count === 2) {
        // $('#text').text('I am glad you slept well. Ready to start work?');
        txt = 'I am glad you slept well. Ready to start work?';
        resetTyper();
        $('#input').val("");
    }
    if (count === 3) {
        // $('#text').text('What do you want for breakfast?');
        txt = 'What do you want for breakfast?';
        resetTyper();
        $('#image').attr("src", "assets/media/kitchen.png");;
        $('#pong').css('display', 'none')
        $('#breakout').css('display', 'block')
        $('#input').prop("disabled", true);
        $('#input').val("");
        $('#next').prop('disabled', false).text('Next');
        $('#i-2').addClass('green');
        $('#e-5').removeClass('yellow');
    }
    if (count === 4) {
        // $('#text').text('Tea? Coffee? Whiskey?....');
        txt = 'Tea? Coffee? Whiskey?....';
        resetTyper();
    }
    if (count === 5) {
        // $('#text').text('Whiskey it is!');
        txt = 'Whiskey it is!';
        resetTyper();
    }
    if (count === 6) {
        // $('#text').text('30 seconds later...');
        txt = '30 seconds later...';
        resetTyper();
    }
    if (count === 7) {
        // $('#text').text('*cough*');
        txt = '*cough*';
        resetTyper();
    }
    if (count === 8) {
        // $('#text').text('Work to start time...');
        txt = 'Work to start time...';
        resetTyper();
        $('#image').attr("src", "assets/media/office.png");;
        $('#breakout').css('display', 'none')
        $('#bird').css('display', 'block')
        $('#i-3').addClass('green');
        $('#e-4').removeClass('yellow');
        $('#h-5, #h-4, #h-3').removeClass('red');
    }
    if (count === 9) {
        // $('#text').text('Let me just get ready...');
        txt = 'Let me just get ready...';
        resetTyper();
    }
    if (count === 10) {
        // $('#text').text('ZzZzZzZzZzZz');
        txt = 'ZzZzZzZzZzZz';
        resetTyper();
        setTimeout(function () {
            setTimeout(function () {
                document.location.href = "index.html"
            }, 5000);
            $('#sleeping').css('display', 'block');
            $('.textbox-container').addClass('d-none');
        }, 2000)
    }
}

function typeWriter() { // source: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_typewriter
    if (i < txt.length) {
        document.getElementById("text").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

function resetTyper(){
    document.getElementById('text').innerHTML = "";
    i = 0;
}