export interface Testimonial {
  item: number;
  author: string;
  content?: string;
  role?: string;
  avatar?: string;
  importedFrom?: string;
  image?: string;
  video?: string;
  star?: number;
  tags?: string[];
  liked?: boolean;
}
