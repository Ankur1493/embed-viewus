function WallOfLove() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full h-full px-4 py-8">
        <iframe
          src="http://localhost:5173/w/embed-testimonials/carousal?height=&animated="
          className="w-full h-full"
          style={{ border: "none" }}
          title="Wall of Love"
        />
      </div>
    </div>
  );
}

export default WallOfLove;
