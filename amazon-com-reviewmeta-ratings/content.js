// Select the element where you want to add the container
let element = document.querySelector("#accordionRows_feature_div");

// If the element was not found, use a fallback element
if (!element) {
  element = document.querySelector(".rightCol.rightCol-bbcxoverride");
}

// Check if the element was found
if (element) {
  // Create the ReviewMeta analysis container
  const container = document.createElement("div");
  container.classList.add("reviewmeta-container");
  
  // Extract the ASIN from the current URL using regular expressions
  const asinRegex = /\/dp\/(B[A-Z0-9]{9})/;
  const asinMatch = window.location.href.match(asinRegex);
  const asin = asinMatch ? asinMatch[1] : "";
  
  // Fetch the ReviewMeta rating using the ASIN
  fetch(`https://reviewmeta.com/api/amazon/${asin}`)
    .then(response => response.json())
    .then(data => {
      // Check if the rating is available
      if (data.rating) {
        // Create the ReviewMeta rating element
        const rating = document.createElement("div");
        rating.classList.add("reviewmeta-rating");
  
        // Round the rating to the nearest half star
        const ratingRounded = Math.round(data.rating * 2) / 2;
  
        // Convert the rating to stars
        const fullStars = Math.floor(data.rating);
        const halfStars = ((ratingRounded - fullStars) >= 0.5) ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStars;
  
        // Create the link element
        const link = document.createElement("a");
        link.href = data.href;
        link.target = "_blank";  // This will open the link in a new window
  
        // Set the link text to the rating
        link.innerHTML = `ReviewMeta Rating: <div class="stars">${'<span class="star on"></span>'.repeat(fullStars)}${'<span class="star half"></span>'.repeat(halfStars)}${'<span class="star"></span>'.repeat(emptyStars)}</div> (${data.rating} out of 5)`;
  
        // Add the link to the rating element
        rating.appendChild(link);
  
        // Add the rating to the container
        container.appendChild(rating);
      } else {
        // Create the Fakespot link element
        const link = document.createElement("a");
        link.href = `https://reviewmeta.com/amazon/${asin}`;
        link.target = "_blank";  // This will open the link in a new window
        link.innerHTML = "Analyse on ReviewMeta";
  
        // Add the link to the container
        container.appendChild(link);
      }
    })
    .catch(error => console.error(error));
  
  // Add the container as a child of the element
  element.appendChild(container);
}
