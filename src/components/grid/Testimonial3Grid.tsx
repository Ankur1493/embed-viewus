import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Testimonial } from "@/interface";

interface TestimonialGrid2Props {
  testimonials: Testimonial[];
}

export default function Testimonial3Grid({
  testimonials,
}: TestimonialGrid2Props) {
  const importedTestimonial = testimonials.find(
    (t) =>
      (t.importedImage && t.importedImage?.length > 0) ||
      (t.importedVideo && t.importedVideo?.length > 0)
  );
  const otherTestimonials = testimonials
    .filter((t) => t !== importedTestimonial)
    .slice(0, 2);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {importedTestimonial && (
          <Card className="row-span-2 flex flex-col pt-6">
            <CardContent className="flex-grow flex flex-col">
              <div className="w-full h-80 relative mb-4">
                {importedTestimonial.importedVideo ? (
                  <video
                    className="w-full h-full object-cover rounded-lg"
                    controls
                    poster={
                      importedTestimonial.importedImage ||
                      importedTestimonial.image
                    }
                  >
                    <source
                      src={importedTestimonial.importedVideo}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                ) : importedTestimonial.importedImage ? (
                  <img
                    src={importedTestimonial.importedImage}
                    alt={`${importedTestimonial.firstName} ${importedTestimonial.lastname}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : null}
              </div>
              <blockquote className="text-lg italic mb-4">
                {importedTestimonial.review}
              </blockquote>
              <div className="flex items-center mt-auto">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage
                    src={importedTestimonial.image}
                    alt={`${importedTestimonial.firstName} ${importedTestimonial.lastname}`}
                  />
                  <AvatarFallback>
                    {importedTestimonial.firstName[0]}
                    {importedTestimonial.lastname &&
                      importedTestimonial.lastname[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">
                    {importedTestimonial.firstName}{" "}
                    {importedTestimonial.lastname}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {importedTestimonial.jobTitle} at{" "}
                    {importedTestimonial.company}
                  </p>
                </div>
                <div className="ml-auto">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-2xl ${
                        i < (importedTestimonial.stars || 0)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {otherTestimonials.map((testimonial, index) => (
          <Card key={index} className="relative">
            <CardContent>
              <blockquote className="text-lg italic mb-4 pt-6">
                {testimonial.review}
              </blockquote>
              <div className="absolute bottom-6 w-[90%] flex items-center">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage
                    src={testimonial.image}
                    alt={`${testimonial.firstName} ${testimonial.lastname}`}
                  />
                  <AvatarFallback>
                    {testimonial.firstName[0]}
                    {testimonial.lastname && testimonial.lastname[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">
                    {testimonial.firstName} {testimonial.lastname}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.jobTitle} at {testimonial.company}
                  </p>
                </div>
                <div className="ml-auto">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-2xl ${
                        i < (testimonial.stars || 0)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
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
