import Joi from "joi";

const registerSchema = Joi.object({
  username: Joi.string()
    .pattern(/^[a-zA-Z0-9]{6,30}$/)
    .trim()
    .required(),
  password: Joi.string()
    .pattern(/^[a-zA-z0-9]{6,30}$/)
    .trim()
    .required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).trim().required(),
});

export { registerSchema };
