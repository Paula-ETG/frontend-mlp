import { Card, CardContent } from "@/components/ui/card";
import { BookUp2 } from "lucide-react";

export const AssistantCard = () => {
  return (
    <Card className="bg-transparent hover:bg-muted/50 md:max-w-96 sm:max-w-96 py-4 px-3">
      <CardContent className="px-3">
        <div className="flex flex-row items-center gap-2">
          <BookUp2 size={100} min={100} className="text-gray-600" />
          <div className="flex flex-col text-left gap-1">
            <p className="text-2xl font-mabry-pro-bold">Lead Generation</p>
            <p className="text-gray-600">
              Generate a list of potential leads for your sales pipeline
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
