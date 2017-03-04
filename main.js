$(document).ready(function() {

    $("#song-form").submit(function(event) {
        event.preventDefault();
        var notes = $('#song-notes').val();
        var name = $('#song-name').val()
        $("#song-queue").append(`<li><span class="id1">${name}</span> : <span class="id2 not_visible">${notes}</span></li>`);
        this.reset();
    });

    const onComplete = function() {
        $("#song-queue li").first().remove();
        if ($("#song-queue li").length === 0) {
            $('#play-button').removeClass("animate-pulse");
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
        $('#play-button').addClass("animate-pulse");
        // Add event listener to toggle the animate class 🤔 ?
    });









    $('li').on("mouseenter", function() {
      console.log('hovered');
      // $(this).toggle();
    });

    // let notesString = window.prompt("Gimme a String please");
    // let notes = parseSong("E E E E E E E G C D E");
    // // let a = parseSong("A*1 C#*2 D*4");
    // playSong(notes, 200, onComplete);

    // 1 ✅
    //   user will enter a string of song notes (e.g. "A B*2 C#") into the song form.
    //   submit the form, create a new list item in the Song Queue
    //   append list item
    //   clear the text field contents so that they can easily add more songs.
    // 2 play button clicked ✅
    //   Start playing the top song in the queue.
    //   Remove the top song from the queue.
    //   When the top song is finished playing, repeat with the next top song until there are no songs left to play.
    //   play button slides up to show that we are currently playing.
    //   When the last song is finished playing, slide the Play button back down.
    // 3
    //   on Enqueue Song button click, add the songs name to the list item you created.
    //   queue should now include song names AND the song notes themselves.
    //   When jukebox is playing a song, a message should show on the page saying Now Playing [Song Name]. When there is no song playing, the message should say Enter a song to play
});
