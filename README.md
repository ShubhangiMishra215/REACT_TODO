# Todo App

A feature-rich Todo App built with React and Tailwind CSS, with local storage persistence, sound effects, and real-time notifications.

---

## 🎯 Features

Users are able to:

- Add, edit, and delete tasks
- Mark tasks as completed
- Clear all completed tasks at once
- See live stats — active, completed, and total tasks
- View a progress bar tracking completion
- Receive toast notifications on every action
- Hear sound feedback on add, complete, update, and delete
- Data persists across page refreshes via localStorage

---

## ⚙️ Built With

- [React](https://react.dev/) — UI library with functional components and hooks
- [Tailwind CSS](https://tailwindcss.com/) — utility-first CSS framework
- localStorage — for data persistence across sessions

---

## 💡 What I Learned

**localStorage with React** — syncing state to localStorage using `useEffect` with a load guard prevented overwriting saved data on mount.

```jsx
const [hasLoaded, setHasLoaded] = useState(false);

useEffect(() => {
  if (!hasLoaded) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}, [todos, hasLoaded]);
```

**Component-based architecture** — splitting the app into focused components like `TodoList`, `StatsGrid`, `ClearButton`, and `Notification` kept the code clean and scalable.

**Notification system** — building a reusable toast notification with `setTimeout` for auto-dismiss without any external library.

---

## 🚀 Continued Development

- Add drag-and-drop to reorder tasks
- Add filter tabs (All / Active / Completed)
- Add due dates and priority levels
- Animate notifications and task transitions
- Write unit tests for core logic

---

## 🔗 Live Demo

[https://react-todo-rho-one.vercel.app/](#)

---

## 👤 Author

<<<<<<< HEAD
- GitHub — [https://github.com/ShubhangiMishra215](#)
=======
- GitHub — [https://github.com/ShubhangiMishra215](#)
>>>>>>> f1cc16e5161c05479d45a9c0a02e912eb558ecb1
