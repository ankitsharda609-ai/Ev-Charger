'use client';

import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

interface LocationSearchProps {
    onLocationSelect: (lat: number, lng: number, name: string) => void;
}

export default function LocationSearch({ onLocationSelect }: LocationSearchProps) {
    const [query, setQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [results, setResults] = useState<any[]>([]);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Search triggered with query:", query); // Debug log
        if (!query.trim()) {
            console.log("Empty query, returning");
            return;
        }

        setIsSearching(true);
        setResults([]);

        try {
            console.log("Fetching from API...");
            const res = await fetch(`/api/places?query=${encodeURIComponent(query)}`);
            console.log("Fetch response status:", res.status);
            const data = await res.json();
            console.log("Search results:", data);
            setResults(data);
        } catch (error) {
            console.error("Search failed", error);
        } finally {
            setIsSearching(false);
        }
    };

    const selectLocation = (result: any) => {
        const lat = parseFloat(result.lat);
        const lng = parseFloat(result.lon);
        onLocationSelect(lat, lng, result.display_name.split(',')[0]); // First part of name
        setResults([]);
        setQuery('');
    };

    return (
        <div className="relative w-full max-w-md mx-auto mb-6 z-[500]">
            <form onSubmit={handleSearch} className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search city or area..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-background-card/90 backdrop-blur border border-white/10 focus:border-primary/50 focus:outline-none text-white placeholder-text-muted shadow-lg"
                />
                <Search className="absolute left-3 top-3.5 w-5 h-5 text-text-muted" />
                <button
                    type="submit"
                    className="absolute right-2 top-2 p-1.5 bg-primary/20 rounded-lg text-primary hover:bg-primary/30 transition-colors"
                    disabled={isSearching}
                >
                    {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : "Go"}
                </button>
            </form>

            {/* Results Dropdown */}
            {results.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-background-card/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl max-h-[300px] overflow-y-auto">
                    {results.map((result, i) => (
                        <button
                            key={i}
                            onClick={() => selectLocation(result)}
                            className="w-full text-left px-4 py-3 hover:bg-white/5 border-b border-white/5 last:border-0 transition-colors text-sm"
                        >
                            <div className="font-semibold text-white">{result.display_name.split(',')[0]}</div>
                            <div className="text-text-muted truncate text-xs">{result.display_name}</div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
