const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export async function getCategoryImage(category: string): Promise<string> {
  const searchTerms: Record<string, string> = {
    Technology: "technology computer",
    Travel: "travel landscape",
    Food: "food cooking",
    Lifestyle: "lifestyle people",
    Health: "health wellness",
    Sports: "sports action",
    default: "abstract background",
  };

  const searchQuery = searchTerms[category] || searchTerms.default;
  const endpoint = "https://api.unsplash.com/photos/random";

  try {
    const response = await fetch(
      `${endpoint}?query=${searchQuery}&client_id=${UNSPLASH_ACCESS_KEY}`
    );
    const data = await response.json();
    return data.urls.regular;
  } catch (error) {
    console.error("Error fetching image from Unsplash:", error);
    return "https://placehold.co/400";
  }
}
