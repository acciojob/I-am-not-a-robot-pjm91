//your code here
document.addEventListener("DOMContentLoaded", function() {
  const images = document.querySelectorAll('img');
  const resetButton = document.getElementById('reset');
  const verifyButton = document.getElementById('verify');
  const para = document.getElementById('para');
  let clickedImages = [];
  let isVerified = false;

  // Randomize images
  randomizeImages();

  // Event listener for image clicks
  images.forEach(img => {
    img.addEventListener('click', function() {
      if (clickedImages.length < 2 && !clickedImages.includes(img)) {
        clickedImages.push(img);
        img.style.opacity = "0.6"; // Mark the clicked image (optional visual feedback)

        // Show reset button when at least one image is clicked
        resetButton.style.display = 'inline-block';

        // If two images are clicked, show the verify button
        if (clickedImages.length === 2) {
          verifyButton.style.display = 'inline-block';
        }
      }
    });
  });

  // Event listener for the reset button
  resetButton.addEventListener('click', function() {
    clickedImages = [];
    images.forEach(img => {
      img.style.opacity = "1"; // Reset image opacity
    });
    para.style.display = 'none';
    verifyButton.style.display = 'none';
    resetButton.style.display = 'none';
    document.getElementById('h').textContent = 'Please click on the identical tiles to verify that you are not a robot.';
  });

  // Event listener for the verify button
  verifyButton.addEventListener('click', function() {
    const [firstImage, secondImage] = clickedImages;
    
    if (firstImage.src === secondImage.src) {
      para.textContent = 'You are a human. Congratulations!';
    } else {
      para.textContent = 'We can\'t verify you as a human. You selected the non-identical tiles.';
    }

    para.style.display = 'block';
    verifyButton.style.display = 'none'; // Hide verify button after verification
  });

  // Function to randomize the images
  function randomizeImages() {
    const container = document.querySelector('.image-container');
    let imagesArr = Array.from(container.children);
    imagesArr.sort(() => Math.random() - 0.5); // Shuffle images
    imagesArr.forEach(img => container.appendChild(img)); // Reattach shuffled images
  }
});
