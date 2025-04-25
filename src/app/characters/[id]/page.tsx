"use client";

import { useQuery } from "@tanstack/react-query";
import { getCharacter } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import QueryProvider from "@/components/query-provider";

function CharacterDetail({ id }: { id: string }) {
  const {
    data: character,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["character", id],
    queryFn: () => getCharacter(parseInt(id)),
  });

  if (isLoading) {
    return (
      <div className="brutalist-container">
        <div className="text-2xl font-bold text-center">Loading...</div>
      </div>
    );
  }

  if (isError || !character) {
    return (
      <div className="brutalist-container">
        <div className="text-2xl font-bold text-center text-red-600">
          Error loading character
        </div>
      </div>
    );
  }

  return (
    <div className="brutalist-container">
      <Link
        href="/characters"
        className="brutalist-button inline-flex items-center gap-2 mb-8"
      >
        <ArrowLeft className="w-6 h-6" />
        Back to Characters
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square overflow-hidden border-4 border-black">
          <Image
            src={character.image}
            alt={character.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-6">
          <h1 className="brutalist-header">{character.name}</h1>

          <div className="space-y-4">
            <div className="brutalist-card">
              <h2 className="text-xl font-bold mb-2">Status</h2>
              <p>{character.status}</p>
            </div>

            <div className="brutalist-card">
              <h2 className="text-xl font-bold mb-2">Species</h2>
              <p>{character.species}</p>
            </div>

            {character.type && (
              <div className="brutalist-card">
                <h2 className="text-xl font-bold mb-2">Type</h2>
                <p>{character.type}</p>
              </div>
            )}

            <div className="brutalist-card">
              <h2 className="text-xl font-bold mb-2">Gender</h2>
              <p>{character.gender}</p>
            </div>

            <div className="brutalist-card">
              <h2 className="text-xl font-bold mb-2">Origin</h2>
              <p>{character.origin.name}</p>
            </div>

            <div className="brutalist-card">
              <h2 className="text-xl font-bold mb-2">Last Known Location</h2>
              <p>{character.location.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CharacterPage({ params }: { params: { id: string } }) {
  return (
    <QueryProvider>
      <CharacterDetail id={params.id} />
    </QueryProvider>
  );
}
