import { useQuery } from "@tanstack/react-query";

export type User = {
  id: string;
  name: string;
  username: string;
  avatar: string;
};

export type Tweet = {
  id: string;
  user: User;
  content: string;
  image?: string;
  date: string;
  likes: number;
};

export type Testimonial = {
  id: string;
  user: User;
  rating: number;
  content: string;
  date: string;
};

export type GridItem = Tweet | Testimonial;

const mockData: GridItem[] = [
  {
    id: "1",
    user: {
      id: "u1",
      name: "Ankit Sharma",
      username: "@heyankit",
      avatar: "/placeholder.svg",
    },
    content: "Do bhai, dono tabhai ! @mannupaaji @kirat_tw . Best stream 🔮",
    image: "/placeholder.svg?height=200&width=300",
    date: "Sep 12, 2024",
    likes: 126,
  },
  {
    id: "2",
    user: {
      id: "u2",
      name: "Rick Astley",
      username: "Famous Artist",
      avatar: "/placeholder.svg",
    },
    rating: 5,
    content:
      "Senja's the only testimonial tool out there that's never gonna give you up or let you down. It's never gonna run around and desert you. It's never gonna make you cry, never gonna say goodbye, never gonna tell a lie and hurt you.",
    date: "Aug 10, 2024",
  },
  {
    id: "3",
    user: {
      id: "u3",
      name: "Mariah Carey",
      username: "Global Superstar",
      avatar: "/placeholder.svg",
    },
    rating: 5,
    content:
      "Since taking the course I've unlocked my earning potential and I'm now richer than my wildest dreams. Thank you so much for the awesome course.",
    date: "Aug 10, 2024",
  },
  {
    id: "4",
    user: {
      id: "u4",
      name: "Ankit",
      username: "@terakyalenadena",
      avatar: "/placeholder.svg",
    },
    content: "Men can do anything for his family",
    image: "/placeholder.svg?height=300&width=400",
    date: "Aug 15, 2024",
    likes: 250,
  },
  {
    id: "5",
    user: {
      id: "u5",
      name: "Lily Hughes",
      username: "Marketing growth expert",
      avatar: "/placeholder.svg",
    },
    rating: 5,
    content:
      "I was stuck inside my business, constantly fire-fighting and panicked about growth. It was meant to be easy. The course has transformed my work, my business and my life. Thank you!",
    date: "Aug 10, 2024",
  },
];

export const fetchGridItems = async (): Promise<GridItem[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockData;
};

export const useGridItems = () => {
  return useQuery<GridItem[], Error>({
    queryKey: ["gridItems"],
    queryFn: fetchGridItems,
  });
};
