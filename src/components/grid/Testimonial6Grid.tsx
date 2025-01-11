import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUpRight, Star } from "lucide-react";
import { Testimonial } from "@/interface";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { isValidColor } from "../IsValidColor";

interface TestimonialGridProps {
  testimonials: Testimonial[];
}

export default function Testimonial6Grid({
  testimonials,
}: TestimonialGridProps) {
  const [themeState, setThemeState] = useState({
    isDarkTheme: false,
    textColor: "",
    starColor: "",
    cardBackgroundColor: "",
    tagColor: "",
    tagTextColor: "",
    cardBorderRadius: "",
    slug: "",
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const paramValues = {
      theme: urlParams.get("theme"),
      text: urlParams.get("text"),
      star: urlParams.get("star"),
      cardBackground: urlParams.get("cardBackground"),
      tagColor: urlParams.get("tag"),
      tagTextColor: urlParams.get("tagText"),
      cardBorderRadius: urlParams.get("cardBorderRadius"),
      slug: urlParams.get("slug"),
    };

    setThemeState((prevState) => {
      return {
        ...prevState,
        ...(paramValues.theme === "dark" && { isDarkTheme: true }),
        ...(paramValues.text && { textColor: paramValues.text }),
        ...(paramValues.star && { starColor: paramValues.star }),
        ...(paramValues.cardBackground && {
          cardBackgroundColor: paramValues.cardBackground,
        }),
        ...(paramValues.tagColor && { tagColor: paramValues.tagColor }),
        ...(paramValues.tagTextColor && {
          tagTextColor: paramValues.tagTextColor,
        }),
        ...(paramValues.cardBorderRadius && {
          cardBorderRadius: paramValues.cardBorderRadius,
        }),
        ...(paramValues.slug && { slug: paramValues.slug }),
      };
    });
  }, []);

  const cardBorderRad =
    themeState.cardBorderRadius === "low"
      ? "5px"
      : themeState.cardBorderRadius === "medium"
      ? "10px"
      : themeState.cardBorderRadius === "high"
      ? "20px"
      : "";

  const featuredTestimonial = testimonials.find(
    (t) =>
      (t.importedImage && t.importedImage?.length > 0) ||
      (t.importedVideo && t.importedVideo?.length > 0)
  );
  const regularTestimonials = testimonials
    .filter((t) => t !== featuredTestimonial)
    .slice(0, 5);

  return (
    <div className="container mx-auto p-4 pb-12 relative">
      <div className="absolute bottom-2 right-4 z-50">
        <button
          className="flex gap-2 justify-center items-center bg-white text-black rounded-full pr-4 py-1 group border shadow-md hover:bg-gradient-to-r from-sky-500 to-pink-400 transform transition-all hover:scale-105 duration-300 ease-in-out "
          onClick={() => window.open("https://viewus.in/login", "_blank")}
        >
          <div className="group-hover:bg-white rounded-full p-1 ">
            <img
              src="https://d3eyp937ijscg0.cloudfront.net/viewus_images/logo1.png"
              alt=""
              className="w-4 h-4"
            />
          </div>
          <span className=" text-xs font-semibold flex gap-1 group-hover:text-white">
            Collect testimonials with Viewus{" "}
            <ArrowUpRight
              className="w-4 h-4 group-hover:text-white"
              strokeWidth={2.75}
            />
          </span>
        </button>
      </div>
      {themeState.slug === "merged-and-share" && (
        <div className="flex items-center justify-center py-10">
          <div className="flex flex-col items-center space-y-2">
            <h1 className="text-3xl md:text-5xl font-bold text-center">
              Some words about{" "}
              <span className="text-yellow-600 text-4xl md:text-6xl">
                Merged&Share
              </span>
            </h1>
            <p className="text-xs md:text-lg">
              See what people have to say about us{" "}
            </p>
          </div>
        </div>
      )}
      <div className="grid grid-cols-12 gap-4">
        {featuredTestimonial && (
          <Card
            className={cn(
              "col-span-12 md:col-span-8 row-span-2",
              themeState.isDarkTheme ? "border-gray-800" : "border-gray-200",
              !isValidColor(themeState.cardBackgroundColor) &&
                themeState.isDarkTheme
                ? "bg-gray-800"
                : !isValidColor(themeState.cardBackgroundColor) &&
                  !themeState.isDarkTheme
                ? "bg-white"
                : "",
              !isValidColor(themeState.textColor) && themeState.isDarkTheme
                ? "text-white"
                : !isValidColor(themeState.textColor) && !themeState.isDarkTheme
                ? "text-black"
                : ""
            )}
            style={{
              backgroundColor: isValidColor(themeState.cardBackgroundColor)
                ? `#${themeState.cardBackgroundColor}`
                : undefined,
              color: isValidColor(themeState.textColor)
                ? `#${themeState.textColor}`
                : undefined,
              borderRadius: cardBorderRad,
            }}
          >
            <CardContent className="p-6 h-full max-h-[500px] flex flex-col">
              {featuredTestimonial.importedVideo &&
              featuredTestimonial.importedVideo.length > 0 ? (
                <div className="aspect-video mb-4 rounded-lg overflow-hidden">
                  <video
                    className="w-full h-full object-cover"
                    controls
                    src={featuredTestimonial.importedVideo}
                  ></video>
                </div>
              ) : featuredTestimonial.importedImage &&
                featuredTestimonial.importedImage?.length > 0 ? (
                <div className="aspect-video mb-4 rounded-lg overflow-hidden">
                  <img
                    src={featuredTestimonial.importedImage}
                    alt={`Testimonial from ${featuredTestimonial.firstName}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : null}

              <blockquote className="text-lg italic mb-4 flex-grow">
                {featuredTestimonial.review}
              </blockquote>

              <div className="flex md:flex-col lg:flex-row justify-between mt-auto">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={featuredTestimonial.image}
                      alt={featuredTestimonial.firstName}
                    />
                    <AvatarFallback>
                      {featuredTestimonial.firstName[0]}
                      {featuredTestimonial.lastname?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">
                      {featuredTestimonial.firstName}{" "}
                      {featuredTestimonial.lastname}
                    </p>
                    <p className="text-xs text-opacity-90">
                      {featuredTestimonial.jobTitle &&
                      featuredTestimonial.company ? (
                        <span>
                          {featuredTestimonial.jobTitle} at{" "}
                          {featuredTestimonial.company}
                        </span>
                      ) : featuredTestimonial.jobTitle ? (
                        <span>{featuredTestimonial.jobTitle}</span>
                      ) : (
                        featuredTestimonial.company && (
                          <span>{featuredTestimonial.company}</span>
                        )
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      style={{
                        fill: isValidColor(themeState.starColor)
                          ? `#${themeState.starColor}`
                          : "#71D4FE",
                      }}
                      color="none inline-block w-5 h-5"
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {regularTestimonials.map((testimonial, index) => (
          <Card
            key={index}
            className={cn(
              "col-span-12 md:col-span-4",
              !isValidColor(themeState.cardBackgroundColor) &&
                themeState.isDarkTheme
                ? "bg-gray-800"
                : !isValidColor(themeState.cardBackgroundColor) &&
                  !themeState.isDarkTheme
                ? "bg-white"
                : "",
              !isValidColor(themeState.textColor) && themeState.isDarkTheme
                ? "text-white"
                : !isValidColor(themeState.textColor) && !themeState.isDarkTheme
                ? "text-black"
                : ""
            )}
            style={{
              backgroundColor: isValidColor(themeState.cardBackgroundColor)
                ? `#${themeState.cardBackgroundColor}`
                : undefined,
              color: isValidColor(themeState.textColor)
                ? `#${themeState.textColor}`
                : undefined,
              borderRadius: cardBorderRad,
            }}
          >
            <CardContent className="p-6 h-full flex flex-col">
              <blockquote className="text-sm italic mb-4 flex-grow">
                {testimonial.review}
              </blockquote>

              <div className="flex md:flex-col lg:flex-row justify-between mt-auto">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={testimonial.image}
                      alt={testimonial.firstName}
                    />
                    <AvatarFallback>
                      {testimonial.firstName[0]}
                      {testimonial.lastname?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">
                      {testimonial.firstName} {testimonial.lastname}
                    </p>
                    <p className="text-xs text-opacity-90">
                      {testimonial.jobTitle && testimonial.company ? (
                        <span>
                          {testimonial.jobTitle} at {testimonial.company}
                        </span>
                      ) : testimonial.jobTitle ? (
                        <span>{testimonial.jobTitle}</span>
                      ) : (
                        testimonial.company && (
                          <span>{testimonial.company}</span>
                        )
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      style={{
                        fill: isValidColor(themeState.starColor)
                          ? `#${themeState.starColor}`
                          : "#71D4FE",
                      }}
                      color="none inline-block w-5 h-5"
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
