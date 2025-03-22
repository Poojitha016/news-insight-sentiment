
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SentimentBadgeProps {
  sentiment: "positive" | "negative" | "neutral";
  score?: number;
  className?: string;
}

export function SentimentBadge({ sentiment, score, className }: SentimentBadgeProps) {
  const getColor = () => {
    switch (sentiment) {
      case "positive":
        return "bg-positive-light text-positive border-positive/20";
      case "negative":
        return "bg-negative-light text-negative border-negative/20";
      case "neutral":
      default:
        return "bg-neutral-light text-neutral border-neutral/20";
    }
  };

  return (
    <Badge 
      className={cn(
        "h-6 px-2 py-0 font-medium border",
        getColor(),
        className
      )}
    >
      {sentiment}{score !== undefined && `: ${Math.abs(score).toFixed(1)}`}
    </Badge>
  );
}
