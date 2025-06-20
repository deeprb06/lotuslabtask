import { createCustomer, findCustomer } from '../model/customer.model';
import { findOrderById, getOrderLines, insertOrder, insertOrderLine } from '../model/order.model';
import { CreateOrderType } from '../types/order';

export async function createOrder(data: CreateOrderType) {
    const existingCustomer = await findCustomer(data.email);
    const customerId = existingCustomer
        ? existingCustomer.ice_cream_customers_id
        : await createCustomer(data.name || '', data.email);
    const orderData = await insertOrder(customerId, data.pickup_date);

    if (!orderData.success) throw new Error(orderData.error);

    const orderId = orderData.data.insertId;

    for (const scoop of data.scoops) {
        for (const toppingId of scoop.topping_ids) {
            await insertOrderLine({
                orderId,
                flavorId: scoop.flavor_id,
                toppingId,
                containerId: data.container_id,
            });
        }
    }

    return orderId;
}

export async function getOrderById(orderId: number) {
    const result = await findOrderById(orderId);
    if (!result.success || !result.data.length) return null;

    const order = result.data[0];

    const orderLines = await getOrderLines(orderId);
    if (!orderLines.success) throw new Error(orderLines.error);

    return {
        order_id: order.ice_cream_orders_id,
        pickup_date: order.pickup_date,
        lines: orderLines.data,
    };
}
