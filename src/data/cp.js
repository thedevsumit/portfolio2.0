export const platforms = [
  {
    id: 'leetcode',
    name: 'LeetCode',
    handle: 'thedevsumit',
    url: 'https://leetcode.com/thedevsumit/',
    color: '#f59e0b',
    difficulty: {
      easy: { label: 'Easy', count: 0, color: '#22c55e' },
      medium: { label: 'Medium', count: 0, color: '#eab308' },
      hard: { label: 'Hard', count: 0, color: '#ef4444' },
    },
  },
  {
    id: 'codeforces',
    name: 'Codeforces',
    handle: 'thedevsumit',
    url: 'https://codeforces.com/profile/thedevsumit',
    color: '#3b82f6',
  },
]

export const fallbackCP = {
  leetcode: {
    totalSolved: 860,
    easySolved: 178,
    mediumSolved: 544,
    hardSolved: 138,
    ranking: 27272,
    contributionPoints: 1320,
    reputation: 1,
    rating: 2007,
    maxRating: 2020,
    contestBadge: { name: 'Knight' },
    submissionCalendar: null, 
  },
  codeforces: {
    handle: "thedevsumit",
    rating: 1346,
    maxRating: 1346,
    rank: "Pupil",
    maxRank: "Pupil",
    contribution: 0,
    friendOfCount: 0,
  },
};
