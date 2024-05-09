/// <reference types="vite/client" />

type UserDetails = {
	username: string;
	password: string;
};

type User = {
	user: UserDetails;
	setUserDetails: (user: UserDetails) => void;
};
