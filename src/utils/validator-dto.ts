import { ClassConstructor, plainToClass } from "class-transformer";
import { ValidationError, validate } from "class-validator";

export type ErrorValidacion = { problema: string[]; mensaje: string };
/**
 * Validate the payload will be sending or receiving, make sure the data is suitable
 * @param dto The DTO object to validate
 * @param obj The object recieved from response body
 */
export const validatorDto = async <T extends ClassConstructor<any>>(
  dto: T,
  obj: object
): Promise<ErrorValidacion> => {
  // tranform the literal object to class object
  const objInstance = plainToClass(dto, obj);
  const errores: ValidationError[] = await validate(objInstance);
  const error: ErrorValidacion = { problema: [], mensaje: "" };
  if (errores.length > 0) {
    error.mensaje = "Error de validacion";
    errores.forEach((validationError) => {
      const constraint = Object.values(validationError.constraints)[0];
      error.problema.push(constraint);
    });
    return error;
  }
  return error;
};
