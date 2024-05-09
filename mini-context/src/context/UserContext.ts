import { createContext } from "react";

const UserContext = createContext<User>({
	user: { username: "", password: "" },
	setUserDetails: () => {},
});

export default UserContext;
