export const USE_SUPABASE = import.meta.env.VITE_USE_SUPABASE === 'true'

export async function withSupabaseFallback(query, fallback) {
  if (!USE_SUPABASE) return fallback
  try {
    return await query()
  } catch {
    return fallback
  }
}
