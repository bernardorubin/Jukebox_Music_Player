$(document).ready(function() {
    var repeat = false;
    $('#repeat-button').click(function() {
        $(this).toggleClass('repeatOn');
        if (repeat) {
            repeat = false;
        } else {
            repeat = true;
        }
    });

    $("#song-form").submit(function(event) {
        event.preventDefault();
        var notes = $('#song-notes').val();
        var name = $('#song-name').val()
        $("#song-queue").append(`<li><span class="class1">${name}</span><span class="class2 not_visible"> : </span><span class="class2 not_visible">${notes}</span><span class="class3 not_visible" style="float:right"><i class="fa fa-trash fa-2x" aria-hidden="true"></i></span><span class="class4 not_visible" style="float:right; margin-right:10px"><i class="fa fa-level-up fa-2x" aria-hidden="true"></i></span></li>`);
        this.reset();
    });
    // document.createElement("div"); 👈 use this!!
    const onComplete = function() {
        if (repeat) {
            $("#song-queue").append($("#song-queue li").first());
        } else {
            $("#played-songs").append($("#song-queue li").first());
        }
        // $("#song-queue li").first().remove();
        if ($("#song-queue li").length === 0) {
            $('#play-button').removeClass("animate-pulse repeatOn");
            $('#play-button').html('<i class="fa fa-play-circle" aria-hidden="true"></i>');
            $('body').css('background-color', `#333333`);
            $('.fa-music').removeClass("animate-pulse black");
            $('.song-name-now').text("Add a Song");
            return
        }
        let music = $("#song-queue li").first().text().split(" : ");
        let notes = parseSong(music[1]);
        $('.song-name-now').text(music[0]);
        playSong(notes, 200, onComplete);
    }

    $('#play-button').click(function() {
        let music = $("#song-queue li").first().text().split(" : ");
        console.log(music);
        let notes = parseSong(music[1]);
        $('.song-name-now').text(music[0]);
        playSong(notes, 200, onComplete);
        $('#play-button').addClass("animate-pulse repeatOn");
        $('#play-button').html('<i class="fa fa-pause-circle" aria-hidden="true"></i>');
        $('.fa-music').addClass("animate-pulse black");
        var color = Math.floor((Math.random() * 655366) + 1);
        console.log(color);
        $('body').css('background-color', `#${color}`);
        // Add event listener to toggle the animate class 🤔 ?
    });

    // $().on("mouseenter", function() {
    //   console.log('hovered');
    //   // $(this).toggle();
    // });
    // http://stackoverflow.com/questions/14950321/how-to-bind-hover-to-dynamically-created-li-elemtent
    // WHY DOESN'T THIS WORK? 👇
    // $('li').mouseenter(function() {
    //     console.log("hello");
    //     // only targets original html, not appended elements
    // })

    // para hacer hover en el dyamically created element en lugar de document.body podemos seleccionar cualquier parent element de #song-queue li

    $(document.body).on("mouseenter", "#song-queue li", function() {
        // hover starts code here
        console.log(this); //DOM element
        console.log($(this)); //object
        $(this).children('.class2').addClass('visible_now');
        $(this).children('.class2').removeClass('not_visible');

    });

    $(document.body).on("mouseleave", "#song-queue li", function() {
        $(this).children('.class2').addClass('not_visible');
        $(this).children('.class2').removeClass('visible_now');
    });

    $('body').keyup(function(event) {
        if (event.keyCode == 32) {
            console.log('space');
            $('#play-button').click();
        }
    });

    $('#song-form').keyup(function(event) {
        event.stopPropagation();
    });

    $('#delete-button').on('click', function() {
        $("#played-songs").children().remove();
    })
    $('#play-again').on('click', function() {
        $("#song-queue").append($("#played-songs").children());
    })

    $(document.body).on("mouseenter", "#played-songs li", function() {
        // Why are these different 👇
        console.log(this); //DOM element
        console.log($(this)); //object
        $(this).children('.class3, .class2, .class4').addClass('visible_now');
        $(this).children('.class3, .class2, .class4').removeClass('not_visible');
    });

    $(document.body).on("mouseleave", "#played-songs li", function() {
        $(this).children('.class3, .class2, .class4').addClass('not_visible');
        $(this).children('.class3, .class2, .class4').removeClass('visible_now');

    });

    $(document.body).on('click', '.class3', function() {
        $(this).parent().remove();
    });
    $(document.body).on('click', '.class4', function() {
        $("#song-queue").append($(this).parent());
    });

    // Missing Stretches >>
    // clicking it will pause the queue and turn it into a Play All button again.

});

// Would this work? 👇
// $(document.body).on(function() {
//   $('li').on("mouseenter", function() {
//      console.log('hovered');
//   });
// });
