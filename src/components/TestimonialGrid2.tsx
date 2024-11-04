import React, { useState, useEffect } from "react";
import { testimonials } from "../data/testimonialData";
import twitter from "../assets/images/twitter_logo.png";
import linkedIn from "../assets/images/linkedIn_logo.png";
import product from "../assets/images/ProductHunt_logo.png";
import star from "../assets/images/star_selected.png";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";

const TestimonialGrid2: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const theme = urlParams.get("theme");
    if (theme === "dark") {
      setIsDarkTheme(true);
    }
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 auto-rows-auto">
      {testimonials.map((testimonial) => (
        <Card
          key={testimonial.item}
          className={`border border-gray-200 ${
            isDarkTheme ? "bg-gray-800 text-white" : "bg-white text-black"
          } ${
            testimonial.image || testimonial.video
              ? "md:row-span-3"
              : "md:row-span-1"
          }`}
        >
          <CardHeader className="flex flex-row justify-between items-start py-0 pt-4 pb-2">
            <div className="flex flex-row items-center gap-2">
              {testimonial.avatar && (
                <div className="w-10 h-10 overflow-hidden rounded-full">
                  <img
                    src={testimonial.avatar}
                    alt={`${testimonial.author}'s avatar`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div
                className={`text-sm ${
                  isDarkTheme ? "text-white" : "text-gray-600"
                } flex flex-col`}
              >
                <strong>{testimonial.author}</strong>
                {testimonial.role && (
                  <span className={`${isDarkTheme ? "text-gray-200" : ""}`}>
                    {testimonial.role}
                  </span>
                )}
              </div>
            </div>
            {testimonial.importedFrom && (
              <div className="w-7 h-7 overflow-hidden rounded-full">
                {testimonial.importedFrom === "Twitter" ? (
                  <img
                    src={twitter}
                    alt="Twitter"
                    className="w-full h-full object-cover"
                  />
                ) : testimonial.importedFrom === "LinkedIn" ? (
                  <img
                    src={linkedIn}
                    alt="LinkedIn"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={product}
                    alt="Product Hunt"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            )}
          </CardHeader>

          <CardContent className="p-2 px-4 flex flex-col gap-2 justify-center">
            {testimonial.star && (
              <div className="flex">
                {Array.from({ length: testimonial.star }).map((_, index) => (
                  <img
                    key={index}
                    src={star}
                    alt="Star"
                    className="w-7 h-6 mt-2"
                  />
                ))}
              </div>
            )}
            {testimonial.content && (
              <p
                className={`${isDarkTheme ? "text-gray-200" : "text-gray-800"}`}
              >
                "{testimonial.content}"
              </p>
            )}
            {testimonial.image && (
              <img
                src={testimonial.image}
                alt="Testimonial"
                className="w-full h-auto mt-2"
              />
            )}
            {testimonial.video && (
              <video
                controls
                src={testimonial.video}
                className="w-full h-auto pt-6"
              />
            )}
          </CardContent>
          {testimonial.tags && testimonial.tags.length > 0 && (
            <CardFooter className="flex gap-1 p-0 py-2 pb-4 px-4">
              {testimonial.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-[#C2F19D] text-black rounded-full text-[14px] flex items-center"
                >
                  {tag}
                </span>
              ))}
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  );
};

export default TestimonialGrid2;
