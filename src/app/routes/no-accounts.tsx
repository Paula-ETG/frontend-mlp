import { useAuth } from "@/hooks/use-user";
import { Button } from "@/components/ui/button";

export const NoAccountsPage = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          No Accounts Found
        </h1>
        <p className="text-gray-600 mb-6">
          You don't have access to any accounts yet. Please contact your
          administrator or create a new account.
        </p>
        <Button onClick={logout} className="w-full">
          Sign Out
        </Button>
      </div>
    </div>
  );
};
