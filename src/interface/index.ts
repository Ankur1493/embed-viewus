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
  company?: string;
  review?: string;
  reviewType?: number;
  stars?: number;
  tags?: string[];
  liked?: boolean;
}

export interface ThemeState {
  isDarkTheme?: boolean;
  textColor?: string;
  starColor?: string;
  backgroundColor?: string;
  cardBackgroundColor?: string;
  tagColor?: string;
  tagTextColor?: string;
  cardBorderRadius?: string;
  outerRadius?: string;
  columns?: number;
  cardHeight?: string;
  isAnimate?: boolean;
}
