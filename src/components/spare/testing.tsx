// "use client";

// import { useEffect, useState, useRef } from "react";
// import { motion, useScroll, useTransform, useSpring } from "framer-motion";
// import {
//   Card,
//   CardHeader,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { Star, Heart } from "lucide-react";
// import { isValidColor } from "../IsValidColor";

// import { testimonials } from "../../data/testimonialData";
// import twitter from "../assets/images/twitter_logo.png";
// import linkedIn from "../assets/images/linkedIn_logo.png";
// import product from "../assets/images/ProductHunt_logo.png";

// export default function TestimonialGrid() {
//   const [isDarkTheme, setIsDarkTheme] = useState(false);
//   const [textColor, setTextColor] = useState("");
//   const [starColor, setStarColor] = useState("");
//   const [backgroundColor, setBackgroundColor] = useState("");
//   const [cardBackgroundColor, setCardBackgroundColor] = useState("");
//   const [tagColor, setTagColor] = useState("");
//   const [tagTextColor, setTagTextColor] = useState("");
//   const [borderRadius, setBorderRadius] = useState("");
//   const [radius, setRadius] = useState("");
//   const [shadowColor, setShadowColor] = useState("");
//   const [columns, setColumns] = useState(4);
//   const [speed, setSpeed] = useState(25);

//   const containerRef = useRef(null);
//   const { scrollY } = useScroll({ container: containerRef });
//   const y = useTransform(scrollY, [0, 1], [0, -1]);
//   const y2 = useSpring(y, { stiffness: 100, damping: 30, restDelta: 0.001 });

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     setIsDarkTheme(urlParams.get("theme") === "dark");
//     setTextColor(urlParams.get("text") || "");
//     setStarColor(urlParams.get("star") || "");
//     setCardBackgroundColor(urlParams.get("cardBackground") || "");
//     setTagColor(urlParams.get("tag") || "");
//     setTagTextColor(urlParams.get("tagText") || "");
//     setShadowColor(urlParams.get("shadow") || "");
//     setBorderRadius(urlParams.get("cardBorderRadius") || "");
//     setRadius(urlParams.get("radius") || "");
//     setBackgroundColor(urlParams.get("background") || "");

//     const columnParam = urlParams.get("columns");
//     if (columnParam) {
//       const columnCount = parseInt(columnParam);
//       if (columnCount === 2 || columnCount === 3 || columnCount === 4) {
//         setColumns(columnCount);
//       }
//     }

//     const speedParam = urlParams.get("speed");
//     if (speedParam === "low") setSpeed(50);
//     else if (speedParam === "medium") setSpeed(35);
//     else if (speedParam === "high") setSpeed(25);
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

//   return (
//     <div
//       className="relative overflow-hidden h-screen"
//       style={{
//         borderRadius: containerRadius,
//         background: isValidColor(backgroundColor)
//           ? `#${backgroundColor}`
//           : "transparent",
//       }}
//     >
//       <div
//         className="absolute top-0 left-0 right-0 h-16 opacity-70 z-20"
//         style={{
//           background: isValidColor(shadowColor)
//             ? `linear-gradient(#${shadowColor}, transparent)`
//             : "",
//         }}
//       />
//       <div
//         className="absolute bottom-0 left-0 right-0 h-16 opacity-70 z-20"
//         style={{
//           background: isValidColor(shadowColor)
//             ? `linear-gradient(transparent, #${shadowColor})`
//             : "",
//         }}
//       />
//       <div
//         ref={containerRef}
//         className="h-full overflow-y-scroll overflow-x-hidden"
//       >
//         <motion.div
//           className={`grid gap-6 p-4 auto-rows-auto`}
//           transition={{ duration: speed, ease: "linear" }}
//           style={{
//             y: y2,
//             gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
//           }}
//         >
//           {[...testimonials, ...testimonials, ...testimonials].map(
//             (testimonial, index) => (
//               <Card
//                 key={`${testimonial.item}-${index}`}
//                 className={`border border-gray-200 ${
//                   !isValidColor(cardBackgroundColor) && isDarkTheme
//                     ? "bg-gray-800"
//                     : !isValidColor(cardBackgroundColor) && !isDarkTheme
//                     ? "bg-white"
//                     : ""
//                 } ${
//                   !isValidColor(textColor) && isDarkTheme
//                     ? "text-white"
//                     : !isValidColor(textColor) && !isDarkTheme
//                     ? "text-black"
//                     : ""
//                 } ${
//                   testimonial.image || testimonial.video
//                     ? "md:row-span-2"
//                     : "md:row-span-1"
//                 }`}
//                 style={{
//                   backgroundColor: isValidColor(cardBackgroundColor)
//                     ? `#${cardBackgroundColor}`
//                     : undefined,
//                   color: isValidColor(textColor) ? `#${textColor}` : undefined,
//                   borderRadius: cardBorderRad,
//                 }}
//               >
//                 <CardHeader className="flex flex-row justify-between items-start py-0 pt-4 pb-2">
//                   <div className="flex flex-row items-center gap-2">
//                     {testimonial.avatar && (
//                       <div className="w-10 h-10 overflow-hidden rounded-full">
//                         <img
//                           src={testimonial.avatar}
//                           alt={`${testimonial.author}'s avatar`}
//                           width={40}
//                           height={40}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                     )}
//                     <div className={`text-sm flex flex-col`}>
//                       <strong>{testimonial.author}</strong>
//                       {testimonial.role && (
//                         <span className="text-opacity-90">
//                           {testimonial.role}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                   {testimonial.importedFrom && (
//                     <div className="w-7 h-7 overflow-hidden rounded-full">
//                       {testimonial.importedFrom === "Twitter" ? (
//                         <img
//                           src={twitter}
//                           alt="Twitter"
//                           className="w-full h-full object-cover"
//                         />
//                       ) : testimonial.importedFrom === "LinkedIn" ? (
//                         <img
//                           src={linkedIn}
//                           alt="LinkedIn"
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <img
//                           src={product}
//                           alt="Product Hunt"
//                           className="w-full h-full object-cover"
//                         />
//                       )}
//                     </div>
//                   )}
//                 </CardHeader>

//                 <CardContent className="p-2 px-4 flex flex-col gap-2 justify-center">
//                   {testimonial.star && (
//                     <div className="flex">
//                       {Array.from({ length: testimonial.star }).map((_, i) => (
//                         <Star
//                           key={i}
//                           style={{
//                             fill: isValidColor(starColor)
//                               ? `#${starColor}`
//                               : "#71D4FE",
//                           }}
//                           color="none"
//                         />
//                       ))}
//                     </div>
//                   )}
//                   {testimonial.content && <p>"{testimonial.content}"</p>}
//                   {testimonial.image && (
//                     <img
//                       src={testimonial.image}
//                       alt="Testimonial image"
//                       width={500}
//                       height={300}
//                       className="w-full h-auto mt-2"
//                     />
//                   )}
//                   {testimonial.video && (
//                     <video
//                       controls
//                       src={testimonial.video}
//                       className="w-full h-auto pt-6"
//                     />
//                   )}
//                 </CardContent>
//                 <CardFooter className="flex justify-between p-0 py-2 pb-4 px-4">
//                   {testimonial.tags && testimonial.tags.length > 0 && (
//                     <div className="flex gap-1">
//                       {testimonial.tags.map((tag) => (
//                         <span
//                           key={tag}
//                           className="px-3 py-1 rounded-full text-[14px] flex items-center"
//                           style={{
//                             backgroundColor: isValidColor(tagColor)
//                               ? `#${tagColor}`
//                               : "#C2F19D",
//                             color: isValidColor(tagTextColor)
//                               ? `#${tagTextColor}`
//                               : "black",
//                           }}
//                         >
//                           {tag}
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                   {testimonial.liked && (
//                     <Heart className="w-5 h-5 fill-red-500 stroke-red-500" />
//                   )}
//                 </CardFooter>
//               </Card>
//             )
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// }
