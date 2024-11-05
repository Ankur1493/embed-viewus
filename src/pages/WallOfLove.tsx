function WallOfLove() {
  return (
    <div style={{ height: "100vh", margin: 0 }}>
      <iframe
        src="http://localhost:5173/w/embed-testimonials?theme=dark"
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="yes"
        style={{ border: "none", height: "100vh" }}
      ></iframe>
    </div>
  );
}

export default WallOfLove;
