/// <reference types="vite/client" />

type IdType = string | number;

type TodoItemType = {
	id: IdType;
	todo: string;
	complete?: boolean;
};

interface Todos {
	todos: TodoItemType[];
	addTodo: (todo: Omit<TodoItemType, "id">) => void;
	updateTodo: (id: IdType, todo: TodoItemType) => void;
	deleteTodo: (id: IdType) => void;
	toggleTodo: (id: IdType) => void;
}
