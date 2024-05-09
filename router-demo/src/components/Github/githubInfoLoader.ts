export const githubInfoLoader = async (): Promise<GitHubUserData> => {
	try {
		const response = await fetch("https://api.github.com/users/sanjeetSangam");
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const data: GitHubUserData = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
