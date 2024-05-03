import { TuiMonthLike } from '@taiga-ui/cdk';
import { ResumeContacts } from './contacts';

export type Experience = {
  jobTitle: string | null;
  employer: string | null;
  monthStart: TuiMonthLike | null;
  monthEnd: TuiMonthLike | null;
  stillWork: boolean;
  description: string | null;
  order: number;
};

export type Education = {
  schoolTitle: string | null;
  level: string | null;
  faculty: string | null;
  speciality: string | null;
  monthStart: TuiMonthLike | null;
  monthEnd: TuiMonthLike | null;
  order: number;
};

export type Skill = {
  skillTitle: string;
};

export interface Resume {
  title: string | null;
  photo: string | null;
  firstName: string | null;
  lastName: string | null;
  age: number | null;
  city: string | null;
  residency: string | null;
  contacts: ResumeContacts;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
}
