import { Card, CardAction, CardContent } from "@/components/ui/card";

export const AssistantCard = ({
  id,
  title,
  description,
  handleClick,
}: {
  id: string;
  title: string;
  description?: string;
  handleClick: (id: string) => void;
}) => {
  return (
    <Card className="bg-transparent hover:bg-muted/50 md:max-w-96 sm:max-w-96 py-4 px-3 hover:cursor-pointer">
      <CardAction onClick={() => handleClick(id)}>
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
