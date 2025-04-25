"use client";

import { useQuery } from "@tanstack/react-query";
import { getEpisode } from "@/lib/api";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function EpisodePage({ params }: { params: { id: string } }) {
  const {
    data: episode,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["episode", params.id],
    queryFn: () => getEpisode(parseInt(params.id)),
  });

  if (isLoading) {
    return (
      <div className="brutalist-container">
        <div className="text-2xl font-bold text-center">Loading...</div>
      </div>
    );
  }

  if (isError || !episode) {
    return (
      <div className="brutalist-container">
        <div className="text-2xl font-bold text-center text-red-600">
          Error loading episode
        </div>
      </div>
    );
  }

  return (
    <div className="brutalist-container">
      <Link
        href="/episodes"
        className="brutalist-button inline-flex items-center gap-2 mb-8"
      >
        <ArrowLeft className="w-6 h-6" />
        Back to Episodes
      </Link>

      <h1 className="brutalist-header">{episode.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="brutalist-card">
            <h2 className="text-xl font-bold mb-2">Episode Code</h2>
            <p>{episode.episode}</p>
          </div>

          <div className="brutalist-card">
            <h2 className="text-xl font-bold mb-2">Air Date</h2>
            <p>{episode.air_date}</p>
          </div>

          <div className="brutalist-card">
            <h2 className="text-xl font-bold mb-2">Created</h2>
            <p>{new Date(episode.created).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="brutalist-card">
          <h2 className="text-xl font-bold mb-4">Characters</h2>
          <p className="mb-4">Total characters: {episode.characters.length}</p>
          <div className="grid grid-cols-2 gap-4">
            {episode.characters.map((character) => {
              const characterId = character.split("/").pop();
              return (
                <Link
                  key={character}
                  href={`/characters/${characterId}`}
                  className="brutalist-button text-sm"
                >
                  Character #{characterId}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
