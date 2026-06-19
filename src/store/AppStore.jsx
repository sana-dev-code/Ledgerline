import { useReducer } from "react";
import { AppContext } from "./AppContext";

import { can } from "../constants/permissions";
import { authService } from "../services/authService";
import { uid } from "../utils/format";

import clients from "../data/clients.json";
import users from "../data/users.json";
import txns from "../data/transactions.json";
import banks from "../data/bankFeeds.json";
import flags from "../data/flags.json";
import audit from "../data/audit.json";


const saved = authService.session();

const initialState = {
  token: saved?.token || "",
  userId: saved?.userId || "",
  clientId: "acme",

  clients,
  users,
  txns,
  banks,
  flags,
  audit,

  selectedTxn: "",
  selectedBanks: [],
  pinnedClients: ["acme"],
  recentClients: ["acme"],

  toast: "",
};

function addLog(state, text) {
  return [
    {
      id: uid(),
      clientId: state.clientId,
      text,
      at: new Date().toLocaleString(),
    },
    ...state.audit,
  ];
}

function reducer(state, action) {
  const user = state.users.find((u) => u.id === state.userId);
  const role = user?.role;

  if (action.type === "LOGIN") {
    const token = authService.login(action.user);
    return {
      ...state,
      token,
      userId: action.user.id,
      toast: "Login successful",
    };
  }

  if (action.type === "LOGOUT") {
    authService.logout();
    return {
      ...state,
      token: "",
      userId: "",
      toast: "",
    };
  }

  if (action.type === "CLIENT") {
    return {
      ...state,
      clientId: action.id,
      recentClients: [
        action.id,
        ...state.recentClients.filter((x) => x !== action.id),
      ].slice(0, 5),
      selectedTxn: "",
      selectedBanks: [],
    };
  }

  if (action.type === "PIN" && can(role, "pinClient")) {
    return {
      ...state,
      pinnedClients: state.pinnedClients.includes(action.id)
        ? state.pinnedClients.filter((x) => x !== action.id)
        : [...state.pinnedClients, action.id],
      toast: "Client pin updated",
    };
  }

  if (action.type === "ADD_CLIENT" && can(role, "manageClients")) {
    return {
      ...state,
      clients: [...state.clients, action.client],
      audit: addLog(state, `${action.user} added new client ${action.client.name}`),
      toast: "Client added successfully",
    };
  }

  if (action.type === "SELECT_TXN") {
    return {
      ...state,
      selectedTxn: action.id,
    };
  }

  if (action.type === "TOGGLE_BANK") {
    return {
      ...state,
      selectedBanks: state.selectedBanks.includes(action.id)
        ? state.selectedBanks.filter((x) => x !== action.id)
        : [...state.selectedBanks, action.id],
    };
  }

  if (action.type === "MATCH" && can(role, "match")) {
    const txn = state.txns.find((t) => t.id === state.selectedTxn);

    if (!txn || !state.selectedBanks.length) {
      return {
        ...state,
        toast: "Select one transaction and at least one bank record",
      };
    }

    const total = state.banks
      .filter((b) => state.selectedBanks.includes(b.id))
      .reduce((sum, b) => sum + b.amount, 0);

    const status = total === txn.amount ? "Matched" : "Partial Match";

    return {
      ...state,
      txns: state.txns.map((t) =>
        t.id === txn.id ? { ...t, status } : t
      ),
      selectedTxn: "",
      selectedBanks: [],
      audit: addLog(state, `${action.user} matched ${txn.name} as ${status}`),
      toast: status,
    };
  }

  if (action.type === "OVERRIDE" && can(role, "override")) {
    return {
      ...state,
      txns: state.txns.map((t) =>
        t.id === state.selectedTxn
          ? { ...t, status: "Manually Overridden" }
          : t
      ),
      audit: addLog(state, `${action.user} manually overrode a transaction`),
      toast: "Manual override applied",
    };
  }

  if (action.type === "FLAG" && can(role, "flag")) {
    return {
      ...state,
      flags: [
        {
          id: uid(),
          clientId: state.clientId,
          entity: action.entity,
          status: "Open",
          note: action.note,
        },
        ...state.flags,
      ],
      audit: addLog(state, `${action.user} created review flag`),
      toast: "Flag created",
    };
  }

  if (action.type === "FLAG_STATUS" && can(role, "changeFlag")) {
    return {
      ...state,
      flags: state.flags.map((f) =>
        f.id === action.id ? { ...f, status: action.status } : f
      ),
      audit: addLog(state, `Flag moved to ${action.status}`),
      toast: "Flag status updated",
    };
  }

  return state;
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}