
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SentimentBadge } from "@/components/SentimentBadge";
import { AnalysisResponse } from "@/lib/api";
import { Play, Pause, Volume2 } from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface SummaryCardProps {
  data: AnalysisResponse;
  companyName: string;
}

export function SummaryCard({ data, companyName }: SummaryCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-soft overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between">
            <span>News Sentiment Summary: {companyName}</span>
            <SentimentBadge 
              sentiment={data.overallSentiment.label} 
              score={data.overallSentiment.score}
              className="ml-2"
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm">
            <p>
              Based on the analysis of {data.articles.length} recent news articles about {companyName}, 
              the overall sentiment is {data.overallSentiment.label} with a score of {data.overallSentiment.score.toFixed(2)}.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.topPositive && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium flex items-center">
                  <span className="mr-2">Most Positive Article</span>
                  <SentimentBadge sentiment="positive" score={data.topPositive.sentiment.score} />
                </h3>
                <p className="text-xs text-muted-foreground">{data.topPositive.title}</p>
                <p className="text-xs">{data.topPositive.summary}</p>
              </div>
            )}
            
            {data.topNegative && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium flex items-center">
                  <span className="mr-2">Most Negative Article</span>
                  <SentimentBadge sentiment="negative" score={data.topNegative.sentiment.score} />
                </h3>
                <p className="text-xs text-muted-foreground">{data.topNegative.title}</p>
                <p className="text-xs">{data.topNegative.summary}</p>
              </div>
            )}
          </div>
          
          {data.audioUrl && (
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2 flex items-center">
                <Volume2 size={16} className="mr-1" />
                Audio Summary (Hindi)
              </h3>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full h-8 w-8 p-0 flex items-center justify-center"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </Button>
                <audio
                  ref={audioRef}
                  src={data.audioUrl}
                  onEnded={() => setIsPlaying(false)}
                  className="hidden"
                />
                <div className="text-xs text-muted-foreground">
                  Click to play Hindi summary
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
