$(document).ready(function () {
    count = 0;
    $('#next').click(function () {
        count++;
        textChanger();
    });
    $('input').on("change", function () {
        if (count === 1) {
            if ($('#input').val() === "good") {
                count++;
                textChanger();
            }}
        if (count === 2) {
            if ($('#input').val() === "yes") {
                    count++;
                    textChanger();
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
        $('#text').text('How did you sleep?');
        $('#input').prop('disabled', false);
        $('#next').prop('disabled', true).text('');
    }
    if (count === 2) {
        $('#text').text('I am glad you slept well. Ready to start work?');
        $('#input').val("");
    }
    if (count === 3) {
        $('#image').attr("src", "assets/media/kitchen.png");;
        $('#pong').css('display', 'none')
        $('#breakout').css('display', 'block')
        $('#text').text('What do you want for breakfast?');
        $('#input').prop("disabled", true);
        $('#input').val("");
        $('#next').prop('disabled', false).text('Next');
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
        $('#image').attr("src", "assets/media/office.png");;
        $('#breakout').css('display', 'none')
        $('#bird').css('display', 'block')
    }
    if (count === 9) {
        $('#text').text('Let me just get ready...');
    }
    if (count === 10) {
        $(document).ready(function () {
            count = 0;
            $('#next').click(function () {
                count++;
                textChanger();
            });
            $('input').on("change", function () {
                if (count === 1) {
                    if ($('#input').val() === "good") {
                        count++;
                        textChanger();
                    }
                    if (count === 2) {
                        if ($('#input').val() === "yes") {
                            count++;
                            textChanger();
                        }
                        if ($('#input').val() === "no") {
                            setTimeout(function () {
                                document.location.href = "index.html";
                            }, 5000);
                            $('#sleeping').addClass('.d-block');
                            $('.textbox-container').addClass('.d-none');
                        }
                    }
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
                $('#input').val("");
            }
            if (count === 3) {
                $('#text').text('What do you want for breakfast?');
                $('#e-5').addClass('.d-none');
                $('#image').attr("src", "assets/media/kitchen.png");
                $('#pong').addClass('.d-none');
                $('#input').prop("disabled", true);
                $('#input').val("");
                $('#next').prop('disabled', false).text('Next');
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
        $('#text').text('ZzZzZzZzZzZz');
    }
}