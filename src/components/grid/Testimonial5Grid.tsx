import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { Testimonial } from "@/interface";

interface TestimonialGridProps {
  testimonials: Testimonial[];
}

export default function Testimonial5Grid({
  testimonials,
}: TestimonialGridProps) {
  const featuredTestimonial = testimonials.find(
    (t) =>
      (t.importedImage && t.importedImage?.length > 0) ||
      (t.importedVideo && t.importedVideo?.length > 0)
  );
  const regularTestimonials = testimonials
    .filter((t) => t !== featuredTestimonial)
    .slice(0, 4);

  return (
    <div className="container mx-auto p-4">
      <div className="grid md:grid-cols-2 gap-4 h-full">
        {featuredTestimonial && (
          <Card className="h-full">
            <CardContent className="p-6 h-full flex flex-col">
              {featuredTestimonial.importedVideo ? (
                <div className="aspect-video mb-4 rounded-lg overflow-hidden">
                  <video
                    className="w-full h-full object-cover"
                    controls
                    poster={
                      featuredTestimonial.importedImage ||
                      featuredTestimonial.image
                    }
                  >
                    <source
                      src={featuredTestimonial.importedVideo}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : featuredTestimonial.importedImage ? (
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

              <div className="flex items-center justify-between mt-auto">
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
                    <p className="text-sm text-muted-foreground">
                      {featuredTestimonial.jobTitle} at{" "}
                      {featuredTestimonial.company}
                    </p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < (featuredTestimonial.stars || 0)
                          ? "fill-primary text-primary"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Grid of 4 regular testimonials on the right */}
        <div className="grid grid-cols-2 gap-4 h-full">
          {regularTestimonials.map((testimonial, index) => (
            <Card key={index} className="h-full">
              <CardContent className="p-6 h-full flex flex-col">
                <blockquote className="text-sm italic mb-4 flex-grow">
                  {testimonial.review}
                </blockquote>

                <div className="flex items-center justify-between mt-auto">
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
                      <p className="text-xs text-muted-foreground">
                        {testimonial.jobTitle} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < (testimonial.stars || 0)
                            ? "fill-primary text-primary"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
