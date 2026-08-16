import type { Contributions, ContributionDay } from '../../lib/github';

const LEVEL_ALPHA: Record<ContributionDay['contributionLevel'], number> = {
  NONE: 0,
  FIRST_QUARTILE: 34,
  SECOND_QUARTILE: 56,
  THIRD_QUARTILE: 78,
  FOURTH_QUARTILE: 100,
};

const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

/** Cell and gap scale with the breakpoint so the grid fills the card at any width. */
const SCALE = '[--cell:11px] [--gap:3px] md:[--cell:15px] md:[--gap:4px] lg:[--cell:18px]';

function cellStyle(level: ContributionDay['contributionLevel']) {
  const alpha = LEVEL_ALPHA[level];
  return alpha === 0
    ? { backgroundColor: 'color-mix(in srgb, var(--fg-faint) 20%, transparent)' }
    : { backgroundColor: `color-mix(in srgb, var(--accent) ${alpha}%, transparent)` };
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/** Label a week column only when its month differs from the previous column's. */
function monthLabels(weeks: Contributions['weeks']) {
  let previous = '';
  return weeks.map((week) => {
    const month = new Date(`${week.firstDay}T00:00:00Z`).toLocaleDateString('en-GB', {
      month: 'short',
      timeZone: 'UTC',
    });
    if (month === previous) return '';
    previous = month;
    return month;
  });
}

function summary(data: Contributions) {
  return `GitHub contribution heatmap: ${data.total} contributions across ${data.activeDays} active days between ${formatDate(data.from)} and ${formatDate(data.to)}.`;
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="min-w-0">
      <p className="font-mono text-xl leading-none font-semibold text-accent tabular-nums sm:text-3xl">{value}</p>
      <p className="mt-1.5 font-mono text-[9px] font-semibold tracking-[0.12em] text-faint uppercase sm:mt-2 sm:text-[10px] sm:tracking-[0.18em]">
        {label}
      </p>
    </div>
  );
}

export default function ContributionGraph({ data }: { data: Contributions }) {
  const labels = monthLabels(data.weeks);

  return (
    <div className={`rounded-xl border border-card-outline bg-card-50 p-4 md:p-6 ${SCALE}`}>
      <div className="flex flex-col gap-7 md:flex-row md:items-start md:gap-8">
        {/* Calendar */}
        <div className="min-w-0 flex-1">
          <div className="-mx-1 overflow-x-auto px-1 pb-1">
            <div className="flex min-w-max gap-2">
              <div className="grid shrink-0 grid-rows-7 gap-[var(--gap)] pt-[18px]">
                {DAY_LABELS.map((label, i) => (
                  <span
                    key={i}
                    className="h-[var(--cell)] w-6 font-mono text-[9px] leading-[var(--cell)] text-faint"
                    aria-hidden
                  >
                    {label}
                  </span>
                ))}
              </div>

              <div>
                <div className="mb-1.5 flex gap-[var(--gap)]">
                  {labels.map((label, i) => (
                    <span
                      key={i}
                      className="w-[var(--cell)] font-mono text-[9px] leading-3 whitespace-nowrap text-faint"
                      aria-hidden
                    >
                      {label}
                    </span>
                  ))}
                </div>

                <div className="flex gap-[var(--gap)]" role="img" aria-label={summary(data)}>
                  {data.weeks.map((week) => (
                    <div key={week.firstDay} className="grid grid-rows-7 gap-[var(--gap)]">
                      {week.contributionDays.map((day) => (
                        <span
                          key={day.date}
                          title={`${day.contributionCount === 0 ? 'No contributions' : `${day.contributionCount} contribution${day.contributionCount === 1 ? '' : 's'}`} on ${formatDate(day.date)}`}
                          style={{ gridRowStart: day.weekday + 1, ...cellStyle(day.contributionLevel) }}
                          className="h-[var(--cell)] w-[var(--cell)] rounded-[3px]"
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-[10px] tracking-[0.12em] text-faint">
              {formatDate(data.from)} &ndash; {formatDate(data.to)}
            </p>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[10px] text-faint">Less</span>
              {(Object.keys(LEVEL_ALPHA) as ContributionDay['contributionLevel'][]).map((level) => (
                <span key={level} style={cellStyle(level)} className="h-[11px] w-[11px] rounded-[3px]" aria-hidden />
              ))}
              <span className="font-mono text-[10px] text-faint">More</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex shrink-0 justify-between gap-x-4 gap-y-6 sm:justify-start sm:gap-x-10 md:w-44 md:flex-col md:border-l md:border-default-30 md:pl-8">
          <Stat value={data.total.toLocaleString('en-GB')} label="Contributions" />
          <Stat value={String(data.activeDays)} label="Active days" />
          <Stat value={String(data.busiestDay.contributionCount)} label="Busiest day" />
        </div>
      </div>
    </div>
  );
}
