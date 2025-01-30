import { load } from "cheerio";

export async function fetchMeta(target: string) {
  try {
    let finalTarget = target
    try {
        new URL(target);
    } catch(e) {
        finalTarget = import.meta.env.SITE + target
    }
    const response = await fetch(finalTarget, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!response.ok) throw new Error("Failed to fetch page");

    const html = await response.text();
    const $ = load(html);

    return {
      title: $("title").text() || "Redirecionando...",
      description: $('meta[name="description"]').attr("content") || "",
      image:
        $('meta[property="og:image"]').attr("content") ||
        $('meta[name="twitter:image"]').attr("content") ||
        "",
    };
  } catch (error) {
    console.error("Error fetching metadata:", target, error);
    return { title: "", description: "", image: "" };
  }
}
