import { LoginForm } from "./login-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";

import journeyAILogoFull from "@/assets/logo/JourneyAI-Logo-Full.svg";

export const LoginDialog = ({ toggleLogin }: { toggleLogin: boolean }) => {
  return (
    <Dialog open={toggleLogin}>
      <DialogContent className="w-sm max-w-sm" showCloseButton={false}>
        <DialogHeader className="text-center items-center">
          <img src={journeyAILogoFull} width={120} />
          <DialogDescription className="text-2xl font-mabry-pro-bold text-center text-black">
            Bring your ideas to life, ask Journey.
          </DialogDescription>
        </DialogHeader>
        <LoginForm />
      </DialogContent>
    </Dialog>
  );
};
