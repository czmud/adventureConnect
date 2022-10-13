import 'dotenv/config';

interface EnvironmentalVariables {
    SECRET_KEY: string;
    MONGODB_URI: string;
    CLIENT_URL: string;
}

export const env: EnvironmentalVariables = {
    SECRET_KEY: process.env.SECRET_KEY as string,
    MONGODB_URI: process.env.MONGODB_URI as string,
    CLIENT_URL: process.env.CLIENT_URL as string
}