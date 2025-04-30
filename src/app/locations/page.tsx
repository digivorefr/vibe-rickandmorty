"use client";

import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getLocations, searchLocations, Location } from "@/lib/api";
import { useDebounce } from "@/lib/hooks";
import { Search, ArrowLeft } from "lucide-react";
import QueryProvider from "@/components/query-provider";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Location[];
}

function LocationsList() {
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
    queryKey: ["locations", debouncedSearch],
    queryFn: ({ pageParam = 1 }) =>
      debouncedSearch
        ? searchLocations(debouncedSearch, pageParam as number)
        : getLocations(pageParam as number),
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
          Error loading locations
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
            placeholder="Search locations..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="brutalist-input pl-12"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {data?.pages.map((page) =>
          page.results.map((location) => (
            <Link
              href={`/locations/${location.id}`}
              key={location.id}
              className="brutalist-card"
            >
              <h2 className="text-xl font-bold mb-2">{location.name}</h2>
              <p className="mb-1">Type: {location.type}</p>
              <p className="mb-1">Dimension: {location.dimension}</p>
              <p>Residents: {location.residents.length}</p>
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
          <div className="text-xl font-bold">No more locations</div>
        )}
      </div>
    </div>
  );
}

export default function LocationsPage() {
  return (
    <QueryProvider>
      <LocationsList />
    </QueryProvider>
  );
}