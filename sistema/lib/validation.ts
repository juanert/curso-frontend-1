/** Reglas de validación compartidas por los formularios. */

export const MIN_PASSWORD_LENGTH = 8;

/** Validación simple de formato de correo. */
export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** Mensaje de error para contraseñas cortas (null si es válida). */
export function passwordError(value: string): string | null {
  if (value.length < MIN_PASSWORD_LENGTH) {
    return `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`;
  }
  return null;
}
