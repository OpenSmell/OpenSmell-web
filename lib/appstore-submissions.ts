export type SubmissionType = "dataset" | "plugin" | "app"
export type SubmissionStatus = "pending" | "approved" | "rejected"

export interface AppStoreSubmission {
  id: string
  name: string
  type: SubmissionType
  description: string
  author: string
  email: string
  price: string
  link: string
  tags: string[]
  status: SubmissionStatus
  submittedAt: string
  reviewedAt?: string
}

const STORAGE_KEY = "opensmell-appstore-submissions"
const APPROVED_KEY = "opensmell-appstore-approved"

export function loadSubmissions(): AppStoreSubmission[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveSubmissions(list: AppStoreSubmission[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

export function addSubmission(sub: Omit<AppStoreSubmission, "id" | "status" | "submittedAt">) {
  const list = loadSubmissions()
  const entry: AppStoreSubmission = {
    ...sub,
    id: `sub-${Date.now().toString(36)}`,
    status: "pending",
    submittedAt: new Date().toISOString(),
  }
  list.unshift(entry)
  saveSubmissions(list)
  return entry
}

export function reviewSubmission(id: string, status: "approved" | "rejected") {
  const list = loadSubmissions()
  const sub = list.find((s) => s.id === id)
  if (sub) {
    sub.status = status
    sub.reviewedAt = new Date().toISOString()
    saveSubmissions(list)
  }
  if (status === "approved") {
    const approved = loadApproved()
    if (sub && !approved.some((a) => a.id === sub.id)) {
      approved.push(sub)
      localStorage.setItem(APPROVED_KEY, JSON.stringify(approved))
    }
  }
  return list
}

export function loadApproved(): AppStoreSubmission[] {
  try {
    const raw = localStorage.getItem(APPROVED_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export async function submitToServer(sub: Omit<AppStoreSubmission, "id" | "status" | "submittedAt">): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sub),
    })
    const data = await res.json().catch(() => null)
    if (res.ok && data?.ok) return { ok: true }
    return { ok: false, error: data?.error || "Something went wrong. Please try again." }
  } catch {
    return { ok: false, error: "Network error. Please try again." }
  }
}
