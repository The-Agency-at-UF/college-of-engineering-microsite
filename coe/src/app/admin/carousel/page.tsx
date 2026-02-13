"use client";

import { useEffect, useMemo, useState } from "react";

type Item = {
  key: string;
  url: string;
  size: number | null;
  lastModified: string | null;
};

export default function S3EditorPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyKey, setBusyKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Pagination
  const PAGE_SIZE = 9;
  const [page, setPage] = useState(1);

  async function refresh() {
    setLoading(true);
    setError(null);

    const res = await fetch("/api/s3/list", { cache: "no-store" });
    if (!res.ok) {
      setError("Failed to load bucket items.");
      setLoading(false);
      return;
    }

    const data = await res.json();
    const nextItems: Item[] = Array.isArray(data?.items) ? data.items : [];
    setItems(nextItems);
    setLoading(false);

    // keep page in range after refresh
    const maxPage = Math.max(1, Math.ceil(nextItems.length / PAGE_SIZE));
    setPage((p) => Math.min(p, maxPage));
  }

  useEffect(() => {
    refresh();
  }, []);

  async function uploadFile(file: File, keyOverride?: string) {
    setError(null);
    setBusyKey(keyOverride ?? "uploading");

    const presignRes = await fetch("/api/s3/edit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filename: file.name,
        contentType: file.type,
        keyOverride,
      }),
    });

    if (!presignRes.ok) {
      const text = await presignRes.text().catch(() => "");
      console.error("Presign failed:", presignRes.status, text);
      setError("Failed to upload.");
      setBusyKey(null);
      return;
    }

    const { url } = await presignRes.json();

    const putRes = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": file.type || "application/octet-stream" },
      body: file,
    });

    if (!putRes.ok) {
      const text = await putRes.text().catch(() => "");
      console.error("S3 PUT failed:", putRes.status, text);
      setError("Upload failed.");
      setBusyKey(null);
      return;
    }

    setBusyKey(null);
    await refresh();
  }

  async function deleteItem(key: string) {
    setError(null);
    setBusyKey(key);

    const res = await fetch("/api/s3/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("Delete failed:", res.status, text);
      setError("Delete failed.");
    }

    setBusyKey(null);
    await refresh();
  }

  const sorted = useMemo(
    () => [...items].sort((a, b) => (a.key < b.key ? -1 : 1)),
    [items]
  );

  const totalCount = items.length;
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));

  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return sorted.slice(start, start + PAGE_SIZE);
  }, [sorted, page]);

  const canPrev = page > 1 && !loading;
  const canNext = page < totalPages && !loading;

  return (
    <div className="max-w-6xl mx-auto px-6 pt-10 pb-20">
      <h1 className="text-3xl font-bold text-[#002657] mb-2">S3 Bucket Editor</h1>

      <p className="text-[#002657] mb-2">
        Upload, replace, or delete images in the bucket (via presigned URLs).
      </p>

      <p className="text-[#002657] mb-6">
        <span className="font-semibold">Total images:</span>{" "}
        {loading ? "Loading…" : totalCount}
      </p>

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center mb-8">
        <label className="bg-[#0021A5] text-white rounded-full px-6 py-3 shadow hover:bg-[#030533] transition cursor-pointer">
          Upload New
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) uploadFile(f);
              e.currentTarget.value = "";
            }}
          />
        </label>

        <button
          className="bg-white border border-[#002657] text-[#002657] rounded-full px-6 py-3 shadow hover:bg-[#E6EDF8] transition"
          onClick={refresh}
          disabled={loading}
        >
          Refresh
        </button>

        {error && <div className="text-red-600 font-medium">{error}</div>}
      </div>

      {loading ? (
        <div className="text-[#002657]">Loading…</div>
      ) : sorted.length === 0 ? (
        <div className="text-[#002657]">No items found.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pageItems.map((it) => (
              <div key={it.key} className="border border-[#002657] rounded-xl shadow p-4">
                <div className="aspect-[16/9] rounded-lg overflow-hidden bg-gray-100 mb-3">
                  <img
                    src={it.url}
                    alt={it.key}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="text-sm text-[#002657] font-mono break-all mb-3">{it.key}</div>

                <div className="flex gap-2">
                  <label className="flex-1 bg-[#FA4616] text-white text-center rounded-full px-4 py-2 font-bold hover:bg-[#d93d13] transition cursor-pointer">
                    {busyKey === it.key ? "Working…" : "Replace"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={busyKey !== null}
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) uploadFile(f, it.key);
                        e.currentTarget.value = "";
                      }}
                    />
                  </label>

                  <button
                    className="flex-1 bg-[#002657] text-white rounded-full px-4 py-2 font-bold hover:bg-[#001d42] transition"
                    onClick={() => deleteItem(it.key)}
                    disabled={busyKey !== null}
                  >
                    {busyKey === it.key ? "Deleting…" : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination controls */}
          <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-[#002657]">
              Page <span className="font-semibold">{page}</span> of{" "}
              <span className="font-semibold">{totalPages}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                className="bg-white border border-[#002657] text-[#002657] rounded-full px-5 py-2 shadow hover:bg-[#E6EDF8] transition disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={!canPrev}
                aria-label="Previous page"
              >
                ← Prev
              </button>

              <button
                className="bg-white border border-[#002657] text-[#002657] rounded-full px-5 py-2 shadow hover:bg-[#E6EDF8] transition disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={!canNext}
                aria-label="Next page"
              >
                Next →
              </button>

              <select
                className="border border-[#002657] rounded-full px-4 py-2 text-[#002657] bg-white shadow"
                value={page}
                onChange={(e) => setPage(Number(e.target.value))}
                aria-label="Select page"
              >
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <option key={p} value={p}>
                    Page {p}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
