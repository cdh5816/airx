import { Role } from '@prisma/client';

/**
 * Define actions for RBAC. Expand as necessary.
 */
export enum Action {
  CreateSite = 'CreateSite',
  UpdateSite = 'UpdateSite',
  ViewSite = 'ViewSite',
  CreateShipment = 'CreateShipment',
  ConfirmShipment = 'ConfirmShipment',
  CreateNote = 'CreateNote',
  CreateRequest = 'CreateRequest',
  UploadDocument = 'UploadDocument',
  AccessProduction = 'AccessProduction',
  ChangeStatus = 'ChangeStatus'
}

// Map roles to actions allowed.
const rolePermissions: Record<Role, Action[]> = {
  [Role.ADMIN]: Object.values(Action),
  [Role.SALES_TEAM]: [Action.CreateSite, Action.UpdateSite, Action.ViewSite, Action.CreateNote, Action.CreateRequest],
  [Role.ORDER_TEAM]: [Action.CreateSite, Action.UpdateSite, Action.ViewSite, Action.CreateNote, Action.CreateRequest],
  [Role.CONSTRUCTION_TEAM]: [Action.UpdateSite, Action.ViewSite, Action.CreateNote, Action.CreateRequest, Action.ConfirmShipment],
  [Role.PRODUCTION_TEAM]: [Action.ViewSite, Action.CreateShipment, Action.ConfirmShipment, Action.AccessProduction],
  [Role.PAINT_SHIPPING_TEAM]: [Action.ViewSite, Action.ConfirmShipment],
  [Role.PARTNER]: [Action.ViewSite],
  [Role.CUSTOMER]: [Action.ViewSite, Action.CreateRequest]
};

/**
 * Check if a user role can perform a given action.
 */
export function canPerform(role: Role, action: Action): boolean {
  return rolePermissions[role]?.includes(action) || false;
}