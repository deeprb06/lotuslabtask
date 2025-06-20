import { executeQuery } from '../config/db';

export async function getProductList() {
    const query = `
    SELECT 'flavour' AS type, ice_cream_flavors_id AS id, ice_cream_flavors_name AS name FROM ice_cream_flavors
    UNION ALL
    SELECT 'topping' AS type, ice_cream_toppings_id AS id, ice_cream_toppings_name AS name FROM ice_cream_toppings
    UNION ALL
    SELECT 'container' AS type, ice_cream_containers_id AS id, ice_cream_containers_name AS name FROM ice_cream_containers;
    `;

    return await executeQuery(query);
}
