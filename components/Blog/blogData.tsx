import { Blog } from "@/types/blog";

const blogData: Blog[] = [
  {
    id: 1,
    title: "Mastering Time Management. Strategies for Efficient Learning",
    paragraph:
      " In the fast-paced world of education, mastering time management is crucial for effective learning.",
    image: "/images/blog/blog-01.jpg",
    author: {
      name: "Robert chan",
      image: "/images/blog/author-01.png",
      designation: "Educator",
    },
    tags: ["education"],
    publishDate: "2025",
  },
  {
    id: 2,
    title: "Which Speech Recognition solution will be best for you",
    paragraph:
      " When using an open-source pre-trained model We will need to set up your own server might require GPU powe We must have the technical expertise.",
    image: "/images/blog/blog-02.jpg",
    author: {
      name: "Ibrahim ibu",
      image: "/images/blog/author-02.png",
      designation: "Web developer",
    },
    tags: ["technical"],
    publishDate: "2025",
  },
  {
    id: 3,
    title: "The Role of Creativity in Education",
    paragraph:
      "Beyond textbooks and exams, the role of creativity in education is a dynamic force that shapes learners into innovative thinkers",
    image: "/images/blog/blog-03.jpg",
    author: {
      name: "Rakibujjaman",
      image: "/images/blog/author-03.png",
      designation: "Educator",
    },
    tags: ["education"],
    publishDate: "2025",
  },
];
export default blogData;
