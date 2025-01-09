// src/components/IframeResizer.tsx
import { ReactNode, useEffect, useRef } from "react";

interface IframeResizerProps {
  children: ReactNode;
}

const IframeResizer: React.FC<IframeResizerProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const sendSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const height = Math.ceil(rect.height);

        console.log("Sending height:", height); // Debug log

        window.parent.postMessage(
          {
            type: "resize",
            id: "testimonial-frame",
            height: height,
          },
          "*"
        );
      }
    };

    // Handle incoming messages
    const handleMessage = (event: MessageEvent) => {
      const data =
        typeof event.data === "string" ? JSON.parse(event.data) : event.data;
      console.log("Received message in iframe:", data); // Debug log

      if (data.type === "handshake") {
        sendSize();
      }
    };

    window.addEventListener("message", handleMessage);

    // Create ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      resizeTimeoutRef.current = setTimeout(sendSize, 50);
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
      resizeObserver.observe(document.body);
    }

    // Initial size calculation
    setTimeout(sendSize, 100);

    // Cleanup
    return () => {
      if (containerRef.current) {
        resizeObserver.disconnect();
      }
      window.removeEventListener("message", handleMessage);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "auto",
        minHeight: "100px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
};

export default IframeResizer;
