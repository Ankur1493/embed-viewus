// import React, { useState, useEffect } from "react";
// import { testimonials } from "../../data/testimonialData";
// import InfiniteMovingCards from "./vertical-moving-cards";
// import { isValidColor } from "../IsValidColor";
// // import TestimonialGrid2 from "./TestimonialGrid2";

// const TestimonialGridUpward: React.FC = () => {
//   const [isDarkTheme, setIsDarkTheme] = useState(false);
//   const [textColor, setTextColor] = useState("");
//   const [shouldAnimate, setShouldAnimate] = useState(false);
//   const [starColor, setStarColor] = useState("");
//   const [cardBackgroundColor, setCardBackgroundColor] = useState("");
//   const [backgroundColor, setBackgroundColor] = useState("");
//   const [tagColor, setTagColor] = useState("");
//   const [tagTextColor, setTagTextColor] = useState("");
//   const [borderRadius, setBorderRadius] = useState("");
//   const [radius, setRadius] = useState("");
//   const [shadowColor, setShadowColor] = useState("");
//   const [speed, setSpeed] = useState("");
//   const [columns, setColumns] = useState(4);

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const theme = urlParams.get("theme");
//     const animated = urlParams.get("animated");
//     const speedParam = urlParams.get("speed");
//     const text = urlParams.get("text");
//     const star = urlParams.get("star");
//     const cardBackground = urlParams.get("cardBackground");
//     const tagColor = urlParams.get("tag");
//     const tagTextColor = urlParams.get("tagText");
//     const cardBorderRadius = urlParams.get("cardBorderRadius");
//     const divRadius = urlParams.get("radius");
//     const shadowColor = urlParams.get("shadow");
//     const background = urlParams.get("background");
//     const columnParam = urlParams.get("columns");

//     if (columnParam) {
//       const columnCount = parseInt(columnParam);
//       if (columnCount === 2 || columnCount === 3 || columnCount === 4) {
//         setColumns(columnCount);
//       }
//     }

//     if (theme === "dark") setIsDarkTheme(true);

//     if (animated === "on") setShouldAnimate(true);

//     if (text) setTextColor(text);

//     if (star) setStarColor(star);

//     if (cardBackground) setCardBackgroundColor(cardBackground);

//     if (tagColor) setTagColor(tagColor);

//     if (tagTextColor) setTagTextColor(tagTextColor);

//     if (shadowColor) setShadowColor(shadowColor);

//     if (cardBorderRadius) setBorderRadius(cardBorderRadius);

//     if (divRadius) setRadius(divRadius);

//     if (speedParam) setSpeed(speedParam);

//     if (shadowColor) setShadowColor(shadowColor);
//     if (background) setBackgroundColor(background);
//   }, []);

//   const cardBorderRad =
//     borderRadius === "low"
//       ? "5px"
//       : borderRadius === "medium"
//       ? "10px"
//       : borderRadius === "high"
//       ? "20px"
//       : "";

//   const containerRadius =
//     radius === "low"
//       ? "5px"
//       : radius === "medium"
//       ? "10px"
//       : radius === "high"
//       ? "20px"
//       : "";

//   let duration: "normal" | "slow" | "fast" | undefined = "slow";
//   if (speed === "medium") {
//     duration = "normal";
//   } else if (speed === "high") {
//     duration = "fast";
//   } else {
//     duration = "slow";
//   }

//   return (
//     <div
//       className={`relative w ${shouldAnimate ? "h-[90vh]" : ""}`}
//       style={{ borderRadius: containerRadius }}
//     >
//       {shouldAnimate ? (
//         <>
//           <div
//             className="absolute top-0 left-0 right-0 h-16 opacity-70 z-20 "
//             style={{
//               background: isValidColor(shadowColor)
//                 ? `linear-gradient(#${shadowColor}, transparent)`
//                 : "",
//             }}
//           ></div>
//           <div
//             className="absolute bottom-0 left-0 right-0 h-16 opacity-70 z-20 "
//             style={{
//               background: isValidColor(shadowColor)
//                 ? `linear-gradient(transparent, #${shadowColor})`
//                 : "",
//             }}
//           ></div>
//           <div
//             className="relative h-[100vh] overflow-y-hidden px-4"
//             style={{
//               width: "100%",
//               borderRadius: containerRadius,
//               background: isValidColor(backgroundColor)
//                 ? `#${backgroundColor}`
//                 : "transparent",
//               display: "grid",
//               gridTemplateColumns: `repeat(${columns}, 1fr)`,
//               gap: "16px",
//             }}
//           >
//             <InfiniteMovingCards
//               items={testimonials}
//               direction="up"
//               speed={duration}
//               cardBackgroundColor={cardBackgroundColor}
//               textColor={textColor}
//               isDarkTheme={isDarkTheme}
//               cardBorderRad={cardBorderRad}
//               starColor={starColor}
//               tagColor={tagColor}
//               tagTextColor={tagTextColor}
//               shadowColor={shadowColor}
//             />
//           </div>
//         </>
//       ) : (
//         <div
//           className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 auto-rows-auto`}
//           style={{
//             borderRadius: containerRadius,
//             background: isValidColor(backgroundColor)
//               ? `#${backgroundColor}`
//               : "transparent",
//             display: "grid",
//             gridTemplateColumns: `repeat(${columns})`,
//             gap: "16px",
//           }}
//         >
//           {/* {[...testimonials, ...testimonials].map((testimonial, index) => (
//             <TestimonialGrid2
//               key={index}
//               index={index}
//               testimonial={testimonial}
//               cardBackgroundColor={cardBackgroundColor}
//               textColor={textColor}
//               isDarkTheme={isDarkTheme}
//               cardBorderRad={cardBorderRad}
//               starColor={starColor}
//               tagColor={tagColor}
//               tagTextColor={tagTextColor}
//             />
//           ))} */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TestimonialGridUpward;
