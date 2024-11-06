import profile from "../assets/images/avatar.webp";
import image1 from "../assets/images/test1.webp";
import image2 from "../assets/images/test2.webp";
import image3 from "../assets/images/test3.webp";
import v1 from "../assets/videos/screen2.mp4";
import { Testimonial } from "@/interface";

export const testimonials: Testimonial[] = [
  {
    item: 1,
    content: "I am groot. I am groot, I am groot, I am groot. I AM GROOOOOT!",
    star: 5,
    author: "Groot",
    role: "Groot at Groot Industries",
    avatar: profile,
    tags: ["Good", "Loving", "Great Product"],
    liked: true,
  },
  {
    item: 2,
    content:
      "This platform has changed the way we approach our work. The user experience is seamless and intuitive!",
    author: "Alex Johnson",
    star: 4,
    role: "Product Manager at Innovatech",
    avatar: profile,
  },
  {
    item: 3,
    video: v1,
    author: "Samantha Lee",
    role: "Product Manager at Innovatech",
    avatar: profile,
    star: 4,
  },
  {
    item: 4,
    content:
      "We saw a 40% increase in engagement after using this tool. It's a must-have for growing businesses.",
    author: "Chris Patel",
    role: "Marketing Lead at GrowthCorp",
    avatar: profile,
    star: 5,
  },
  {
    item: 5,
    content:
      "Absolutely love the features and the constant updates. Keep up the great work!",
    author: "Taylor Martinez",
    importedFrom: "Twitter",
    avatar: profile,
    image: image1,
    liked: true,
  },
  {
    item: 6,
    content:
      "The best decision we've made this year was switching to this service. Our efficiency has doubled.",
    author: "Jordan Baker",
    importedFrom: "LinkedIn",
    role: "Operations Manager at OptiFlow",
    avatar: profile,
    image: image2,
  },
  {
    item: 7,
    content:
      "This app has simplified our workflow beyond expectations. Five stars!",
    author: "Emily Carter",
    avatar: profile,
    star: 3,
    tags: ["Good", "Loving", "Great Product"],
    liked: true,
  },
  {
    item: 8,
    content:
      "I cannot recommend this tool enough. It’s the reason my business can scale so efficiently.",
    author: "Liam O’Reilly",
    role: "CEO at Startup X",
    avatar: profile,
    video: v1,
    star: 5,
  },
  {
    item: 9,
    content:
      "An amazing product backed by a stellar support team. My queries were answered within minutes!",
    author: "Michael Kim",
    importedFrom: "Product Hunt",
    avatar: profile,
  },
  {
    item: 10,
    content:
      "The sleek design and ease of use make this software a standout. Our entire team is impressed.",
    author: "Hannah Thompson",
    avatar: profile,
    star: 4,
    liked: true,
  },
  {
    item: 11,
    content:
      "This is the most user-friendly product in the market. I love how intuitive it is.",
    author: "Jonathan Green",
    importedFrom: "LinkedIn",
    avatar: profile,
    role: "Software Engineer at CodeWave",
    image: image3,
  },
  {
    item: 12,
    content:
      "We saw a 40% increase in engagement after using this tool. It's a must-have for growing businesses.",
    author: "Chris Patel",
    role: "Marketing Lead at GrowthCorp",
    avatar: profile,
    star: 5,
    tags: ["Good", "Loving", "Great Product"],
    liked: true,
  },
  {
    item: 13,
    content:
      "Absolutely love the features and the constant updates. Keep up the great work!",
    author: "Taylor Martinez",
    importedFrom: "Twitter",
    avatar: profile,
  },
];
