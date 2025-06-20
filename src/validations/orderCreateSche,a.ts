import Joi from 'joi';

export const orderCreateSchemaValidation = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().optional(),
    pickup_date: Joi.date().iso().required(),
    container_id: Joi.number().integer().positive().required(),
    scoops: Joi.array()
        .items(
            Joi.object({
                flavor_id: Joi.number().integer().positive().required(),
                topping_ids: Joi.array().items(Joi.number().integer().positive()).min(0).required(),
            }),
        )
        .min(1)
        .required(),
});
