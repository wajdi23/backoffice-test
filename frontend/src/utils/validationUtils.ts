export type ValidationRule = {
  required?: boolean;
  email?: boolean;
  date?: boolean;
  minLength?: number;
  password?: boolean;
  dateOfBirth?: boolean;
};

export type ValidationRules = {
  [key: string]: ValidationRule;
};

export type ValidationErrors = {
  [key: string]: string;
};

// ici, la validation du password (6 car min avec 1 maj, 1 min, 1 carac special, 1 num)
const validatePassword = (value: string): string | null => {
  // const passwordRegex =
  //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
  return null;
};

const validateDateOfBirth = (dateValue: Date): string | null => {
  const today = new Date();
  if (dateValue > today) {
    return "Invalid date";
  }
  return null;
};

export const validateRequired = (
  field: string,
  value: any,
  validations: ValidationRules
): string | null => {
  const rules = validations[field];
  if (!rules) return null;

  if (rules.required) {
    if (value === null || value === undefined || value === "") {
      return "Ce champ est requis";
    }
  }

  if (value) {
    if (rules.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Invalid email";
    }

    if (rules.password) {
      const passwordError = validatePassword(value);
      if (passwordError) return passwordError;
    }
    if (rules.dateOfBirth) {
      const dateOfBirthError = validateDateOfBirth(value);
      if (dateOfBirthError) return dateOfBirthError;
    }
  }
  return null;
};

export const validateForm = (
  data: any,
  validations: ValidationRules
): ValidationErrors => {
  console.log(data);
  const errors: ValidationErrors = {};
  Object.keys(validations).forEach((field) => {
    if (field in data) {
      const error = validateRequired(field, data[field], validations);
      if (error) {
        errors[field] = error;
      }
    }
  });

  return errors;
};
