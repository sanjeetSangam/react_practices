import { useLoaderData } from "react-router-dom";

const Github = () => {
	const data: GitHubUserData = useLoaderData() as GitHubUserData;

	return (
		<div className="text-center m-5 p-4 bg-gray-600 text-white text-3xl">
			{data?.name}
			<h1 className="mt-5">Github followers : {data?.followers}</h1>
			<img
				src={data?.avatar_url}
				alt={data?.name}
				width={300}
				className="rounded-md shadow-md m-auto mt-5"
			/>
		</div>
	);
};

export default Github;
