
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SentimentBadge } from "@/components/SentimentBadge";
import { NewsArticle } from "@/lib/api";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface NewsCardProps {
  article: NewsArticle;
  index: number;
}

export function NewsCard({ article, index }: NewsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Card className="overflow-hidden h-full shadow-soft hover:shadow-medium transition-shadow duration-300">
        <CardHeader className="p-4 space-y-2 border-b">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-medium text-sm">
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors flex items-center gap-1 group"
              >
                {article.title}
                <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </h3>
            <SentimentBadge sentiment={article.sentiment.label} score={article.sentiment.score} />
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{article.source}</span>
            <span>{article.date}</span>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">{article.summary}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
