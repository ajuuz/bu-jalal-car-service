export type FormState<T extends Record<string, any>> = {
  success: boolean;
  message?: string;
  errors?: Partial<Record<keyof T, string[]>>;
  values:T
};