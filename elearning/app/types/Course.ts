export interface Course {
  id: string;
  title: string;
  description: string;
  imgUrl: string;
  price: number;
  mrp?: number;
  rating: number;
  professor: string;
  createdAt: string;
  enrolledUsers?: number;
  enrolled?: boolean; // ✅ local flag
  videoUrl?: string; // ✅ NEW: YouTube video link
  language?: string; // ✅ NEW: Course language
  details?: string; // ✅ NEW: Detailed course description
  progress?: number; // ✅ Progress percentage (0-100)
  duration?: number; // ✅ Duration in hours
  level?: string; // ✅ Course level (Beginner, Intermediate, etc.)
}
