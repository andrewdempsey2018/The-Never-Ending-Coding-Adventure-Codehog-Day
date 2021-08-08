$(document).ready(function () {
    /* Copied Code */ // This is attached to the bottom section also labeled copied code
                    // source: https://github.com/chadselph/jquery-typewriter
    // $('#text').typewrite({
    //     'callback': function(){
    //         $('.demo').css('background-color','red');
    //     },
    //     'delay': 100

    // });
    /* Copied Code */
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
            if ($('#input').val() === "good") {
                nextScreen();
            }
            if ($('#input').val() === "bad"){
                sleepScreen();
            }
        }
        if (count === 2) {
            if ($('#input').val() === "yes") {
                nextScreen();
                }
            if ($('#input').val() === "no") {
                sleepScreen();
                }
            }
        if(count === 4){
            if($('#input').val() === "tea"){
                nextScreen();
            }
            if($('#input').val() === 'coffee'){
                nextScreen();
            }
            if($('#input').val() === 'whiskey'){
                whiskey = true;
                nextScreen();
            }
        }
        if(count === 10){
            theCode = $('#input').val();
            endGame();
        }
        }
    );
});

function textChanger() {
    if (count === 1) {
        //$('#text').text('How did you sleep? make a choice');
        txt = 'How did you sleep? make a choice: good; bad';
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
        $('#i-2').addClass('d-block');
        $('#e-5').css('display', 'none');
    }
    if (count === 4) {
        // $('#text').text('Tea? Coffee? Whiskey?....');
        txt = 'Tea? Coffee? Whiskey?....';
        $('#input').prop("disabled", false);
        resetTyper();
    }
    if (count === 5) {
        // $('#text').text('Whiskey it is!');
        if(whiskey){
            txt = 'Whiskey it is!';
        } else{
            txt = "That's a sensible choice!";
        }
        $('#input').prop("disabled", true);
        resetTyper();
    }
    if (count === 6) {
        // $('#text').text('30 seconds later...');
        txt = '30 seconds later...';
        resetTyper();
    }
    if (count === 7) {
        if(whiskey){
            txt = '*cough*';
        } else{
            txt = 'ahh, I feel more energized and ready to get some work done!'
        }
        resetTyper();
    }
    if (count === 8) {
        if(whiskey){
            txt = 'Work to start time...';
        } else{
            txt = 'Time to start working!';
        }
        resetTyper();
        $('#image').attr("src", "assets/media/office.png");;
        $('#breakout').css('display', 'none')
        $('#bird').css('display', 'block')
        $('#i-3').addClass('d-block');
        $('#e-4').css('display', 'none');
        $('#h-5, #h-4, #h-3').css('display', 'none');
    }
    if (count === 9) {
        txt = 'Let me just get ready...';
        resetTyper();
    }
    if (count === 10) {
        if(whiskey){
            txt = 'ZzZzZzZzZzZz';
            sleepScreen();
        } else {
            txt = "Let's see you write some code!"
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

function resetTyper(){
    document.getElementById('text').innerHTML = "";
    i = 0;
}

function sleepScreen(){
    setTimeout(function () {
        setTimeout(function () {
            document.location.href = "index.html"
        }, 5000);
        $('#sleeping').css('display', 'block');
        $('.textbox-container').addClass('d-none');
    }, 2000)
}

function nextScreen(){
    count++;
    textChanger();
    typeWriter();
}

function endGame(){
    window.alert('Great!\nYou have successfully managed to stay away from distractions\nand stay sober to write your code!\nHere it is:\n' + theCode);
    setTimeout(function () {
        document.location.href = "index.html"
    }, 3000);
}

/* Copied Code */
// (function ( $ ) {
//     $.fn.typewrite = function ( options ) {
//         var settings = {
//             'selector': this,
//             'extra_char': '',
//             'delay':    100,
//             'trim':     false,
//             'callback': null
//         };
//         if (options) $.extend(settings, options);

//         function type_next_element(index) {
//             var current_element = $(settings.selector[index]);
//             var final_text = current_element.text();
//             if (settings.trim) final_text = $.trim(final_text);
//             current_element.html("").show();

//             function type_next_character(element, i) {
//                 element.html( final_text.substr(0, i)+settings.extra_char );
//                 if (final_text.length >= i) {
//                     setTimeout(function() {
//                         type_next_character(element, i+1);
//                     }, settings.delay);
//                 }
//                 else {
//                     if (++index < settings.selector.length) {
//                         type_next_element(index);
//                     }
//                     else if (settings.callback) settings.callback();
//                 }
//             }
//             type_next_character(current_element, 0);
//         }
//         type_next_element(0);

//         return this;
//     };
// })(jQuery);
/* Copied Code */
