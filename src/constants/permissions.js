export const ROLE_TABS = {
  Admin: ["dashboard", "clients", "statements", "reconcile", "reports", "flags", "audit"],
  "Senior Accountant": ["dashboard", "statements", "reconcile", "reports", "flags", "audit"],
  "Junior Accountant": ["dashboard", "statements", "reconcile", "flags"],
};

export const PERMISSIONS = {
  Admin: ["manageClients", "pinClient", "match", "override", "flag", "comment", "changeFlag", "saveReport", "export"],
  "Senior Accountant": ["match", "override", "flag", "comment", "changeFlag", "saveReport", "export"],
  "Junior Accountant": ["match", "flag", "comment"],
};

export const can = (role, action) => PERMISSIONS[role]?.includes(action);