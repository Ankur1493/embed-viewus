import { useEffect } from "react";

function ResizableIframe() {
  useEffect(() => {
    const handleResize = () => {
      const height = document.body.scrollHeight;
      window.parent.postMessage(
        JSON.stringify({ type: "resize", id: "my-embed-frame", height }),
        "*"
      );
    };

    // Trigger resize on mount
    handleResize();

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Embedded View</h1>
      <p>This is content specifically rendered for embedding in an iframe.</p>
      <p>Resize the window to see the iframe adjust its height dynamically.</p>
    </div>
  );
}

export default ResizableIframe;
