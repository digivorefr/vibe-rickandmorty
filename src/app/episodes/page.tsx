"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getEpisodes, searchEpisodes } from "@/lib/api";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function EpisodesPage() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["episodes", page, debouncedSearch],
    queryFn: () =>
      debouncedSearch
        ? searchEpisodes(debouncedSearch, page)
        : getEpisodes(page),
  });

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setTimeout(() => {
      setDebouncedSearch(value);
      setPage(1);
    }, 500);
  };

  if (isLoading) {
    return (
      <div className="brutalist-container">
        <div className="text-2xl font-bold text-center">Loading...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="brutalist-container">
        <div className="text-2xl font-bold text-center text-red-600">
          Error loading episodes
        </div>
      </div>
    );
  }

  return (
    <div className="brutalist-container">
      <div className="flex items-center mb-8">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search episodes..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="brutalist-input pl-12"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>

      <div className="brutalist-grid">
        {data?.results.map((episode) => (
          <Link
            href={`/episodes/${episode.id}`}
            key={episode.id}
            className="brutalist-card group"
          >
            <h2 className="text-xl font-bold mb-4">{episode.name}</h2>
            <p className="mb-2">Episode: {episode.episode}</p>
            <p className="mb-2">Air Date: {episode.air_date}</p>
            <p>Characters: {episode.characters.length}</p>
          </Link>
        ))}
      </div>

      <div className="flex justify-center items-center mt-8 gap-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="brutalist-button disabled:opacity-50"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <span className="text-xl font-bold">Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={!data?.info.next}
          className="brutalist-button disabled:opacity-50"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
