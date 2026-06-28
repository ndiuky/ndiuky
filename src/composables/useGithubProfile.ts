import { onMounted, ref } from "vue";
import { profile as fallbackProfile, stats as fallbackStats } from "@/data/landing";
import type { Profile, Stat } from "@/data/landing";

type GithubUser = {
  login?: string;
  name?: string | null;
  avatar_url?: string;
  html_url?: string;
  location?: string | null;
  bio?: string | null;
  hireable?: boolean | null;
  public_repos?: number;
  followers?: number;
  following?: number;
};

const formatCount = (count: number | undefined) => String(count ?? 0);

export const useGithubProfile = () => {
  const profile = ref<Profile>({ ...fallbackProfile });
  const stats = ref<Stat[]>([...fallbackStats]);
  const isGithubLoading = ref(true);
  const githubError = ref<string | null>(null);

  const loadGithubProfile = async () => {
    isGithubLoading.value = true;
    githubError.value = null;

    try {
      const response = await fetch("https://api.github.com/users/ndiuky", {
        headers: { Accept: "application/vnd.github+json" },
      });

      if (!response.ok) {
        throw new Error(`GitHub responded with ${response.status}`);
      }

      const github = (await response.json()) as GithubUser;

      profile.value = {
        handle: github.login ?? fallbackProfile.handle,
        name: github.name?.trim() || fallbackProfile.name,
        avatar: github.avatar_url ?? fallbackProfile.avatar,
        location: github.location ?? fallbackProfile.location,
        bio: github.bio ?? fallbackProfile.bio,
        status: github.hireable ? "hireable" : "online",
        githubUrl: github.html_url ?? fallbackProfile.githubUrl,
      };

      stats.value = [
        { value: formatCount(github.followers), label: "followers" },
        { value: formatCount(github.following), label: "following" },
        { value: formatCount(github.public_repos), label: "public repos" },
      ];
    } catch (error) {
      githubError.value = error instanceof Error ? error.message : "GitHub profile fetch failed";
      profile.value = { ...fallbackProfile };
      stats.value = [...fallbackStats];
    } finally {
      isGithubLoading.value = false;
    }
  };

  onMounted(loadGithubProfile);

  return { githubError, isGithubLoading, loadGithubProfile, profile, stats };
};
