import React from "react";

const CardSkeleton: React.FC = () => (
  <div className="
    animate-pulse
    bg-gray-100 dark:bg-gray-800
    rounded-md p-4
    min-w-[180px]
    sm:min-w-[220px]
    md:min-w-[280px]
    lg:min-w-[320px]
  ">
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3" />
    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2" />
    <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded" />
  </div>
);

const PageSkeleton: React.FC<{ title?: string; count?: number }> = ({ title = "Loading", count = 6 }) => (
  <div className="p-4">
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">{title}</h2>
      <div className="h-2 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
    </div>
    <div className="flex flex-wrap justify-center items-center gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  </div>
);


export default PageSkeleton;
