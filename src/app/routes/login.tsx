import { LoginDialog } from "@/features/login/components/login-dialog";
import { useAuth } from "@/hooks/use-user";
import { Navigate } from "react-router";
import { useEffect, useState } from "react";
import { useAccounts } from "@/features/chat/api/get-accounts";

export const LoginPage = () => {
  const { isAuthenticated, user } = useAuth();
  const { data: accounts } = useAccounts({
    queryConfig: { enabled: isAuthenticated },
  });
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user && accounts) {
      // Small delay to ensure the data is loaded
      const timer = setTimeout(() => {
        setShouldRedirect(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, user, accounts]);

  // Redirect to first available account if user is authenticated
  if (shouldRedirect && accounts && accounts.length > 0) {
    return <Navigate to={`/${accounts[0].id}`} replace />;
  }

  // If authenticated but no accounts, redirect to a default route
  if (shouldRedirect && (!accounts || accounts.length === 0)) {
    return <Navigate to="/no-accounts" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <LoginDialog toggleLogin={true} />
    </div>
  );
};
