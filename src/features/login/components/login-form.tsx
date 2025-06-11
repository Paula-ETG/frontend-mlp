import { Form } from "@/components/ui/react-hook-form-wrapper";
import { Button } from "@/components/ui/button";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { useState } from "react";
import { EyeIcon, EyeClosed } from "lucide-react";
import { useLogin, loginInput, type LoginData } from "../api/login";
import { resolveAxiosError } from "@/utils/resolve-error";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-user";

interface LoginFormProps {
  onSuccess?: (data: any) => void;
}

export const LoginForm = ({ onSuccess }: LoginFormProps = {}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const { setToken } = useAuth();

  const loginMutation = useLogin({
    mutationConfig: {
      onSuccess: (data) => {
        console.log("Login successful:", data);
        // Store the token in localStorage via auth context
        setToken(data.access_token, data.api_key);
        // Call external onSuccess if provided
        onSuccess?.(data);
      },
      onError: (error) => {
        const errMessage = resolveAxiosError(error);
        setErrorMessage(errMessage);
      },
    },
  });

  const handleSubmit = (values: LoginData) => {
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("password", values.password);
    loginMutation.mutate(formData);
  };

  return (
    <>
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      <Form
        onSubmit={handleSubmit}
        schema={loginInput}
        options={{
          defaultValues: {
            username: "",
            password: "",
          },
        }}
      >
        {({ control }) => (
          <>
            <FormField
              control={control}
              name="username"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your username"
                      {...field}
                    />
                  </FormControl>
                  {error?.message && (
                    <FormDescription className="text-red-500">
                      {error.message}
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="password"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      endIcon={
                        showPassword ? (
                          <EyeClosed
                            className="text-muted-foreground cursor-pointer"
                            onClick={() => setShowPassword(false)}
                          />
                        ) : (
                          <EyeIcon
                            className="text-muted-foreground cursor-pointer"
                            onClick={() => setShowPassword(true)}
                          />
                        )
                      }
                      {...field}
                    />
                  </FormControl>
                  {error?.message && (
                    <FormDescription className="text-red-500">
                      {error.message}
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />
            <div className="grid">
              <Button type="submit" disabled={loginMutation.isPending}>
                {loginMutation.isPending ? "Signing In..." : "Sign In"}
              </Button>
            </div>
          </>
        )}
      </Form>
    </>
  );
};
