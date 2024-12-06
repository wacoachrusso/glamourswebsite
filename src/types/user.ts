export interface User {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'STYLIST' | 'CLIENT';
  createdAt: string;
  updatedAt: string;
}

export interface StaffMember extends User {
  specialties: string[];
  experience: number;
  rating: number;
  availability: {
    [key: string]: string[];
  };
}