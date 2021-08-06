$(document).ready(function () {
    count = 0;
    console.log(count)
    $('#next').click(function () {
        count++;
        console.log(count)
        textChanger();
    });
    $('input').on("change", function () {
        if ($('#input').val() === "good") {
            count++;
            console.log(count)
            textChanger();
        }
    });
});

function textChanger() {
    if (count === 1) {
        $('#text').text('How did you sleep?');
        $('#input').prop('disabled', false);
        $('#next').prop('disabled', true).text('');
    }
    if (count === 2) {
        $('#text').text('I am glad you slept well. Ready to start work?');
        $('#input').prop("disabled", true);
        $('#input').val("");
        $('#next').prop('disabled', false).text('Next');
    }
    if (count === 3) {
        $('body').css('background', 'url("/assets/media/kitchen.png") no-repeat center center fixed');
        $('#pong').css('display', 'none');
        $('#text').text('What do you want for breakfast?');
    }
    if (count === 4) {
        $('#text').text('Tea? Coffee? Whiskey?....');
    }
    if (count === 5) {
        $('#text').text('Whiskey it is!');
    }
    if (count === 6) {
        $('#text').text('30 seconds later...');
    }
    if (count === 7) {
        $('#text').text('*cough*');
    }
    if (count === 8) {
        $('#text').text('Work to start time...');
    }
    if (count === 9) {
        $('#text').text('Let me just get ready...');
    }
    if (count === 10) {
        $('#text').text('ZzZzZzZzZzZz');
    }
}