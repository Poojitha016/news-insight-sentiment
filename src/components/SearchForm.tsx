
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface SearchFormProps {
  onSearch: (company: string) => void;
  isLoading: boolean;
}

export function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [company, setCompany] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (company.trim()) {
      onSearch(company.trim());
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="relative w-full max-w-lg mx-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative flex items-center">
        <Input
          type="text"
          placeholder="Enter company name (e.g., Apple, Tesla, Microsoft)"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="pr-24 h-12 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-soft transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          disabled={isLoading}
        />
        <Button
          type="submit"
          className="absolute right-1 rounded-md py-1 px-4 h-10 bg-primary hover:bg-primary-hover transition-all duration-200"
          disabled={isLoading || !company.trim()}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <SearchIcon className="h-4 w-4 mr-1" />
              Analyze
            </>
          )}
        </Button>
      </div>
    </motion.form>
  );
}
