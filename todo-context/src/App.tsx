import { useEffect, useState } from "react";
import { TodoProvider } from "./context/TodoContext";
import { TodoForm, TodoItem } from "./components";

const App = () => {
	const [todos, setTodos] = useState<TodoItemType[]>([]);

	const addTodo = (todo: Omit<TodoItemType, "id">) => {
		setTodos((prev) => [...prev, { id: Date.now(), ...todo }]);
	};

	const updateTodo = (id: IdType, todo: TodoItemType) => {
		setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)));
	};

	const deleteTodo = (id: IdType) => {
		setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id));
	};

	const toggleTodo = (id: IdType) => {
		setTodos((prev) =>
			prev.map((prevTodo) =>
				prevTodo.id === id ? { ...prevTodo, complete: !prevTodo.complete } : prevTodo
			)
		);
	};

	useEffect(() => {
		const todosString: string | null = localStorage.getItem("todos");

		if (todosString !== null) {
			const todos: TodoItemType[] = JSON.parse(todosString);
			if (todos && todos.length > 0) {
				setTodos(todos);
			}
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	return (
		<TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleTodo }}>
			<div className="bg-[#172842] min-h-screen py-8">
				<div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
					<h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
					<div className="mb-4">
						<TodoForm />
					</div>
					<div className="flex flex-wrap gap-y-3">
						{todos?.length > 0 ? (
							todos.map((todo) => (
								<div key={todo.id} className="w-full">
									<TodoItem todo={todo} />
								</div>
							))
						) : (
							<div className="w-full text-center p-5">No Todo!</div>
						)}
					</div>
				</div>
			</div>
		</TodoProvider>
	);
};

export default App;
