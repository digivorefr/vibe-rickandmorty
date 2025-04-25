"use client";

import { useQuery } from "@tanstack/react-query";
import { getLocation } from "@/lib/api";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LocationPage({ params }: { params: { id: string } }) {
  const {
    data: location,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["location", params.id],
    queryFn: () => getLocation(parseInt(params.id)),
  });

  if (isLoading) {
    return (
      <div className="brutalist-container">
        <div className="text-2xl font-bold text-center">Loading...</div>
      </div>
    );
  }

  if (isError || !location) {
    return (
      <div className="brutalist-container">
        <div className="text-2xl font-bold text-center text-red-600">
          Error loading location
        </div>
      </div>
    );
  }

  return (
    <div className="brutalist-container">
      <Link
        href="/locations"
        className="brutalist-button inline-flex items-center gap-2 mb-8"
      >
        <ArrowLeft className="w-6 h-6" />
        Back to Locations
      </Link>

      <h1 className="brutalist-header">{location.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="brutalist-card">
            <h2 className="text-xl font-bold mb-2">Type</h2>
            <p>{location.type}</p>
          </div>

          <div className="brutalist-card">
            <h2 className="text-xl font-bold mb-2">Dimension</h2>
            <p>{location.dimension}</p>
          </div>

          <div className="brutalist-card">
            <h2 className="text-xl font-bold mb-2">Created</h2>
            <p>{new Date(location.created).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="brutalist-card">
          <h2 className="text-xl font-bold mb-4">Residents</h2>
          <p className="mb-4">Total residents: {location.residents.length}</p>
          <div className="grid grid-cols-2 gap-4">
            {location.residents.map((resident) => {
              const residentId = resident.split("/").pop();
              return (
                <Link
                  key={resident}
                  href={`/characters/${residentId}`}
                  className="brutalist-button text-sm"
                >
                  Resident #{residentId}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
