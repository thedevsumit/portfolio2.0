import { fallbackCP } from '../data/cp'

const CACHE_TTL_MS = 1000 * 60 * 30 
const isStaleCache = (ts) => !ts || Date.now() - ts > CACHE_TTL_MS

const cache = {
  leetcode: { data: null, ts: 0 },
  codeforces: { data: null, ts: 0 },
}

const TIMEOUT_MS = 6000

const fetchWithTimeout = async (url, options = {}) => {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: { Accept: 'application/json', ...(options.headers || {}) },
    })
    return res
  } finally {
    clearTimeout(timer)
  }
}

const parseLeetCode = (json) => {
  if (!json) return null

  
  
  const acList =
    json.submitStats?.acSubmissionNum ||
    json.submitStatsGlobal ||
    []

  const findCount = (diff) => {
    const item = acList.find(
      (x) => (x.difficulty || '').toLowerCase() === diff.toLowerCase(),
    )
    return item?.count ?? 0
  }

  
  const allItem = acList.find(
    (x) => (x.difficulty || '').toLowerCase() === 'all',
  )
  const easy = findCount('Easy')
  const medium = findCount('Medium')
  const hard = findCount('Hard')
  const total = allItem?.count ?? easy + medium + hard

  if (!total && !easy && !medium && !hard) return null

  return {
    totalSolved: total,
    easySolved: easy,
    mediumSolved: medium,
    hardSolved: hard,
    ranking: json.profile?.ranking ?? null,
    contributionPoints: json.contributions?.points ?? 0,
    reputation: json.profile?.reputation ?? 0,
    
    
    rating:
      json.contestRating ??
      json.userContestRanking?.rating ??
      null,
    maxRating:
      json.userContestRanking?.topRating ??
      json.contestRanking?.topRating ??
      null,
    contestBadge: json.contestBadge?.name ?? null,
    submissionCalendar: json.submissionCalendar ?? null,
    realName: json.profile?.realName ?? '',
    school: json.profile?.school ?? '',
    country: json.profile?.countryName ?? '',
    __source: 'live',
  }
}

const leetcodeEndpoints = [
  
  { url: (u) => `/api/leetcode/user/${u}`, source: 'vercel-proxy' },
  
  { url: (u) => `https://leetcode-api-pied.vercel.app/user/${u}`, source: 'vercel' },
  
  { url: (u) => `/api/alfalc/userProfile/${u}`, source: 'alfa-proxy' },
  
  { url: (u) => `https://alfa-leetcode-api.onrender.com/userProfile/${u}`, source: 'alfa' },
]

const fetchLeetCode = async (username) => {
  if (!isStaleCache(cache.leetcode.ts) && cache.leetcode.data) {
    return cache.leetcode.data
  }

  for (const ep of leetcodeEndpoints) {
    try {
      const url = ep.url(username)
      const res = await fetchWithTimeout(url)
      if (!res.ok) continue
      const json = await res.json()
      const parsed = parseLeetCode(json)
      if (parsed) {
        cache.leetcode = { data: parsed, ts: Date.now() }
        return parsed
      }
    } catch {
      
    }
  }

  
  const fallback = { ...fallbackCP.leetcode, __source: 'fallback' }
  cache.leetcode = { data: fallback, ts: Date.now() }
  return fallback
}

const codeforcesEndpoints = [
  { url: (h) => `/api/codeforces/api/user.info?handles=${h}`, source: 'cf-proxy' },
  { url: (h) => `/api/codeforces/api/user.rating?handle=${h}`, source: 'cf-proxy' },
  { url: (h) => `https://codeforces.com/api/user.info?handles=${h}`, source: 'cf-direct' },
  { url: (h) => `https://codeforces.com/api/user.rating?handle=${h}`, source: 'cf-direct' },
]

const fetchCodeforces = async (handle) => {
  if (!isStaleCache(cache.codeforces.ts) && cache.codeforces.data) {
    return cache.codeforces.data
  }

  const tryDirect = async () => {
    const [infoRes, ratingRes] = await Promise.all([
      fetchWithTimeout(`https://codeforces.com/api/user.info?handles=${handle}`),
      fetchWithTimeout(`https://codeforces.com/api/user.rating?handle=${handle}`),
    ])
    if (!infoRes.ok) throw new Error('CF info failed')
    const infoJson = await infoRes.json()
    const ratingJson = ratingRes.ok ? await ratingRes.json() : { result: [] }
    if (infoJson.status !== 'OK') throw new Error('CF status not OK')
    return { infoJson, ratingJson }
  }

  const tryProxy = async () => {
    const [infoRes, ratingRes] = await Promise.all([
      fetchWithTimeout(`/api/codeforces/api/user.info?handles=${handle}`),
      fetchWithTimeout(`/api/codeforces/api/user.rating?handle=${handle}`),
    ])
    if (!infoRes.ok) throw new Error('CF proxy info failed')
    const infoJson = await infoRes.json()
    const ratingJson = ratingRes.ok ? await ratingRes.json() : { result: [] }
    if (infoJson.status !== 'OK') throw new Error('CF proxy status not OK')
    return { infoJson, ratingJson }
  }

  for (const strategy of [tryProxy, tryDirect]) {
    try {
      const { infoJson, ratingJson } = await strategy()
      const u = infoJson.result[0]
      const data = {
        handle: u.handle,
        rating: u.rating ?? 0,
        maxRating: u.maxRating ?? 0,
        rank: u.rank ?? 'unrated',
        maxRank: u.maxRank ?? 'unrated',
        contribution: u.contribution ?? 0,
        friendOfCount: u.friendOfCount ?? 0,
        ratingHistory: (ratingJson.result || []).map((c) => ({
          contestName: c.contestName,
          rank: c.rank,
          oldRating: c.oldRating,
          newRating: c.newRating,
          date: new Date(c.ratingUpdateTimeSeconds * 1000).toLocaleDateString(),
        })),
      }
      cache.codeforces = { data, ts: Date.now() }
      return data
    } catch {
      
    }
  }

  cache.codeforces = { data: { ...fallbackCP.codeforces, __source: 'fallback' }, ts: Date.now() }
  return cache.codeforces.data
}

export const cpService = {
  fetchLeetCode,
  fetchCodeforces,
}
