import { ResumeContacts } from './contacts';
import { ResumeHeader } from './header';

export type Experience = {
  jobTitle: string | null;
  employer: string | null;
  monthStart: number | null;
  yearStart: number | null;
  monthEnd: number | null;
  yearEnd: number | null;
  stillWork: boolean;
  description: string | null;
  order: number;
};

export interface Resume {
  title: string | null;
  header: ResumeHeader;
  contacts: ResumeContacts;
  experience: Experience[];
}
