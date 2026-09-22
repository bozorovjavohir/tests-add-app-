export type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
};

export type Section = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
};

export type Test = {
  id: number;
  title: string;
  category: string;
  description: string;
  createdAt: string;
  sectionId: number;
  questions: Question[];
  archived?: boolean;
};
