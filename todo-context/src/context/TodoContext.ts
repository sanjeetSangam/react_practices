import { createContext, useContext } from "react";

const TodoContext = createContext<Todos>({
	todos: [],
	addTodo: () => {},
	updateTodo: () => {},
	deleteTodo: () => {},
	toggleTodo: () => {},
});

// const TodoProvider = ({ children }: { children: ReactNode }) => {
// 	const [todo, setTodo] = useState([]);
// 	return <TodoContext.Provider value={{ todo, setTodo }}>{children}</TodoContext.Provider>;
// };

const TodoProvider = TodoContext.Provider;

const useTodo = () => {
	return useContext(TodoContext);
};

export { TodoContext, TodoProvider, useTodo };
