/// <reference types="vite/client" />

type TodoType = {
	id?: string;
	text: string;
};

interface TodoStateType {
	todos: TodoType[];
}
