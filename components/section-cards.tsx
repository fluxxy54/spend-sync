// import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
//   CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type UserCardProps = {
  name: string;
  number: number;
  percent: string;
};

export function SectionCard({ name, number, percent }: UserCardProps) {
  return (
    <div>
      <Card className="">
        <CardHeader>
          <CardDescription> {name} </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {number}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">{percent}</Badge>  
          </CardAction>
        </CardHeader>
      </Card>
    </div>
  );
}
