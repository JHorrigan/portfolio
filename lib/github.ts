const ENDPOINT = 'https://api.github.com/graphql';
const LOGIN = 'JHorrigan';
const MONTHS_BACK = 6;

/**
 * GitHub only exposes the contribution calendar through GraphQL — the REST API
 * has no equivalent. Private-repo contributions are included only while the
 * account has "Include private contributions on my profile" enabled; with it
 * off this drops from thousands to a couple of hundred.
 */
const QUERY = `
  query($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            firstDay
            contributionDays { date contributionCount contributionLevel weekday }
          }
        }
      }
    }
  }
`;

export type ContributionDay = {
  date: string;
  contributionCount: number;
  contributionLevel: 'NONE' | 'FIRST_QUARTILE' | 'SECOND_QUARTILE' | 'THIRD_QUARTILE' | 'FOURTH_QUARTILE';
  weekday: number;
};

export type ContributionWeek = { firstDay: string; contributionDays: ContributionDay[] };

export type Contributions = {
  total: number;
  activeDays: number;
  busiestDay: ContributionDay;
  from: string;
  to: string;
  weeks: ContributionWeek[];
};

/** Rolling window ending today, so the graph never becomes a stale snapshot. */
function windowRange() {
  const to = new Date();
  const from = new Date(to);
  from.setMonth(from.getMonth() - MONTHS_BACK);
  return { from: from.toISOString(), to: to.toISOString() };
}

export async function getContributions(): Promise<Contributions | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  const { from, to } = windowRange();

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: QUERY, variables: { login: LOGIN, from, to } }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) return null;

  const json = await res.json();
  const calendar = json.data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar) return null;

  const weeks: ContributionWeek[] = calendar.weeks;
  const days = weeks.flatMap((w) => w.contributionDays);

  return {
    total: calendar.totalContributions,
    activeDays: days.filter((d) => d.contributionCount > 0).length,
    busiestDay: days.reduce((a, b) => (b.contributionCount > a.contributionCount ? b : a)),
    from: days[0].date,
    to: days[days.length - 1].date,
    weeks,
  };
}
