
//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

console.log('next');

$(".next").click(function(){
    console.log('next');
    if(animating) return false;
    animating = true;

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    //activate next step on progressbar using the index of next_fs
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate({opacity: 0}, {
        step: function(now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale current_fs down to 80%
            scale = 1 - (1 - now) * 0.2;
            //2. bring next_fs from the right(50%)
            left = (now * 50)+"%";
            //3. increase opacity of next_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({
                'transform': 'scale('+scale+')',
                'position': 'absolute'
            });
            next_fs.css({'left': left, 'opacity': opacity});
        },
        duration: 800,
        complete: function(){
            current_fs.hide();
            animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });
});

$(".registered").click(function(){

    console.log('test');
    if(animating) return false;
    animating = true;

    current_fs = $(this).parent();
    next_fs = $(this).parent().next().next().next().next();
    console.log('next_fs', next_fs);

    //activate next step on progressbar using the index of next_fs
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate({opacity: 0}, {
        step: function(now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale current_fs down to 80%
            scale = 1 - (1 - now) * 0.2;
            //2. bring next_fs from the right(50%)
            left = (now * 50)+"%";
            //3. increase opacity of next_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({
                'transform': 'scale('+scale+')',
                'position': 'absolute'
            });
            next_fs.css({'left': left, 'opacity': opacity});
        },
        duration: 800,
        complete: function(){
            current_fs.hide();
            animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });
});

$(".previous").click(function(){
    if(animating) return false;
    animating = true;

    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    //de-activate current step on progressbar
    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

    //show the previous fieldset
    previous_fs.show();
    //hide the current fieldset with style
    current_fs.animate({opacity: 0}, {
        step: function(now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale previous_fs from 80% to 100%
            scale = 0.8 + (1 - now) * 0.2;
            //2. take current_fs to the right(50%) - from 0%
            left = ((1-now) * 50)+"%";
            //3. increase opacity of previous_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({'left': left});
            previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
        },
        duration: 800,
        complete: function(){
            current_fs.hide();
            animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });
});

$(".submit-btn").click(function(){
    // const url = 'url'
    //
    var form = $('#msform');

    console.log('form', form.serialize());

    return false;

    // $.ajax({
    //     type: "POST",
    //     url: url,
    //     data: form.serialize(), // serializes the form's elements.
    //     success: function(data)
    //     {
    //         alert(data); // show response from the php script.
    //     }
    // });


})

$(document).ready(function() {
    let feedTypeValue;
    let quantityValue;
    let weightValue;

    $(".submit").prop('disabled', true);

    var data = [
        {
            "id": 0,
            "text": "Asana",
            "description": "Test feed for a dog",
            "price": {
                "1": 112,
                "3.5": 406,
                "12": 1200,
                "45": 2600
            }
        },
        {
            "id": 1,
            "text": "Asana 2",
            "description": "Test feed for a dog",
            "price": {
                "1": 112,
                "3.5": 406,
                "12": 1200,
                "45": 2600
            }
        },
        {
            "id": 2,
            "text": "Asana bibi",
            "description": "Test feed for a dog",
            "price": {
                "1": 112,
                "3.5": 406,
                "12": 1200,
                "45": 2600
            }
        },
        {
            "id": 3,
            "text": "Asana3 test",
            "description": "Test feed for a dog",
            "price": {
                "1": 112,
                "3.5": 406,
                "12": 1200,
                "45": 2600
            }
        },
        {
            id: 4,
            "texts": "Asana best",
            "description": "Test feed for a dog",
            "price": {
                "1": 112,
                "3.5": 224,
                "12": 335,
                "45": 1200
            }
        }
    ];

    let feed = $('.js-example-basic-single').select2({
        data: data
    });

    let weight = $('.js-weight').select2({
        dropdownCssClass: 'select2-container-custom',
        minimumResultsForSearch: Infinity
    });

    feed.on('select2:select', function (e) {
        feedTypeValue = data[this.value];
        console.log(feedTypeValue);
        resolvePrice(feedTypeValue, quantityValue, weightValue);
    });


    $('#quantity').blur(function(e) {
        quantityValue = this.value;
        console.log(quantityValue);
        resolvePrice(feedTypeValue, quantityValue, weightValue);
    });

    weight.on('select2:select', function (e) {
        weightValue = this.value;
        console.log(weightValue);
        resolvePrice(feedTypeValue, quantityValue, weightValue);
    });
});

function resolvePrice(feedTypeValue, quantityValue, weightValue) {
    if (feedTypeValue && quantityValue && weightValue) {
        $("#price").val(quantityValue * feedTypeValue.price[weightValue])
    } else {
        $("#price").val(0)
    }
}


$('#phone').blur(function(e) {
    if (validatePhone('phone')) {
        $('#spnPhoneStatus').html('Valid');
        $('#spnPhoneStatus').css('color', 'green');
    }
    else {
        $('#spnPhoneStatus').html('Invalid');
        $('#spnPhoneStatus').css('color', 'red');
    }
});



function validatePhone(txtPhone) {
    var a = document.getElementById(txtPhone).value;

    var filter = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
    if (filter.test(a)) {
        $(".submit").prop('disabled', false);
        return true;
    } else {
        $(".submit").prop('disabled', true);
        return false;
    }
}