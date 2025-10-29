import { supabase, getCurrentUser } from './supabase'

export async function saveReport(
  fileName: string,
  extractedText: string,
  aiAnalysis: any
) {
  const user = await getCurrentUser()
  
  if (!user) {
    throw new Error('User not authenticated')
  }

  const { data, error } = await supabase
    .from('reports')
    .insert({
      user_id: user.id,
      file_name: fileName,
      extracted_text: extractedText,
      ai_analysis: aiAnalysis
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function fetchUserReports() {
  const user = await getCurrentUser()
  
  if (!user) {
    throw new Error('User not authenticated')
  }

  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .eq('user_id', user.id)
    .order('upload_date', { ascending: false })

  if (error) throw error
  return data
}

export async function deleteReport(reportId: string) {
  const { error } = await supabase
    .from('reports')
    .delete()
    .eq('id', reportId)

  if (error) throw error
}