
import { useEffect, useRef } from 'react';
import { NewsArticle } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, ReferenceLine } from 'recharts';
import { motion } from 'framer-motion';

interface SentimentChartProps {
  articles: NewsArticle[];
}

export function SentimentChart({ articles }: SentimentChartProps) {
  const chartData = articles.map(article => ({
    source: article.source,
    sentiment: article.sentiment.score,
    title: article.title,
    color: article.sentiment.score >= 0.3 
      ? '#34C759' 
      : article.sentiment.score <= -0.3 
        ? '#FF3B30' 
        : '#8E8E93'
  }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full"
    >
      <Card className="shadow-soft overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Comparative Sentiment Analysis</CardTitle>
        </CardHeader>
        <CardContent className="p-2 pb-4">
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  type="number" 
                  domain={[-1, 1]} 
                  tickCount={5} 
                  tickFormatter={(value) => value.toFixed(1)}
                />
                <YAxis 
                  type="category" 
                  dataKey="source" 
                  width={100}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const value = payload[0].value as number;
                      return (
                        <div className="glass p-2 rounded-md text-xs shadow-md border border-gray-200">
                          <p className="font-medium mb-1">{payload[0].payload.title}</p>
                          <p>Source: <span className="font-medium">{payload[0].payload.source}</span></p>
                          <p>Sentiment: <span className="font-medium">{value.toFixed(2)}</span></p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <ReferenceLine x={0} stroke="#666" strokeWidth={1} />
                <Bar 
                  dataKey="sentiment" 
                  fill="#8884d8"
                  radius={[4, 4, 4, 4]}
                  barSize={20}
                  isAnimationActive
                  animationBegin={300}
                  animationDuration={1500}
                  animationEasing="ease-out"
                  fillOpacity={0.8}
                  stroke="none"
                  name="Sentiment Score"
                >
                  {
                    chartData.map((entry, index) => (
                      <motion.rect 
                        key={`rect-${index}`}
                        fill={entry.color}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      />
                    ))
                  }
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
