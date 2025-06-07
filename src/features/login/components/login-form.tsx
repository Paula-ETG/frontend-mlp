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

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const loginMutation = useLogin({
    mutationConfig: {
      onSuccess: (data) => {
        console.log(data);
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
      <p>{errorMessage}</p>
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
              <Button type="submit">Sign In</Button>
            </div>
          </>
        )}
      </Form>
    </>
  );
};
