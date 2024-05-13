const config = {
	APPWRITE_END_POINT_URL: String(import.meta.env.APPWRITE_END_POINT_URL),
	APPWRITE_PROJECT_ID: String(import.meta.env.APPWRITE_PROJECT_ID),
	APPWRITE_DATABASE_ID: String(import.meta.env.APPWRITE_DATABASE_ID),
	APPWRITE_COLLECTION_ID: String(import.meta.env.APPWRITE_COLLECTION_ID),
	APPWRITE_BUCKET_ID: String(import.meta.env.APPWRITE_BUCKET_ID),
};

export default config;
