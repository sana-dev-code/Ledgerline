export const clients = [
  { id: "acme", name: "ACME Retail LLC", pinned: true },
  { id: "metro", name: "Metro Foods", pinned: false },
  { id: "tech", name: "TechSoft Ltd", pinned: false },
];

export const users = [
  { id: "u1", name: "Admin User", role: "Admin", email: "admin@ledgerline.com", password: "123456" },
  { id: "u2", name: "Sarah Chen", role: "Senior Accountant", email: "senior@ledgerline.com", password: "123456" },
  { id: "u3", name: "Marcus Lee", role: "Junior Accountant", email: "junior@ledgerline.com", password: "123456" },
];

export const permissions = {
  Admin: ["approve", "export", "reconcile", "comment", "flag"],
  "Senior Accountant": ["approve", "export", "reconcile", "comment", "flag"],
  "Junior Accountant": ["reconcile", "comment", "flag"],
};

export const statements = {
  balance: [
    ["ASSETS", "", "", ""], ["Current Assets", "", "", ""],
    ["Cash & Cash Equivalents", 142500, 118200, "+20.6%"],
    ["Accounts Receivable", 87300, 92100, "-5.2%"],
    ["Inventory", 215400, 198700, "+8.4%"],
    ["Total Current Assets", 457000, 420200, "+8.8%"],
    ["LIABILITIES", "", "", ""], ["Accounts Payable", 65200, 71400, "-8.7%"],
    ["EQUITY", "", "", ""], ["Retained Earnings", 114700, 82900, "+38.4%"],
  ],
  income: [
    ["REVENUE", "", "", ""], ["Product Sales", 198400, 185200, 171900],
    ["Service Revenue", 22100, 19800, 18400], ["Total Revenue", 220500, 205000, 190300],
    ["COGS", "", "", ""], ["Materials", 78200, 74100, 69800],
    ["Gross Profit", 100300, 90400, 82300], ["NET INCOME", 30500, 22100, 18850],
  ],
  cash: [
    ["OPERATING ACTIVITIES", ""], ["Net Income", 30500],
    ["Depreciation & Amortization", 4200], ["Increase in Accounts Receivable", -4800],
    ["Net Cash Operating", 35400], ["INVESTING ACTIVITIES", ""],
    ["Purchase of Equipment", -8000], ["FINANCING ACTIVITIES", ""],
    ["Repayment of Long-Term Debt", -5000], ["Cash End", 142500],
  ],
};

export const txns = [
  { id: "t1", date: "Jun 14", name: "Office Depot", amount: -284.5, status: "Unmatched" },
  { id: "t2", date: "Jun 15", name: "Client Payment - ABC", amount: 4200, status: "Unmatched" },
  { id: "t3", date: "Jun 16", name: "Payroll - Bi-weekly", amount: -18400, status: "Unmatched" },
  { id: "t4", date: "Jun 18", name: "Unknown Deposit", amount: 1500, status: "Unmatched" },
];

export const banks = [
  { id: "b1", date: "Jun 14", name: "OFFICE DEPOT #4521", amount: -284.5, score: "98%" },
  { id: "b2", date: "Jun 16", name: "WIRE TRANSFER ABC CO", amount: 4200, score: "95%" },
  { id: "b3", date: "Jun 16", name: "PAYROLL ADP RUN", amount: -18400, score: "100%" },
  { id: "b4", date: "Jun 18", name: "DEPOSIT REF 88231", amount: 750, score: "Split" },
  { id: "b5", date: "Jun 19", name: "DEPOSIT REF 88232", amount: 750, score: "Split" },
];

export const reportRows = [
  ["Engineering", "Software", 3200, 3000, "+6.7%", "4.7%"],
  ["Engineering", "Contractor Fees", 12000, 15000, "-20%", "17.5%"],
  ["Marketing", "Paid Ads", 7800, 6500, "+20%", "11.4%"],
  ["Operations", "Rent", 12000, 12000, "0%", "17.6%"],
];