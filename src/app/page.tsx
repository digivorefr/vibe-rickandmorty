"use client";

import Link from "next/link";
import { Users, MapPin, Film } from "lucide-react";

export default function Home() {
  return (
    <div className="brutalist-container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link href="/characters" className="brutalist-card group">
          <div className="flex flex-col items-center justify-center p-8 space-y-4">
            <Users className="w-16 h-16 group-hover:text-white" />
            <h2 className="text-2xl font-bold uppercase">Characters</h2>
            <p className="text-center">
              Explore all characters from the series
            </p>
          </div>
        </Link>

        <Link href="/locations" className="brutalist-card group">
          <div className="flex flex-col items-center justify-center p-8 space-y-4">
            <MapPin className="w-16 h-16 group-hover:text-white" />
            <h2 className="text-2xl font-bold uppercase">Locations</h2>
            <p className="text-center">
              Discover various locations in the multiverse
            </p>
          </div>
        </Link>

        <Link href="/episodes" className="brutalist-card group">
          <div className="flex flex-col items-center justify-center p-8 space-y-4">
            <Film className="w-16 h-16 group-hover:text-white" />
            <h2 className="text-2xl font-bold uppercase">Episodes</h2>
            <p className="text-center">Browse through all episodes</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
