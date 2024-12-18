export interface Testimonial {
  _id: string;
  spaceId: string;
  slug?: string;
  firstName: string;
  lastname?: string;
  image?: string;
  importedImage?: string;
  importedReviewType: number;
  importedVideo?: string;
  jobTitle?: string;
  review?: string;
  reviewType?: number;
  stars?: number;
  tags?: string[];
  liked?: boolean;
}
