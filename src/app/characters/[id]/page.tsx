import { getCharacter } from "@/lib/api";
import { notFound } from "next/navigation";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  // Handle both Promise and direct object formats
  const { id } = "then" in params ? await params : params;
  const character = await getCharacter(parseInt(id));

  if (!character) {
    notFound();
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
          <img
            src={character.image}
            alt={character.name}
            className="object-cover w-full h-full"
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
