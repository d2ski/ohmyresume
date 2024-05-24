import { TuiMonth } from '@taiga-ui/cdk';

export const mockCv = {
  title: 'Frontend-разработчик Angular',
  photo: null,
  firstName: 'Иван',
  lastName: 'Демидов',
  age: 33,
  city: 'Москва',
  residency: 'Россия',
  contacts: {
    email: 'test@test.ru',
    phone: '+79012342423',
  },
  experience: [
    {
      jobTitle: 'Frontend-разработчик Angular',
      employer: 'Super Media COM',
      monthStart: TuiMonth.currentLocal(),
      monthEnd: null,
      stillWork: true,
      description:
        '<ul><li><p>Разработка с нуля Angular приложения для внутреннего проекта компании (LMS система для сотрудников);</p></li><li><p>Реализация авторизации, разработка архитектуры и функционала приложения, кастомные формы;</p></li><li><p>Стэк: Angular 16, NgRx, RxJs, Taiga UI, Nx, Supabase.</p></li></ul>',
      order: 0,
    },
    {
      jobTitle: 'Бизнес-аналитик',
      employer: 'Super Media COM',
      monthStart: TuiMonth.currentLocal(),
      monthEnd: null,
      stillWork: true,
      description:
        '<ul><li><p>Выявление, сбор, декомпозиция и описание требований (User Story и Use Case);</p></li><li><p>Участие в тестировании;</p></li><li><p>Онбординг и наставничество сотрудников, создание базы знаний;</p></li><li><p>Управление командой аналитиков (4-5 человек)</p></li></ul>',
      order: 0,
    },
  ],
  education: [
    {
      schoolTitle: 'Волгоградский государственный технический университет',
      level: 'Магистр',
      faculty: 'Автоматизации и управления',
      speciality: 'Инженер-программист',
      monthStart: TuiMonth.currentLocal().append({ month: -12 }),
      monthEnd: TuiMonth.currentLocal(),
      order: 0,
    },
  ],
  skills: [
    {
      skillTitle: 'Python',
    },
    {
      skillTitle: 'GIT',
    },
    {
      skillTitle: 'Angular',
    },
    {
      skillTitle: 'JavaScript',
    },
    {
      skillTitle: 'TypeScript',
    },
    {
      skillTitle: 'SQL',
    },
    {
      skillTitle: 'NgRx',
    },
    {
      skillTitle: 'Nx',
    },
    {
      skillTitle: 'Figma',
    },
    {
      skillTitle: 'RxJS',
    },
  ],
  languages: [
    {
      langTitle: 'Английский',
      level: {
        level: 'B1',
        label: 'Средний (B1)',
      },
    },
  ],
  about: '<p>Начинающий web-программист с опытом бизнес-аналитика.</p>',
};
