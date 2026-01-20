// src/data/resources.ts

export interface ResourceItem {
  id: string;
  title: string;
  author: string;
  type: "book" | "video";
  size?: string;
  description: string;
  link: string;       
  downloadUrl?: string; 
  coverImage?: string; // Optional cover image for books
  color: string;      
  span: string;
}

export const resources: ResourceItem[] = [
  // --- BOOKS (4 Items) ---
  {
    id: "book-math",
    title: "Mathematics for Machine Learning",
    author: "Deisenroth, Faisal, Ong",
    type: "book",
    size: "17 MB",
    description: "The fundamental mathematical tools needed to understand machine learning.",
    link: "/books/mathematics-for-machine-learning.pdf", 
    downloadUrl: "/books/mathematics-for-machine-learning.pdf",
    coverImage: "/books/covers/mathematics-for-machine-learning.jpg",
    color: "rgb(132, 0, 255)", // Purple
    span: "md:col-span-1 md:row-span-2", 
  },
  {
    id: "book-bishop",
    title: "Pattern Recognition & ML",
    author: "Christopher Bishop",
    type: "book",
    size: "17 MB",
    description: "A comprehensive guide to pattern recognition. The classic textbook.",
    link: "/books/pattern-recognition-and-machine-learning.pdf", 
    downloadUrl: "/books/pattern-recognition-and-machine-learning.pdf",
    coverImage: "/books/covers/pattern-recognition-and-machine-learning.jpg",
    color: "rgb(6, 182, 212)", // Cyan
    span: "md:col-span-1 md:row-span-2", 
  },
  {
    id: "book-geron",
    title: "Hands-On Machine Learning",
    author: "Aurélien Géron",
    type: "book",
    size: "19 MB",
    description: "Learn Scikit-Learn, Keras, and TensorFlow with practical examples.",
    link: "/books/hands-on-machine-learning.pdf",
    downloadUrl: "/books/hands-on-machine-learning.pdf",
    coverImage: "/books/covers/hands-on-machine-learning.jpg",
    color: "rgb(255, 165, 0)", // Orange
    span: "md:col-span-1 md:row-span-2", 
  },
  {
    id: "book-goodfellow",
    title: "Deep Learning",
    author: "Ian Goodfellow et al.",
    type: "book",
    size: "25 MB",
    description: "The Bible of Deep Learning. Covers theoretical foundations and modern architectures.",
    link: "/books/deep-learning.pdf",
    downloadUrl: "/books/deep-learning.pdf",
    coverImage: "/books/covers/deep-learning.jpg",
    color: "rgb(236, 72, 153)", // Pink
    span: "md:col-span-1 md:row-span-2", 
  },
  {
    id: "book-sutton-rl",
    title: "Reinforcement Learning: An Introduction",
    author: "Richard S. Sutton & Andrew G. Barto",
    type: "book",
    size: "5 MB",
    description: "The foundational textbook on reinforcement learning, covering key algorithms and theory.",
    link: "/books/Reinforcement Learning Richard S. Sutton and Andrew G. Barto.pdf",
    downloadUrl: "/books/Reinforcement Learning Richard S. Sutton and Andrew G. Barto.pdf",
    coverImage: "/books/covers/reinforcement-learning-sutton-barto.jpg",
    color: "rgb(34, 197, 94)", // Green
    span: "md:col-span-1 md:row-span-2",
  },
  {
    id: "book-murphy-ml",
    title: "Machine Learning: A Probabilistic Perspective",
    author: "Kevin P. Murphy",
    type: "book",
    size: "30 MB",
    description: "A comprehensive introduction to machine learning from a probabilistic viewpoint.",
    link: "/books/ML Machine Learning-A Probabilistic Perspective.pdf",
    downloadUrl: "/books/ML Machine Learning-A Probabilistic Perspective.pdf",
    coverImage: "/books/covers/ml-probabilistic-perspective.jpg",
    color: "rgb(249, 115, 22)", // Orange
    span: "md:col-span-1 md:row-span-2",
  },
  {
    id: "book-designing-ml",
    title: "Designing Machine Learning Systems",
    author: "Chip Huyen",
    type: "book",
    size: "10 MB",
    description: "An iterative process for production-ready ML applications. Covers MLOps and system design.",
    link: "/books/Designing Machine Learning Systems.pdf",
    downloadUrl: "/books/Designing Machine Learning Systems.pdf",
    coverImage: "/books/covers/designing-machine-learning-systems.jpg",
    color: "rgb(168, 85, 247)", // Purple
    span: "md:col-span-1 md:row-span-2",
  },
  {
    id: "book-cuda-guide",
    title: "CUDA C Programming Guide",
    author: "NVIDIA",
    type: "book",
    size: "8 MB",
    description: "Official NVIDIA guide for CUDA C programming and GPU computing fundamentals.",
    link: "/books/CUDA_C_Programming_Guide.pdf",
    downloadUrl: "/books/CUDA_C_Programming_Guide.pdf",
    coverImage: "/books/covers/cuda-c-programming-guide.jpg",
    color: "rgb(34, 211, 238)", // Cyan
    span: "md:col-span-1 md:row-span-2",
  },
  {
    id: "book-cuda-programming",
    title: "CUDA Programming",
    author: "Shane Cook",
    type: "book",
    size: "12 MB",
    description: "A developer's guide to parallel computing with GPUs using CUDA.",
    link: "/books/cuda-programming.pdf",
    downloadUrl: "/books/cuda-programming.pdf",
    coverImage: "/books/covers/cuda-programming.jpg",
    color: "rgb(74, 222, 128)", // Green
    span: "md:col-span-1 md:row-span-2",
  },
  {
    id: "book-parallel-processors",
    title: "Programming Massively Parallel Processors",
    author: "David B. Kirk & Wen-mei W. Hwu",
    type: "book",
    size: "20 MB",
    description: "A hands-on approach to parallel programming with CUDA and GPU architectures.",
    link: "/books/programming-massively-parallel-processors-a-hands-on-approach-4nbsped-9780323912310_compress.pdf",
    downloadUrl: "/books/programming-massively-parallel-processors-a-hands-on-approach-4nbsped-9780323912310_compress.pdf",
    coverImage: "/books/covers/programming-massively-parallel-processors.jpg",
    color: "rgb(251, 191, 36)", // Amber
    span: "md:col-span-1 md:row-span-2",
  },
  {
    id: "book-rl-intro",
    title: "Reinforcement Learning",
    author: "Various Authors",
    type: "book",
    size: "4 MB",
    description: "Introduction to reinforcement learning concepts and algorithms.",
    link: "/books/reinforcement learning.pdf",
    downloadUrl: "/books/reinforcement learning.pdf",
    coverImage: "/books/covers/reinforcement-learning.jpg",
    color: "rgb(244, 63, 94)", // Rose
    span: "md:col-span-1 md:row-span-2",
  },

  // --- VIDEOS (6 Items) ---
  {
    id: "vid-custom",
    title: "ML Essentials Playlist",
    author: "Rishi Das (NITR)",
    type: "video",
    description: "Curated collection of essential lectures for the team.",
    link: "https://youtube.com/playlist?list=PLKnIA16_Rmvbr7zKYQuBfsVkjoLcJgxHH&si=gRTfZe-hSD7WySmJ",
    color: "rgb(59, 130, 246)", // Blue
    span: "md:col-span-2 md:row-span-1", 
  },
  {
    id: "vid-karpathy",
    title: "Neural Networks: Zero to Hero",
    author: "Andrej Karpathy",
    type: "video",
    description: "The best deep learning course available online. Builds everything from scratch.",
    link: "https://youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ&si=2kNG0A4Au3P4FFGu",
    color: "rgb(239, 68, 68)", // Red
    span: "md:col-span-1 md:row-span-1", 
  },
  {
    id: "vid-cs229",
    title: "CS229: Machine Learning",
    author: "Stanford University",
    type: "video",
    description: "The legendary course that started it all. Deep dive into theory.",
    link: "https://youtube.com/playlist?list=PLoROMvodv4rMFqRtEuo6SGjY4XbRIVRd4&si=Dxd5SNKqosiMF43I",
    color: "rgb(16, 185, 129)", // Emerald
    span: "md:col-span-1 md:row-span-1", 
  },
  {
    id: "vid-cs230",
    title: "CS230: Deep Learning",
    author: "Stanford University",
    type: "video",
    description: "Learn the foundations of Deep Learning, understand how to build neural networks.",
    link: "https://youtube.com/playlist?list=PLoROMvodv4rPLKxIpqhjhPgdQy7imNkDn&si=vYrxzQmrpR9mdeap",
    color: "rgb(139, 92, 246)", // Violet
    span: "md:col-span-2 md:row-span-1", 
  },
  {
    id: "vid-huggingface",
    title: "Hugging Face Course",
    author: "Hugging Face",
    type: "video",
    description: "Master NLP and Transformers using the Hugging Face ecosystem.",
    link: "https://youtube.com/playlist?list=PLqzoL9-eJTNBZDG8jaNuhap1C9q6VHyVa&si=RQ8G8NEnshebHShB",
    color: "rgb(250, 204, 21)", // Yellow
    span: "md:col-span-1 md:row-span-1", 
  },
  {
    id: "vid-cs231n",
    title: "CS231n: Vision",
    author: "Stanford University",
    type: "video",
    description: "Convolutional Neural Networks for Visual Recognition.",
    link: "https://youtube.com/playlist?list=PLC1qU-LWwrF64f4QKQT-Vg5Wr4qEE1Zxk&si=_fL7EVbhxugqrQiP",
    color: "rgb(236, 72, 153)", // Pink
    span: "md:col-span-1 md:row-span-1", 
  }
];