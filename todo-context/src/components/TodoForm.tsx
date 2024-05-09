import { useState } from "react";
import { useTodo } from "../context/TodoContext";

function TodoForm() {
	const [todo, setTodo] = useState<TodoItemType>({ id: "", todo: "", complete: false });

	const { addTodo } = useTodo();

	const add = (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!todo.todo) return;
		addTodo(todo);
		setTodo({ id: "", todo: "", complete: false });
	};

	return (
		<form className="flex" onSubmit={add}>
			<input
				type="text"
				placeholder="Write Todo..."
				className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
				value={todo.todo}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setTodo({ todo: e.target.value, complete: false })
				}
			/>
			<button
				type="submit"
				className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
			>
				Add
			</button>
		</form>
	);
}

export default TodoForm;
