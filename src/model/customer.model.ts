import { executeQuery } from '../config/db';

export async function findCustomer(email: string) {
    const result = await executeQuery(
        'SELECT ice_cream_customers_id FROM ice_cream_customers WHERE ice_cream_customers_email = ?',
        [email],
    );
    if (result.success && result.data.length) {
        return result.data[0];
    }
    return null;
}

export async function createCustomer(name: string, email: string) {
    const result = await executeQuery(
        'INSERT INTO ice_cream_customers (ice_cream_customers_name, ice_cream_customers_email, created_date) VALUES (?, ?, NOW())',
        [name, email],
    );
    if (result.success) {
        return result.data.insertId;
    } else {
        throw new Error(result.error);
    }
}
