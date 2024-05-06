import { TuiMonthLike } from '@taiga-ui/cdk';
import { ResumeContacts } from './contacts';

type Experience = {
  jobTitle: string | null;
  employer: string | null;
  monthStart: TuiMonthLike | null;
  monthEnd: TuiMonthLike | null;
  stillWork: boolean;
  description: string | null;
  order: number;
};

type Education = {
  schoolTitle: string | null;
  level: string | null;
  faculty: string | null;
  speciality: string | null;
  monthStart: TuiMonthLike | null;
  monthEnd: TuiMonthLike | null;
  order: number;
};

type Skill = {
  skillTitle: string;
};

export enum LanguageLevel {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2',
}

type Language = {
  langTitle: string;
  level: {
    level: LanguageLevel;
    label: string;
  };
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
  languages: Language[];
}
