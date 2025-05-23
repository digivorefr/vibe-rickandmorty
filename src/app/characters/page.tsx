"use client";

import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCharacters, searchCharacters, Character } from "@/lib/api";
import { useDebounce } from "@/lib/hooks";

import { Search, ArrowLeft } from "lucide-react";
import Link from "next/link";
import QueryProvider from "@/components/query-provider";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

function CharactersList() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const { ref, inView } = useInView();

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<ApiResponse>({
    queryKey: ["characters", debouncedSearch],
    queryFn: ({ pageParam = 1 }) =>
      debouncedSearch
        ? searchCharacters(debouncedSearch, pageParam as number)
        : getCharacters(pageParam as number),
    getNextPageParam: (lastPage: ApiResponse) =>
      lastPage.info.next
        ? parseInt(lastPage.info.next.split("=")[1])
        : undefined,
    initialPageParam: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
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
          Error loading characters
        </div>
      </div>
    );
  }

  return (
    <div className="brutalist-container">
      <Link
        href="/"
        className="brutalist-button inline-flex items-center gap-2 mb-8"
      >
        <ArrowLeft className="w-6 h-6" />
        Back to Home
      </Link>

      <div className="flex items-center mb-8">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search characters..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="brutalist-input pl-12"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>

      <div
        className="grid grid-cols-1 gap-8 auto-rows-fr"
        style={{
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
        }}
      >
        {data?.pages.map((page) =>
          page.results.map((character) => (
            <Link
              href={`/characters/${character.id}`}
              key={character.id}
              className="brutalist-card group flex flex-col"
            >
              <div className="relative aspect-square mb-4 overflow-hidden border-4 border-black w-full">
                <img
                  src={character.image}
                  alt={character.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-2">{character.name}</h2>
                <p className="mb-1">Status: {character.status}</p>
                <p className="mb-1">Species: {character.species}</p>
                <p>Location: {character.location.name}</p>
              </div>
            </Link>
          ))
        )}
      </div>

      <div ref={ref} className="mt-8 text-center">
        {isFetchingNextPage ? (
          <div className="text-xl font-bold">Loading more...</div>
        ) : hasNextPage ? (
          <div className="text-xl font-bold">Load more</div>
        ) : (
          <div className="text-xl font-bold">No more characters</div>
        )}
      </div>
    </div>
  );
}

export default function CharactersPage() {
  return (
    <QueryProvider>
      <CharactersList />
    </QueryProvider>
  );
}