const track = document.getElementById("image-track");
let isScaled = false; // Add this line to keep track of whether the image is scaled up or not

const handleOnDown = e => {
  track.dataset.mouseDownAt = e.clientX;
  
  if (isScaled) { // Add this block to scale down the image when the mouse is clicked
    for(const image of track.getElementsByClassName("image")) {
      image.animate({
        objectPosition: `${100}% center`,
        objectFit: 'none', // Reset objectFit
        height: 'auto', // Reset height
        width: 'auto' // Reset width
      }, { duration: 1200, fill: "forwards" });
    }
    isScaled = false;
  }
};

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
  
  // Add code to center the image
  const nextPercentage = 0;
  track.dataset.percentage = nextPercentage;
  
  if (!isScaled) { // Add this block to scale up the image when the mouse is released
    for(const image of track.getElementsByClassName("image")) {
      image.animate({
        objectPosition: `${100 + nextPercentage}% center`,
        objectFit: 'cover', // Add this line to make the image fill the full screen
        height: '100%', // Add this line to make the image fill the full screen
        width: '100%' // Add this line to make the image fill the full screen
      }, { duration: 1200, fill: "forwards" });
    }
    isScaled = true;
  }
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}

window.onmousedown = e => handleOnDown(e);
window.ontouchstart = e => handleOnDown(e.touches[0]);
window.onmouseup = e => handleOnUp(e);
window.ontouchend = e => handleOnUp(e.touches[0]);
window.onmousemove = e => handleOnMove(e);
window.ontouchmove = e => handleOnMove(e.touches[0]);
