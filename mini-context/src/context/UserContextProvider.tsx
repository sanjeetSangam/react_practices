import { ReactNode, useState } from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<UserDetails>({ username: "", password: "" });
	const setUserDetails = (user: UserDetails) => {
		setUser(user);
	};
	return <UserContext.Provider value={{ user, setUserDetails }}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
