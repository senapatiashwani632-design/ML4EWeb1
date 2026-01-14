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
    color: "rgb(236, 72, 153)", // Pink
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