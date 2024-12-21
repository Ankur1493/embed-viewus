import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  jobTitle?: string;
  company?: string;
  image?: string;
  stars: number;
  review: string;
  tags?: string[];
}

const TestimonialGridCard2 = ({ testimonial }) => {
  return (
    <Card className="border w-full max-w-md overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
            {testimonial.image ? (
              <img
                src={testimonial.image}
                alt={testimonial.name}
                width={48}
                height={48}
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold">
                {testimonial.name.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <h3 className="font-bold text-lg">{testimonial.name}</h3>
            {(testimonial.jobTitle || testimonial.company) && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {testimonial.jobTitle}{" "}
                {testimonial.company && `at ${testimonial.company}`}
              </p>
            )}
          </div>
        </div>
        <div className="mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`inline-block w-5 h-5 ${
                i < testimonial.stars
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <div className="relative mb-4">
          <Quote className="absolute top-0 left-0 w-8 h-8 text-gray-300 transform -translate-x-2 -translate-y-2" />
          <p className="text-gray-700 dark:text-gray-300 italic pl-6">
            {testimonial.review}
          </p>
        </div>
        {testimonial.tags && (
          <div className="flex flex-wrap gap-2">
            {testimonial.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TestimonialGridCard2;
