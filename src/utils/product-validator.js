import Joi from "joi";

const createProductSchema = Joi.object({
  brand: Joi.string().trim().required(),
  model: Joi.string().trim().required(),
  year: Joi.number().integer().positive().required(),
  price: Joi.number().integer().positive().required(),
  color: Joi.string().trim().required(),
  mileage: Joi.number().integer().positive().required(),
  fuelType: Joi.string().trim().required(),
  transmission: Joi.string().trim().required(),
  location: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  reservePrice: Joi.number().integer().positive().required(),
  driveTrain: Joi.string().trim().required(),
  seat: Joi.number().integer().positive().required(),
  image: Joi.string().allow("", null),
});

const paymentSchema = Joi.object({
  userPhone: Joi.string()
    .pattern(/^[0-9]{10,10}$/)
    .required(),
});

export { createProductSchema, paymentSchema };
