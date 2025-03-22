
import { toast } from "sonner";

export interface NewsArticle {
  title: string;
  source: string;
  url: string;
  date: string;
  summary: string;
  sentiment: {
    score: number;
    magnitude: number;
    label: "positive" | "negative" | "neutral";
  };
  content?: string;
}

export interface AnalysisResponse {
  articles: NewsArticle[];
  overallSentiment: {
    score: number;
    label: "positive" | "negative" | "neutral";
  };
  topPositive: NewsArticle | null;
  topNegative: NewsArticle | null;
  audioUrl?: string;
}

const mockNewsData: AnalysisResponse = {
  articles: [
    {
      title: "Company X Reports Stellar Q3 Earnings, Exceeding Expectations",
      source: "Financial Times",
      url: "https://example.com/article1",
      date: "2023-11-05",
      summary: "Company X announced record-breaking earnings for Q3, with revenue increasing by 25% year-over-year. The company's new product line contributed significantly to this growth.",
      sentiment: {
        score: 0.8,
        magnitude: 1.2,
        label: "positive"
      }
    },
    {
      title: "Analyst Downgrades Company X Stock Citing Supply Chain Concerns",
      source: "Wall Street Journal",
      url: "https://example.com/article2",
      date: "2023-11-03",
      summary: "A leading market analyst has downgraded Company X's stock from 'buy' to 'hold' due to ongoing supply chain disruptions that could impact product availability during the holiday season.",
      sentiment: {
        score: -0.6,
        magnitude: 0.9,
        label: "negative"
      }
    },
    {
      title: "Company X Launches New Sustainable Product Line",
      source: "TechCrunch",
      url: "https://example.com/article3",
      date: "2023-10-28",
      summary: "Company X unveiled its new environmentally friendly product line, made from 100% recycled materials. This move aligns with the company's commitment to reduce its environmental footprint.",
      sentiment: {
        score: 0.7,
        magnitude: 1.0,
        label: "positive"
      }
    },
    {
      title: "Company X Faces Lawsuit Over Alleged Patent Infringement",
      source: "Reuters",
      url: "https://example.com/article4",
      date: "2023-10-25",
      summary: "A competitor has filed a lawsuit against Company X, claiming intellectual property violations related to its flagship product. Company X denies all allegations.",
      sentiment: {
        score: -0.7,
        magnitude: 1.1,
        label: "negative"
      }
    },
    {
      title: "Company X Partners with Tech Giant on New Initiative",
      source: "Bloomberg",
      url: "https://example.com/article5",
      date: "2023-10-20",
      summary: "Company X announced a strategic partnership with a leading tech company to develop next-generation solutions for the healthcare industry. The multi-year agreement is valued at approximately $50 million.",
      sentiment: {
        score: 0.6,
        magnitude: 0.8,
        label: "positive"
      }
    },
    {
      title: "Company X CEO Discusses Future Plans in Interview",
      source: "CNBC",
      url: "https://example.com/article6",
      date: "2023-10-18",
      summary: "In a recent interview, the CEO of Company X outlined the company's five-year strategic plan, including expansion into emerging markets and investment in R&D.",
      sentiment: {
        score: 0.2,
        magnitude: 0.5,
        label: "neutral"
      }
    },
    {
      title: "Regulatory Body Launches Investigation into Company X Practices",
      source: "The Guardian",
      url: "https://example.com/article7",
      date: "2023-10-15",
      summary: "A government regulatory agency has initiated an investigation into Company X's data privacy practices following consumer complaints. The company states it is cooperating fully.",
      sentiment: {
        score: -0.5,
        magnitude: 0.7,
        label: "negative"
      }
    },
    {
      title: "Company X Opens New Headquarters, Creating 500 Jobs",
      source: "Local News Network",
      url: "https://example.com/article8",
      date: "2023-10-10",
      summary: "Company X has inaugurated its new headquarters, which will house over 1,000 employees. The expansion is expected to create approximately 500 new jobs in the region.",
      sentiment: {
        score: 0.7,
        magnitude: 0.9,
        label: "positive"
      }
    },
    {
      title: "Industry Analysis: Company X Market Position Remains Stable Despite Challenges",
      source: "Industry Today",
      url: "https://example.com/article9",
      date: "2023-10-05",
      summary: "A comprehensive industry analysis indicates that Company X has maintained its market position despite increased competition and economic headwinds.",
      sentiment: {
        score: 0.1,
        magnitude: 0.4,
        label: "neutral"
      }
    },
    {
      title: "Company X Announces Delay in Product Release",
      source: "Tech News Daily",
      url: "https://example.com/article10",
      date: "2023-10-01",
      summary: "Company X has postponed the release of its highly anticipated new product until Q1 of next year, citing quality control issues that need to be addressed.",
      sentiment: {
        score: -0.4,
        magnitude: 0.6,
        label: "negative"
      }
    }
  ],
  overallSentiment: {
    score: 0.2,
    label: "neutral"
  },
  topPositive: {
    title: "Company X Reports Stellar Q3 Earnings, Exceeding Expectations",
    source: "Financial Times",
    url: "https://example.com/article1",
    date: "2023-11-05",
    summary: "Company X announced record-breaking earnings for Q3, with revenue increasing by 25% year-over-year. The company's new product line contributed significantly to this growth.",
    sentiment: {
      score: 0.8,
      magnitude: 1.2,
      label: "positive"
    }
  },
  topNegative: {
    title: "Company X Faces Lawsuit Over Alleged Patent Infringement",
    source: "Reuters",
    url: "https://example.com/article4",
    date: "2023-10-25",
    summary: "A competitor has filed a lawsuit against Company X, claiming intellectual property violations related to its flagship product. Company X denies all allegations.",
    sentiment: {
      score: -0.7,
      magnitude: 1.1,
      label: "negative"
    }
  }
};

export async function fetchNewsAnalysis(company: string): Promise<AnalysisResponse> {
  // In a real app, this would make an API call to your backend
  try {
    console.log(`Fetching news analysis for ${company}`);
    
    // Simulate API call latency
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // This is mock data for demonstration - would be replaced with real API call
    return {
      ...mockNewsData,
      articles: mockNewsData.articles.map(article => ({
        ...article,
        title: article.title.replace('Company X', company),
        summary: article.summary.replace('Company X', company)
      })),
      topPositive: mockNewsData.topPositive 
        ? {
            ...mockNewsData.topPositive,
            title: mockNewsData.topPositive.title.replace('Company X', company),
            summary: mockNewsData.topPositive.summary.replace('Company X', company)
          }
        : null,
      topNegative: mockNewsData.topNegative
        ? {
            ...mockNewsData.topNegative,
            title: mockNewsData.topNegative.title.replace('Company X', company),
            summary: mockNewsData.topNegative.summary.replace('Company X', company)
          }
        : null
    };
  } catch (error) {
    console.error("Error fetching news analysis:", error);
    toast.error("Failed to fetch news analysis. Please try again.");
    throw error;
  }
}

export async function generateTTS(text: string, language: string = "hi"): Promise<string> {
  try {
    console.log(`Generating TTS for text in ${language}`);
    
    // Simulate API call latency
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // This would be replaced with a real TTS API call
    // For now, return a placeholder URL to an audio file
    return "https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-1.mp3";
  } catch (error) {
    console.error("Error generating TTS:", error);
    toast.error("Failed to generate audio. Please try again.");
    throw error;
  }
}
