import React from 'react';

export function GameSkeleton() {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg h-full animate-pulse">
      <div className="h-8 bg-gray-800" />
      <div className="flex h-32">
        <div className="flex-1 bg-gray-800 p-4">
          <div className="w-12 h-12 bg-gray-700 rounded-full mx-auto mb-2" />
          <div className="h-4 bg-gray-700 w-24 mx-auto mb-2" />
          <div className="h-6 bg-gray-700 w-16 mx-auto" />
        </div>
        <div className="w-[2px] bg-gray-900" />
        <div className="flex-1 bg-gray-800 p-4">
          <div className="w-12 h-12 bg-gray-700 rounded-full mx-auto mb-2" />
          <div className="h-4 bg-gray-700 w-24 mx-auto mb-2" />
          <div className="h-6 bg-gray-700 w-16 mx-auto" />
        </div>
      </div>
    </div>
  );
}