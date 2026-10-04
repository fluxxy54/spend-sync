import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type UserCardProps = {
  name: string;
  number: number;
  percent: string;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);

export function SectionCard({ name, number, percent }: UserCardProps) {
  return (
    <Card className="h-full border-border/70 bg-card/80 shadow-sm transition-shadow hover:shadow-md">
      <CardHeader className="gap-3">
        <div className="flex items-start justify-between gap-3">
          <CardDescription className="text-sm text-muted-foreground">
            {name}
          </CardDescription>
          <CardAction>
            <Badge variant="outline">{percent}</Badge>
          </CardAction>
        </div>
        <CardTitle className="text-2xl font-semibold tabular-nums tracking-tight text-foreground @[250px]/card:text-3xl">
          {formatCurrency(number)}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
