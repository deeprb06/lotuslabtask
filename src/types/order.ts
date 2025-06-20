export type CreateOrderLineType = {
    orderId: number;
    flavorId: number;
    toppingId: number;
    containerId: number;
    price?: number;
    qty?: number;
};

export type Scoops = {
    flavor_id: number;
    topping_ids: number[];
}

export type CreateOrderType = {
    email: string;
    name: string;
    pickup_date: string;
    container_id: number;
    scoops: Scoops[];
}
