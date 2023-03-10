// Select the element where you want to add the image
let element = document.querySelector("#accordionRows_feature_div");

// If the element was not found, use a fallback element
if (!element) {
  element = document.querySelector(".rightCol.rightCol-bbcxoverride");
}

// Check if the element was found
if (element) {
  // Create a break element
  const breakElement = document.createElement("br");

  // Add the break element as a child of the element
  element.appendChild(breakElement);

  // Create the image element
  const img = document.createElement("img");

  // Extract the ASIN from the current URL using regular expressions
  const asinRegex = /\/dp\/(B[A-Z0-9]{9})/;
  const asinMatch = window.location.href.match(asinRegex);
  const asin = asinMatch ? asinMatch[1] : "";

  // Set the src of the image using the extracted ASIN
  img.src = `https://graph.keepa.com/pricehistory.png?asin=${asin}&domain=com`;

  // Add a mouseover event listener to the image
  img.addEventListener("mouseover", () => {
    // Set the cursor to a pointer
    img.style.cursor = "pointer";
  });

  // Add a click event listener to the image
  img.addEventListener("click", () => {
    // Open the URL using the extracted ASIN
    window.open(`https://keepa.com/#!product/1-${asin}`, "_blank");
  });

  // Add the image as a child of the element
  element.appendChild(img);
}
