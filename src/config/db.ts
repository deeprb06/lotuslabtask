import mysql from 'mysql2/promise';
import envConfig from '.';
import logger from '../utils/logger';

let pool: mysql.Pool;

export const initDB = async () => {
    if (!pool) {
        pool = mysql.createPool({
            host: envConfig.DB.host,
            user: envConfig.DB.username,
            password: envConfig.DB.password,
            database: envConfig.DB.database,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
        logger.info('MySQL pool created successfully.');
    }
};


export async function executeQuery<T = any>(
    query: string,
    params: unknown[] = [],
): Promise<{ success: true; data: T } | { success: false; error: string }> {
    try {
        if (!pool) throw new Error('DB pool not initialized');
        const [rows] = await pool.execute(query, params);
        return {
            success: true,
            data: rows as T,
        };
    } catch (error: any) {
        logger.error('DB Query Error:', error);
        return {
            success: false,
            error: error.message || 'Unknown DB error',
        };
    }
}
