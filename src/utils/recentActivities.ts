export type RecentActivityItem = {
  jobId: string;
  title: string;
  viewedAt: string;
  eventType?: "viewed_job" | "accepted_job";
  budget?: string;
  location?: string;
  category?: string;
};

const RECENT_ACTIVITIES_PREFIX = "recent_activities_v1_";

function getCurrentUserKey(): string | null {
  const userId = localStorage.getItem("userId") || localStorage.getItem("user_id");
  if (userId) return `id_${userId}`;

  const email = localStorage.getItem("email");
  if (email) return `email_${email.toLowerCase()}`;

  const username = localStorage.getItem("username");
  if (username) return `username_${username.toLowerCase()}`;

  return null;
}

function getStorageKeyForCurrentUser(): string | null {
  const userKey = getCurrentUserKey();
  if (!userKey) return null;
  return `${RECENT_ACTIVITIES_PREFIX}${userKey}`;
}

function readRecentActivities(): RecentActivityItem[] {
  const key = getStorageKeyForCurrentUser();
  if (!key) return [];

  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (item): item is RecentActivityItem =>
        typeof item?.jobId === "string" &&
        typeof item?.title === "string" &&
        typeof item?.viewedAt === "string"
    );
  } catch {
    return [];
  }
}

function writeRecentActivities(items: RecentActivityItem[]): void {
  const key = getStorageKeyForCurrentUser();
  if (!key) return;
  localStorage.setItem(key, JSON.stringify(items));
}

export function getAllRecentActivitiesForUser(): RecentActivityItem[] {
  return readRecentActivities().sort(
    (a, b) => Date.parse(b.viewedAt) - Date.parse(a.viewedAt)
  );
}

export function getDashboardRecentActivitiesForUser(
  limit = 4
): RecentActivityItem[] {
  return getAllRecentActivitiesForUser().slice(0, limit);
}

export function trackViewedJob(job: {
  jobId: string;
  title: string;
  budget?: string;
  location?: string;
  category?: string;
}): void {
  if (!job.jobId || !job.title) return;
  trackJobActivity({ ...job, eventType: "viewed_job" });
}

export function trackJobActivity(job: {
  jobId: string;
  title: string;
  eventType: "viewed_job" | "accepted_job";
  budget?: string;
  location?: string;
  category?: string;
}): void {
  if (!job.jobId || !job.title) return;

  const existing = readRecentActivities();
  const existingItem = existing.find((item) => item.jobId === job.jobId);
  const resolvedEventType =
    existingItem?.eventType === "accepted_job" && job.eventType === "viewed_job"
      ? "accepted_job"
      : job.eventType;
  const withoutCurrent = existing.filter((item) => item.jobId !== job.jobId);
  const updated: RecentActivityItem[] = [
    {
      jobId: job.jobId,
      title: job.title,
      viewedAt: new Date().toISOString(),
      eventType: resolvedEventType,
      budget: job.budget,
      location: job.location,
      category: job.category,
    },
    ...withoutCurrent,
  ];

  writeRecentActivities(updated);
}

export function formatViewedTime(viewedAt: string): string {
  const viewedMs = Date.parse(viewedAt);
  if (Number.isNaN(viewedMs)) return "Viewed recently";

  const diffMs = Date.now() - viewedMs;
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diffMs < minute) return "Viewed just now";
  if (diffMs < hour) return `Viewed ${Math.floor(diffMs / minute)}m ago`;
  if (diffMs < day) return `Viewed ${Math.floor(diffMs / hour)}h ago`;
  if (diffMs < 2 * day) return "Viewed yesterday";
  return `Viewed ${Math.floor(diffMs / day)}d ago`;
}

export function getActivityPrimaryText(activity: RecentActivityItem): string {
  if (activity.eventType === "accepted_job") {
    return "You accepted this job";
  }
  return formatViewedTime(activity.viewedAt);
}
