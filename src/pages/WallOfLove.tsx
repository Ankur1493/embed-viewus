function WallOfLove() {
  return (
    <div className="w-full mx-20" style={{ height: "100%", margin: 0 }}>
      <iframe
        src="http://localhost:5173/w/embed-testimonials?animated=on&theme=&speed=high"
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="yes"
        style={{ border: "none", height: "100%" }}
      ></iframe>
    </div>
  );
}

export default WallOfLove;
