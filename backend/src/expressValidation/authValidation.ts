import * as Joi from "joi";
import { join } from "path";

class AuthValidation {
  async registrationValidation(reqBody) {
    const userSchema = Joi.object().keys({
      email: Joi.string().email().lowercase().required(),
      password: Joi.string().min(3).max(10).required(),
      confirmPassword: Joi.ref("password"),
      fullName: Joi.string().required(),
    });
    const { error, value } = userSchema.validate(reqBody, {
      abortEarly: false,
    });

    if (error) {
      return { status: false, error: error.details };
    } else {
      return { status: true, data: value };
    }
  }

  async loginValidation(reqBody) {
    const userSchema = await Joi.object().keys({
      email: Joi.string().email().lowercase().required(),
      password: Joi.string().min(3).max(10).required(),
    });
    const { error, value } = userSchema.validate(reqBody, {
      abortEarly: false,
    });

    if (error) {
      return { status: false, error: error.details };
    } else {
      return { status: true, data: value };
    }
  }

  async changePasswordValidation(reqBody) {
    const userSchema = Joi.object().keys({
      currentPassword: Joi.string().min(3).max(10).required(),
      password: Joi.string().min(3).max(10).required(),
      confirmPassword: Joi.ref("password"),
    });
    const { error, value } = userSchema.validate(reqBody, {
      abortEarly: false,
    });

    if (error) {
      return { status: false, error: error.details };
    } else {
      return { status: true, data: value };
    }
  }
  async forgotPasswordValidation(reqBody) {
    const userSchema = Joi.object().keys({
      email: Joi.string().email().lowercase().required(),
    });
    const { error, value } = userSchema.validate(reqBody, {
      abortEarly: false,
    });

    if (error) {
      return { status: false, error: error.details };
    } else {
      return { status: true, data: value };
    }
  }

  async resetPasswordValidation(reqBody) {
    const userSchema = Joi.object().keys({
      password: Joi.string().min(3).max(10).required(),
      confirmPassword: Joi.ref("password"),
    });
    const { error, value } = userSchema.validate(reqBody, {
      abortEarly: false,
    });

    if (error) {
      return { status: false, error: error.details };
    } else {
      return { status: true, data: value };
    }
  }
}
const authValidation = new AuthValidation();
export default authValidation;
