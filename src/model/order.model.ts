import { executeQuery } from '../config/db';
import { CreateOrderLineType } from '../types/order';

export async function insertOrder(customerId: number, pickup_date: string) {
    return await executeQuery<{
        insertId: number;
    }>(`INSERT INTO ice_cream_orders (fk_ice_cream_customers_id, created_date, pickup_date) VALUES (?, NOW(), ?)`, [
        customerId,
        pickup_date,
    ]);
}

export async function insertOrderLine({
    orderId,
    flavorId,
    toppingId,
    containerId,
    price = 0.0,
    qty = 1,
}: CreateOrderLineType): Promise<void> {
    const result = await executeQuery(
        `INSERT INTO ice_cream_order_lines (
      fk_ice_cream_orders_id,
      fk_ice_cream_flavors_id,
      fk_ice_cream_toppings_id,
      fk_ice_cream_containers_id,
      created_date,
      ice_cream_order_lines_price,
      ice_cream_order_lines_qty
    ) VALUES (?, ?, ?, ?, NOW(), ?, ?)`,
        [orderId, flavorId, toppingId, containerId, price, qty],
    );

    if (!result.success) {
        throw new Error(result.error);
    }
}

export async function findOrderById(orderId: number) {
    return await executeQuery<any>(
        `SELECT ice_cream_orders_id, pickup_date
     FROM ice_cream_orders
     WHERE ice_cream_orders_id = ?`,
        [orderId],
    );
}

export async function getOrderLines(orderId: number) {
    return await executeQuery<any>(
        `SELECT * FROM ice_cream_order_lines
     WHERE fk_ice_cream_orders_id = ?`,
        [orderId],
    );
}
