# Task Manager — SPA на React

Многофункциональное приложение для управления задачами с досками, фильтрами, drag-n-drop и модальными окнами. Реализовано на современном стеке с использованием React, Redux Toolkit и DnD Kit.


## Стек технологий

- **React + TypeScript**
- **Redux Toolkit** — для управления состоянием
- **React Router DOM** — маршрутизация
- **@dnd-kit/core** — drag-and-drop между колонками
- **SCSS-модули** — модульная стилизация компонентов
- **Vite** — для сборки и быстрой разработки


## Структура проекта


src/
├── app/               // Инициализация приложения
│   ├── store.ts       // Redux store
│   └── styles/        // Глобальные переменные SCSS
│
├── entities/          // Бизнес-сущности (доски, задачи, пользователи)
│   ├── board/
│   ├── task/
│   └── user/
│
├── features/          // Фичи (модальные окна, формы и т.п.)
│   └── TaskForm/
│
├── pages/             // Страницы
│   ├── BoardsPage/
│   ├── BoardPage/
│   └── TasksPage/
│
├── shared/            // Переиспользуемые компоненты и утилиты
│   ├── hooks/
│   ├── ui/
│   └── types/
│
├── widgets/           // Компоненты UI уровня страницы (например, колонки)
└── router/            // Маршруты

Установка и запуск
1. Установи зависимости
npm install
yarn install

2. Запусти проект в режиме разработки
npm run dev
yarn dev

3. Собрать проект
npm run build
yarn build

4. Запуск сборки в предпросмотре
npm run preview
yarn preview
