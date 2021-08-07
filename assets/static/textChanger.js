$(document).ready(function () {
    /* Copied Code */
    // $('#text').typewrite({
    //     'callback': function(){
    //         $('.demo').css('background-color','red');
    //     },
    //     'delay': 100

    // });
    /* Copied Code */
    count = 0;
    console.log(count)
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
        $('#text').text('ZzZzZzZzZzZz');
    }
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
