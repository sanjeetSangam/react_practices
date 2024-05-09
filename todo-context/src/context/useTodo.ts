import { useContext } from "react";
import { TodoContext } from "./TodoContext";

const useTodo = () => {
	return useContext(TodoContext);
};
export { useTodo };
