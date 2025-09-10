// types/User.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin"; // 👈 new
  token?: string;
}
