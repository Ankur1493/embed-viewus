import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Quote, Star } from "lucide-react";
import { isValidColor } from "../IsValidColor";
import twitter from "@/assets/images/twitter_logo.png";
import linkedIn from "@/assets/images/linkedIn_logo.png";
import product from "@/assets/images/ProductHunt_logo.png";
import { Testimonial } from "@/interface";
import { cn } from "@/lib/utils";
// import { VideoPlayer } from "../VideoPlayer";

interface TestimonialCardProps {
  index: number;
  testimonial: Testimonial;
  cardBackgroundColor?: string;
  textColor?: string;
  isDarkTheme?: boolean;
  cardBorderRad?: string;
  starColor?: string;
  tagColor?: string;
  tagTextColor?: string;
  cardHeight?: string;
  imageBackground?: string;
  quoteColor?: string;
  cardBorderColor?: string;
  cardWidth?: string;
}

const TestimonialCardLong: React.FC<TestimonialCardProps> = ({
  index,
  testimonial,
  cardBackgroundColor = "",
  textColor = "",
  isDarkTheme = false,
  cardBorderRad = "",
  starColor = "#71D4FE",
  imageBackground = "#71D4FE",
  tagColor = "#C2F19D",
  quoteColor = "",
  tagTextColor = "black",
  cardBorderColor = "",
}) => {
  // const hasMediaContent = () => {
  //   return (
  //     (testimonial.reviewType === 1 &&
  //       testimonial.review &&
  //       !testimonial.review.includes("content")) ||
  //     (testimonial.reviewType === 2 &&
  //       ((testimonial.importedVideo &&
  //         testimonial.importedVideo[0] !== "" &&
  //         testimonial.importedVideo.length > 0) ||
  //         (testimonial.importedImage && testimonial.importedImage.length > 0)))
  //   );
  // };

  return (
    <Card
      key={`${testimonial._id}-${index}`}
      className={cn(
        "relative border flex flex-row  shadow transition-all h-full w-full max-w-xs md:max-w-2xl py-2 mx-auto",
        !isValidColor(cardBackgroundColor) && isDarkTheme
          ? "bg-gray-800"
          : !isValidColor(cardBackgroundColor) && !isDarkTheme
          ? "bg-white"
          : "",
        !isValidColor(textColor) && isDarkTheme
          ? "text-white"
          : !isValidColor(textColor) && !isDarkTheme
          ? "text-black"
          : "",
        testimonial.tags && testimonial.tags.length > 0
          ? "pb-10 mdpb-8"
          : "pb-4"
      )}
      style={{
        backgroundColor: isValidColor(cardBackgroundColor)
          ? `#${cardBackgroundColor}`
          : undefined,
        color: isValidColor(textColor) ? `#${textColor}` : undefined,
        borderRadius: cardBorderRad,
        borderColor: isValidColor(cardBorderColor)
          ? `#${cardBorderColor}`
          : "transparent",
      }}
    >
      <div
        // className={
        //   (cn("flex flex-col w-full "),
        //   (testimonial.importedImage &&
        //     testimonial.importedImage?.length > 0) ||
        //   (testimonial.importedVideo && testimonial.importedVideo?.length > 0)
        //     ? "basis-3/5"
        //     : "")
        // }
        className="w-full"
      >
        <CardHeader className="flex flex-row justify-between items-start py-0 pt-4 pb-2">
          <div className="flex flex-row items-center gap-2">
            <div
              className="w-6 h-6 md:w-10 md:h-10 overflow-hidden rounded-full flex items-center justify-center bg-[#71D4FE]"
              style={{
                backgroundColor: isValidColor(imageBackground)
                  ? `#${imageBackground}`
                  : "#71D4FE",
              }}
            >
              {testimonial.image ? (
                <img
                  src={
                    testimonial.image.startsWith("http")
                      ? testimonial.image
                      : `https://d3eyp937ijscg0.cloudfront.net/${testimonial.image}`
                  }
                  alt={testimonial.firstName.charAt(0)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{testimonial.firstName.charAt(0)}</span>
              )}
            </div>
            <div className={`text-sm flex flex-col`}>
              <strong>{testimonial.firstName}</strong>
              {testimonial.jobTitle && testimonial.company ? (
                <span className="text-xs text-opacity-90">
                  {testimonial.jobTitle} at {testimonial.company}
                </span>
              ) : testimonial.jobTitle ? (
                <span className="text-xs text-opacity-90">
                  {testimonial.jobTitle}
                </span>
              ) : (
                testimonial.company && (
                  <span className="text-xs text-opacity-90">
                    {testimonial.company}
                  </span>
                )
              )}
            </div>
          </div>
          {testimonial.reviewType === 2 && (
            <div className="w-8 h-8 overflow-hidden rounded-full">
              <img
                src={
                  testimonial.importedReviewType === 0
                    ? twitter
                    : testimonial.importedReviewType === 1
                    ? linkedIn
                    : product
                }
                alt="imported"
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </CardHeader>
        <CardContent
          // className={cn(
          //   (testimonial.importedImage &&
          //     testimonial.importedImage?.length > 0) ||
          //     (testimonial.importedVideo &&
          //       testimonial.importedVideo?.length > 0)
          //     ? "w-96"
          //     : "w-full"
          // )}
          className="w-full"
        >
          {testimonial.stars && (
            <div className="flex">
              {Array.from({ length: testimonial.stars }).map((_, i) => (
                <Star
                  key={i}
                  style={{
                    fill: isValidColor(starColor) ? `#${starColor}` : "#71D4FE",
                  }}
                  color="none"
                  className="w-4 h-4 md:w-6 md:h-6"
                />
              ))}
            </div>
          )}
          {testimonial.reviewType !== 1 && testimonial.review && (
            <p className="text-xs md:text-sm z-50 bg-white">
              "{testimonial.review}"
            </p>
          )}
        </CardContent>

        <CardFooter className="absolute bottom-2 flex justify-start items-start flex-col gap-2 p-0 py-2 pb-4 px-4">
          {testimonial.tags && testimonial.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4">
              {testimonial.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-2 py-1 text-xs font-medium z-10"
                  style={{
                    backgroundColor: isValidColor(tagColor)
                      ? `#${tagColor}`
                      : "#C2F19D",
                    color: isValidColor(tagTextColor)
                      ? `#${tagTextColor}`
                      : "black",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </CardFooter>
      </div>
      {/* {hasMediaContent() && (
        <CardContent
          className={
            "p-0 basis-2/5 border-l  flex min-w-xl flex-col gap-2 justify-center"
          }
        >
          {testimonial.reviewType === 1 && (
            <VideoPlayer videoLink={testimonial.review!} />
          )}

          {testimonial.reviewType === 2 &&
            (testimonial.importedVideo &&
            testimonial.importedVideo[0] !== "" &&
            testimonial.importedVideo.length > 0 ? (
              <div className="w-full h-full rounded-xl overflow-hidden flex items-start">
                <video
                  controls
                  src={testimonial.importedVideo}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            ) : testimonial.importedImage &&
              testimonial.importedImage.length > 0 ? (
              <div className="w-full h-full rounded-xl overflow-hidden">
                <img
                  src={testimonial.importedImage}
                  alt="Image"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            ) : null)}
        </CardContent>
      )} */}
      <Quote
        className={cn(
          "absolute bottom-0 right-6 w-20 h-20  transform -translate-x-2 -translate-y-2 "
        )}
        style={{
          color:
            quoteColor === "none"
              ? "transparent"
              : isValidColor(quoteColor)
              ? `#${quoteColor}`
              : "#D1D5DB",
        }}
      />
    </Card>
  );
};

export default TestimonialCardLong;
