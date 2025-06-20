import app from './app';
import envConfig from './src/config';
import { initDB } from './src/config/db';
import logger from './src/utils/logger';

app.listen(envConfig.SERVER_PORT, async () => {
    await initDB()
    logger.info(`Backend server is running on port ${envConfig.SERVER_PORT}`);
});
