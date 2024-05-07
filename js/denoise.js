document.addEventListener("DOMContentLoaded", function () {
  const videoUrl =
    "videos/viralme_stevejobs.mp4";

  const videoElement = document.createElement("video");
  videoElement.className = "denoise-video";
  videoElement.src = videoUrl;
  videoElement.controls = false;
  videoElement.loop = true;
  videoElement.muted = true; // Mute the video to allow autoplay
  videoElement.autoplay = true; // Attempt to autoplay the video

  const originalAudioElement = new Audio(
    "videos/viralme_original_audio.mp3"
  );
  const denoisedAudioElement = new Audio(
    "videos/viralme_original_audio.mp3"
  );

  originalAudioElement.muted = true; // Mute the original audio
  denoisedAudioElement.muted = true; // Mute the denoised audio

  const videoDenoiseDiv = document.querySelector(".video-denoise");
  videoDenoiseDiv.appendChild(videoElement);

  // Function to synchronize audio with video
// Function to synchronize audio with video
let lastSyncTime = 0;
function syncAudioWithVideo() {
    const syncThreshold = 0.5; // Only sync if difference is more than 0.5 seconds

    // Calculate the time difference between the video and the audio
    const timeDifferenceOriginal = Math.abs(videoElement.currentTime - originalAudioElement.currentTime);
    const timeDifferenceDenoised = Math.abs(videoElement.currentTime - denoisedAudioElement.currentTime);

    // Sync original audio if the difference exceeds the threshold
    if (timeDifferenceOriginal > syncThreshold) {
        originalAudioElement.currentTime = videoElement.currentTime;
        lastSyncTime = videoElement.currentTime;
    }

    // Sync denoised audio if the difference exceeds the threshold
    if (timeDifferenceDenoised > syncThreshold) {
        denoisedAudioElement.currentTime = videoElement.currentTime;
        lastSyncTime = videoElement.currentTime;
    }
}

  // Click event to toggle mute state when video is clicked
  videoElement.addEventListener("click", function () {
    // Check which tab is active
    const isDenoisedAudioActive = document.querySelector("#tab1").checked;

    // Ensure the video stays muted
    videoElement.muted = true;

    if (isDenoisedAudioActive) {
      // If the Denoised Audio tab is active, toggle its mute state and ensure the Original Audio is muted
      denoisedAudioElement.muted = !denoisedAudioElement.muted;
      originalAudioElement.muted = true;
    } else {
      // If the Original Audio tab is active, toggle its mute state and ensure the Denoised Audio is muted
      originalAudioElement.muted = !originalAudioElement.muted;
      denoisedAudioElement.muted = true;
    }

    // If the active audio is now unmuted, play it
    if (!denoisedAudioElement.muted) {
      denoisedAudioElement.play();
    }
    if (!originalAudioElement.muted) {
      originalAudioElement.play();
    }
  });

  // Event listener for video pause to pause audio
  videoElement.addEventListener("pause", function () {
    originalAudioElement.pause();
    denoisedAudioElement.pause();
  });

  // Event listener for video time update to synchronize audio
  videoElement.addEventListener("timeupdate", syncAudioWithVideo);

  // Event listener for tab change
  document.querySelectorAll(".tab").forEach(function (tab) {
    tab.addEventListener("change", function () {
      if (this.id === "tab1") {
        originalAudioElement.muted = true;
        denoisedAudioElement.muted = false;
        denoisedAudioElement.play();
        syncAudioWithVideo();
      } else if (this.id === "tab2") {
        denoisedAudioElement.muted = true;
        originalAudioElement.muted = false;
        originalAudioElement.play();
        syncAudioWithVideo();
      }
    });
  });
});
