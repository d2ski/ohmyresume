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
}
