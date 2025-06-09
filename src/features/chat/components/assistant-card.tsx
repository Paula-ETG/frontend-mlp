import { Card, CardAction, CardContent } from "@/components/ui/card";
// import { BookUp2 } from "lucide-react";

export const AssistantCard = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <Card className="bg-transparent hover:bg-muted/50 md:max-w-96 sm:max-w-96 py-4 px-3">
      <CardAction onClick={() => console.log("click")}>
        <CardContent className="px-3">
          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-col text-left gap-1">
              <p className="text-2xl font-mabry-pro-bold">{title}</p>
              <p className="text-gray-600">{description}</p>
            </div>
          </div>
        </CardContent>
      </CardAction>
    </Card>
  );
};
