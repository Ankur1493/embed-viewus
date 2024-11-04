import TestimonialGrid1 from "../components/TestimonialGrid1";
import TestimonialGrid2 from "../components/TestimonialGrid2";

function HallOfFame() {
  return (
    <div className="py-10">
      <div className="mx-10">
        <p className="text-xl font-bold underline">TestimonialGrid1</p>
        <TestimonialGrid1 />
      </div>
      <div className="mx-20 py-10">
        <p className="text-xl font-bold underline">TestimonialGrid2</p>
        <TestimonialGrid2 />
      </div>
    </div>
  );
}

export default HallOfFame;
