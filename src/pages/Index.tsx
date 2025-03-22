import { useState } from "react";
import { SearchForm } from "@/components/SearchForm";
import { SummaryCard } from "@/components/SummaryCard";
import { NewsCard } from "@/components/NewsCard";
import { SentimentChart } from "@/components/SentimentChart";
import { fetchNewsAnalysis, generateTTS, type AnalysisResponse } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { BarChart, Newspaper, ScanSearch, Volume2 } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const [companyName, setCompanyName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analysisData, setAnalysisData] = useState<AnalysisResponse | null>(null);
  const [activeTab, setActiveTab] = useState<string>("articles");
  
  const handleSearch = async (company: string) => {
    setIsLoading(true);
    setCompanyName(company);
    
    try {
      const data = await fetchNewsAnalysis(company);
      
      const summaryText = `${company} की समाचार विश्लेषण के अनुसार, कुल ${data.articles.length} लेख प्राप्त हुए। समग्र भावना ${data.overallSentiment.label} है, जिसका स्कोर ${data.overallSentiment.score.toFixed(2)} है।`;
      const audioUrl = await generateTTS(summaryText, "hi");
      
      setAnalysisData({
        ...data,
        audioUrl
      });
      
      toast.success(`Analysis complete for ${company}`);
    } catch (error) {
      console.error("Error in search flow:", error);
      toast.error(`Failed to analyze news for ${company}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            News Insight & Sentiment Analysis
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Extract, summarize, and analyze sentiment from news articles about any company.
          </p>
        </motion.div>
        
        <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        
        {isLoading && (
          <div className="flex flex-col items-center justify-center mt-16 space-y-4">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin"></div>
            </div>
            <p className="text-muted-foreground">Analyzing news for {companyName}...</p>
          </div>
        )}
        
        {!isLoading && analysisData && (
          <motion.div 
            className="mt-12 space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <SummaryCard data={analysisData} companyName={companyName} />
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8">
                <TabsTrigger value="articles" className="flex items-center gap-2">
                  <Newspaper size={16} />
                  Articles
                </TabsTrigger>
                <TabsTrigger value="chart" className="flex items-center gap-2">
                  <BarChart size={16} />
                  Chart
                </TabsTrigger>
                <TabsTrigger value="analyze" className="flex items-center gap-2">
                  <ScanSearch size={16} />
                  Query
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="articles" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {analysisData.articles.map((article, index) => (
                    <NewsCard key={index} article={article} index={index} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="chart">
                <SentimentChart articles={analysisData.articles} />
              </TabsContent>
              
              <TabsContent value="analyze">
                <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-soft">
                  <h2 className="text-xl font-semibold mb-4">Ask Questions About The News</h2>
                  <div className="space-y-4">
                    <Input 
                      placeholder="Ask a question about the news analysis..." 
                      className="w-full"
                    />
                    <Button className="w-full">Ask Question</Button>
                    
                    <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground">
                        Examples:
                      </p>
                      <div className="mt-2 space-y-2">
                        {["What is the main positive news?", "Summarize the negative articles", "When was the most recent article published?"].map((q, i) => (
                          <Button 
                            key={i} 
                            variant="outline" 
                            size="sm" 
                            className="mr-2 mb-2"
                          >
                            {q}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        )}
        
        {!isLoading && !analysisData && (
          <motion.div
            className="flex flex-col items-center justify-center mt-16 space-y-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-64 h-64 rounded-full bg-gray-100 flex items-center justify-center">
              <Newspaper className="h-24 w-24 text-gray-300" />
            </div>
            <div className="max-w-md">
              <h3 className="text-xl font-semibold mb-2">Enter a company name to begin</h3>
              <p className="text-muted-foreground">
                Search for any company to extract, summarize, and analyze news articles.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Index;
