const app = () => {
    const sound = document.querySelector("#sound");
    const video = document.querySelector("#video");
    const outline = document.querySelector("#countdown-moving-icon circle");
    const play = document.querySelector("#play-icon");
    const themeSelector = document.querySelectorAll("#theme-section img");
    const timeDisplay = document.querySelector("#minutes-countdown");
    const outlineLength = outline.getTotalLength();
    const timeSelector = document.querySelectorAll("#minutes-section .btn");

    // Minutes Duration
    let minutesDuration = 60;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    // Play button
    play.addEventListener("click", () => {
        checkPlaying(sound);
    });

    // Check if song is playing
    const checkPlaying = sound => {
        if (sound.paused) {
            sound.play();
            video.play();
            play.src = "svg/pause.svg";
        } else {
            sound.pause();
            video.pause();
            play.src = "svg/play.svg";
        }
    };

    // While sound is playing
    sound.addEventListener("timeupdate", () => {
        let currentTime = sound.currentTime;
        let elapsed = minutesDuration - currentTime;
        let minutes = Math.floor(elapsed / 60);
        let seconds = Math.floor(elapsed % 60);
        let progress = outlineLength - (currentTime / minutesDuration) * outlineLength;

        outline.style.strokeDashoffset = progress;
        timeDisplay.textContent = `${minutes}:${seconds}`;

        if (currentTime >= minutesDuration) {
            sound.pause();
            video.pause();
            play.src = "svg/play.svg";
            sound.currentTime = 0;
        }
    });

    // Select time
    timeSelector.forEach(time => {
        time.addEventListener("click", e => {
            minutesDuration = e.target.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(minutesDuration / 60)}:${Math.floor(minutesDuration % 60)}`;
            sound.pause();
            video.pause();
            play.src = "svg/play.svg";
            sound.currentTime = 0;
        });
    });

    // Check theme
    themeSelector.forEach(theme => {
        theme.addEventListener("click", e => {
            if (e.target.id === "sun-theme") {
                video.src = "video/beach.mp4";
                sound.src = "sounds/beach.mp3";
                play.src = "svg/play.svg";
            } else if (e.target.id === "rain-theme") {
                video.src = "video/rain.mp4";
                sound.src = "sounds/rain.mp3";
                play.src = "svg/play.svg";
            }
        });
    });
};

app();
