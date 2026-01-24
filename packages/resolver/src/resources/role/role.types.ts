import type { ServicesValues } from '@lafken/common';

export interface RoleProps {
  /**
   * List of services for enable permissions in role
   */
  services: ServicesValues;
  /**
   * Role name
   */
  name: string;
  /**
   * Reference to aws service
   */
  principal?: string;
}
