import { AppProvider } from "./store/AppStore";
import { useApp } from "./hooks/useApp";
import { ROLE_TABS } from "./constants/permissions";
import { useRoute } from "./hooks/useRoute";
import { useEffect } from "react";
import AppLayout from "./components/AppLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Statements from "./pages/Statements";
import Reconcile from "./pages/Reconcile";
import Reports from "./pages/Reports";
import Flags from "./pages/Flags";
import Audit from "./pages/Audit";

const pages = {
  dashboard: <Dashboard />,
  clients: <Clients />,
  statements: <Statements />,
  reconcile: <Reconcile />,
  reports: <Reports />,
  flags: <Flags />,
  audit: <Audit />,
};

function Router() {
  const { state } = useApp();
  const { route, go } = useRoute();

  useEffect(() => {
    if (!state.token && location.hash) {
      history.replaceState(null, "", location.pathname);
    }
  }, [state.token]);

  if (!state.token) return <Login go={go} />;

  const user = state.users.find((u) => u.id === state.userId);
  const allowedTabs = ROLE_TABS[user.role] || [];
  const safeRoute = allowedTabs.includes(route) ? route : "dashboard";

  return (
    <AppLayout route={safeRoute} go={go}>
      {pages[safeRoute]}
    </AppLayout>
  );
}
export default function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
}