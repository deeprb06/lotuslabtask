type DBConfig = {
    host: string;
    username: string;
    password: string;
    database: string;
};

type EnvironmentConfig = {
    SERVER_PORT: number;
    DB: DBConfig;
    SERVER_ENVIRONMENT: string;
};


const envConfig: EnvironmentConfig = {
    SERVER_PORT: Number(process.env.SERVER_PORT) || 4050,
    DB: {
        host: process.env.DB_HOST || 'localhost',
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'root',
        database: process.env.DB_NAME || 'lotuslab',
    },
    SERVER_ENVIRONMENT: process.env.SERVER_ENVIRONMENT || 'development',
};

export default envConfig;
