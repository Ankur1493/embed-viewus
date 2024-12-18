// import { useEffect, useRef } from "react";
// import Masonry from "masonry-layout";
// import { Testimonial } from "@/interface";
// import { useGridItems } from "@/lib/api";
// import TestimonialGridCard from "./TestimonialGridCard";

// interface TestimonialGridProps {
//   testimonials: Testimonial[];
// }

// export const TestimonialGrid2: React.FC<TestimonialGridProps> = ({
//   testimonials,
// }) => {
//   const gridRef = useRef<HTMLDivElement>(null);
//   const { data, isLoading, error } = useGridItems();

//   useEffect(() => {
//     if (gridRef.current && data) {
//       new Masonry(gridRef.current, {
//         itemSelector: ".grid-item",
//         columnWidth: ".grid-sizer",
//         percentPosition: true,
//         gutter: 16,
//       });
//     }
//   }, [data]);

//   if (isLoading) return <div className="text-center py-10">Loading...</div>;
//   if (error)
//     return (
//       <div className="text-center py-10 text-red-500">
//         Error: {error.message}
//       </div>
//     );
//   if (!data) return null;

//   return (
//     <div className="w-full h-full  mx-auto p-4">
//       <div ref={gridRef} className="relative h-full w-full">
//         <div className="grid-sizer w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4" />
//         {testimonials.map((testimonial, _index) => (
//           <TestimonialGridCard index={_index} testimonial={testimonial} />
//         ))}
//       </div>
//     </div>
//   );
// };
