
    var audioElements = []; // Array to store all audio elements
    var currentAudio = null; // Variable to store the currently playing audio

    // Function to initialize the audio elements
    function initializeAudioElements() {
        var audioIds = ['journeyAudio', 'momentAudio', 'giftAudio', 'messageAudio', 'playlistAudio1', 'playlistAudio2', 'playlistAudio3', 'playlistAudio4', 'playlistAudio5', 'playlistAudio6', 'playlistAudio7', 'playlistAudio8', 'playlistAudio9', 'playlistAudio10', 'playlistAudio11', 'playlistAudio12', 'playlistAudio13', 'playlistAudio14', 'playlistAudio15'];

        // Loop through each audio ID and add corresponding audio element to the array
        audioIds.forEach(function(audioId) {
            var audio = document.getElementById(audioId);
            audioElements.push(audio);
        });
    }

    // Function to play audio by ID
    function playAudio(audioId) {
        // Play the selected audio
        var audio = document.getElementById(audioId);

        // If this is a new audio element or it's not currently playing, start playing it
        if (currentAudio !== audio) {
            // Pause the currently playing audio
            if (currentAudio) {
                currentAudio.pause();
            }
            audio.play();
            currentAudio = audio; // Update the currently playing audio
        } else {
            // If the clicked audio is already playing, pause it
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        }
    }

    function scrollRight() {
        var iconContainer = document.querySelector('.icon-container');
        iconContainer.scrollBy({
            left: 100,
            behavior: 'smooth'
        });
    }

    function scrollLeft() {
        var iconContainer = document.querySelector('.icon-container');
        if (iconContainer.scrollLeft !== 0) {
            iconContainer.scrollBy({
                left: -100,
                behavior: 'smooth'
            });
        } else {
            iconContainer.scrollTo({
                left: iconContainer.scrollWidth,
                behavior: 'smooth'
            });
        }
    }

    // Initialize audio elements when the page loads
    window.onload = initializeAudioElements;


    function goBack() {
        window.history.back(); // Go back to the previous page
    }
