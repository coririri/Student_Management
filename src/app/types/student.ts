export interface Student {
  id: string;
  created_at: string;
  name: string;
  grade: 0 | 2 | 1 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
  parent_phonenumber: string;
  phonenumber: string;
}
