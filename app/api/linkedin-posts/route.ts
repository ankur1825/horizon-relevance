const APIFY_URL =
  "https://api.apify.com/v2/datasets/S7pkilLNvh5QrlLcc/items?token=apify_api_dKgAmLbycdBtJpLJyvXyrM5qnh28Bc2VUUqo";

export type BlogPost = {
  id: string;
  title: string;
  description: string;
  date: string;
  link: string;
};

type ApifyItem = Record<string, unknown>;

function buildLinkedInUrl(item: ApifyItem): string {
  // Prefer a direct URL field if present
  const directUrl =
    (item.url as string) ||
    (item.postUrl as string) ||
    (item.shareUrl as string);
  if (directUrl && directUrl.startsWith("http")) return directUrl;

  // Fall back to constructing from activity URN
  const urn =
    (item.id as string) ||
    (item.urn as string) ||
    (item.activityUrn as string) ||
    "";
  if (urn.includes("activity")) {
    return `https://www.linkedin.com/feed/update/${encodeURIComponent(urn)}/`;
  }

  return "https://www.linkedin.com/company/horizonrelevance";
}

function parsePost(item: ApifyItem, index: number): BlogPost {
  const rawText =
    ((item.text as string) ||
      (item.content as string) ||
      (item.commentary as string) ||
      "").trim();

  const newlineIdx = rawText.indexOf("\n");
  const title =
    newlineIdx > 0 ? rawText.slice(0, newlineIdx).trim() : rawText.slice(0, 100).trim();
  const description =
    newlineIdx > 0 ? rawText.slice(newlineIdx).trim() : rawText.slice(100).trim();

  const date =
    (item.postedAgo as string) ||
    (item.timeAgo as string) ||
    (item.postedAt
      ? new Date(item.postedAt as string).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "");

  return {
    id: String((item.id as string) || (item.urn as string) || index),
    title,
    description,
    date,
    link: buildLinkedInUrl(item),
  };
}

export async function GET() {
  try {
    const res = await fetch(APIFY_URL, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`Apify error: ${res.status}`);

    const items: ApifyItem[] = await res.json();
    const posts = items
      .filter((item) => {
        const text =
          (item.text as string) ||
          (item.content as string) ||
          (item.commentary as string) ||
          "";
        return text.trim().length > 0;
      })
      .map(parsePost);

    return Response.json({ posts, ok: true });
  } catch (err) {
    console.error("[linkedin-posts]", err);
    return Response.json({ posts: [], ok: false });
  }
}
