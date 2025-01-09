(function (global, document) {
  function embedIframe(selector, options = {}) {
    const iframes = document.querySelectorAll(selector);

    const defaultOptions = {
      log: true,
      checkOrigin: false,
      resizeInterval: 50,
    };

    const config = { ...defaultOptions, ...options };

    iframes.forEach((iframe) => {
      if (config.log) console.log("Embedding iframe:", iframe);

      const resizeIframe = (event) => {
        try {
          const data =
            typeof event.data === "string"
              ? JSON.parse(event.data)
              : event.data;

          if (config.log) console.log("Received message:", data);

          if (data.type === "resize") {
            const newHeight = data.height + 20;
            if (config.log) console.log("Setting new height:", newHeight);
            iframe.style.height = `${newHeight}px`;
            iframe.style.maxHeight = "none";
            if (config.log)
              console.log("Resized iframe:", iframe.id, newHeight);
          }
        } catch (e) {
          if (config.log) console.error("Invalid message data:", event.data);
        }
      };

      window.addEventListener("message", resizeIframe);

      iframe.onload = () => {
        if (config.log) console.log(`Sending handshake to iframe ${iframe.id}`);
        setTimeout(() => {
          iframe.contentWindow.postMessage(
            { type: "handshake", id: iframe.id },
            "*"
          );
        }, 100);
      };
    });
  }

  global.embedIframe = embedIframe;
})(window, document);
