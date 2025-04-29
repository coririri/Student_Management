import { UUID } from "crypto";

export interface studentRecordItem {
  record_id: UUID;
  date: Date;
  student_id: string;
  name: string;
  grade: 0 | 2 | 1 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
  attendance: string;
  late_time: number;
  homework_completion: number;
  notes: string;
  progress: string;
  phonenumber: string;
  parent_phonenumber: string;
}
