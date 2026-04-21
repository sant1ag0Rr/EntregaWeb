/**
 * DOMAIN - Entidad User
 * 
 * Esta es la entidad principal del dominio.
 * Representa la estructura de un usuario con id, name y email.
 */

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

/**
 * DTO para crear un usuario
 * (Data Transfer Object - no incluye id ni createdAt)
 */
export interface CreateUserDTO {
  name: string;
  email: string;
}

/**
 * DTO para actualizar un usuario
 */
export interface UpdateUserDTO {
  name?: string;
  email?: string;
}
