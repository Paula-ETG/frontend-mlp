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
    if (isAuthenticated && user) {
      // Small delay to ensure the data is loaded
      const timer = setTimeout(() => {
        setShouldRedirect(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, user]);

  // Redirect to dashboard after authentication
  if (shouldRedirect) {
    // If user has accounts, redirect to first account, otherwise to dashboard
    if (accounts && accounts.length > 0) {
      return <Navigate to={`/${accounts[0].id}`} replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <LoginDialog toggleLogin={true} />
    </div>
  );
};
