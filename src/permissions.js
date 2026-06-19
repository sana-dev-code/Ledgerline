export const permissions = {
  Admin: [
    "match", "override", "flag", "comment",
    "saveReport", "export", "approve",
    "pinClient", "changeFlag", "manageClients"
  ],
  "Senior Accountant": [
    "match", "override", "flag", "comment",
    "saveReport", "export", "approve", "changeFlag"
  ],
  "Junior Accountant": ["match", "flag", "comment"],
};

export const can = (role, action) =>
  permissions[role]?.includes(action);