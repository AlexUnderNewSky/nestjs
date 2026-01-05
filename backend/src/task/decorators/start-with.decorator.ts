import { registerDecorator } from 'class-validator';
import type { ValidationOptions, ValidationArguments } from 'class-validator/types';

export function StartsWith(
  prefix: string,
  validationOptions?: ValidationOptions,
) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'startsWith',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && value.startsWith(prefix);
        },
        defaultMessage(args: ValidationArguments) {
          return `Name must start with "${prefix}"`;
        },
      },
    });
  };
}
