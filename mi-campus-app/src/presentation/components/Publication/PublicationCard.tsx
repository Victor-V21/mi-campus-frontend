import React from "react";
import type { Publication } from "../../../core/models/publication.model";

interface Props {
  pub: Publication;
  onAddFeedback?: (id: string) => void;
}

export const PublicationCard: React.FC<Props> = ({ pub }) => {
  return (
    <div className="rounded-2xl shadow p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">{pub.title}</h3>
        <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
          {pub.typeName}
        </span>
      </div>
      <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-3">{pub.text}</p>

      {pub.images?.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mb-3">
          {pub.images.map(img => (
            <img key={img.id} src={img.url.startsWith("http") ? img.url : `${import.meta.env.VITE_API_URL?.replace(/\/$/, "")}${img.url.startsWith("/") ? "" : "/"}${img.url}`}
                 alt={img.fileName}
                 className="w-full h-40 object-cover rounded-lg" />
          ))}
        </div>
      )}

      <div className="text-xs text-neutral-500">
        Por: <strong>{pub.userName}</strong>
      </div>
    </div>
  );
};
