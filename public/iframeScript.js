function loadMyEmbedIframe() {
  // Check if the iframe already exists, if not, create it
  const iframeExists = document.getElementById("my-embed-frame");
  if (!iframeExists) {
    // Create the iframe dynamically
    const iframe = document.createElement("iframe");
    iframe.id = "my-embed-frame";
    iframe.src =
      "http://localhost:5173/?slug=viewus&animated&cardBorderRadius=medium";
    iframe.frameBorder = "0";
    iframe.scrolling = "no";
    iframe.style.border = "none"; // Inline styling for the border
    iframe.width = "100%"; // Make iframe take full width of the container

    // Append iframe to a container div (make sure this container exists in the DOM)
    const container = document.getElementById("iframe-container");
    if (container) {
      container.appendChild(iframe);
    } else {
      console.error("No container found to append the iframe.");
    }
  }
}

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", loadMyEmbedIframe);
