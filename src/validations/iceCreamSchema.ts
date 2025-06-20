import Joi from 'joi';

export const iceCreamListQuerySchema = Joi.object({
    type: Joi.string().valid('flavour', 'topping', 'container').required(),
});
