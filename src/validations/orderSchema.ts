import Joi from 'joi';

export const createOrderSchema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().optional(),
    pickup_date: Joi.date().required(),
    container_id: Joi.number().required(),
    scoops: Joi.array()
        .items(
            Joi.object({
                flavor_id: Joi.number().required(),
                topping_ids: Joi.array().items(Joi.number()).min(1).required(),
            }),
        )
        .min(1)
        .required(),
});
