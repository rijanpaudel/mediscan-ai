'use client'

import { useEffect, useState } from 'react'
import { fetchUserReports, deleteReport } from '@/lib/reports'
import { getCurrentUser, signOut } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { FileText, Upload, History, LogOut, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const [reports, setReports] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      const currentUser = await getCurrentUser()
      if (!currentUser) {
        router.push('/auth')
        return
      }
      
      setUser(currentUser)
      const userReports = await fetchUserReports()
      setReports(userReports || [])
    } catch (error) {
      console.error('Error loading reports:', error)
      router.push('/auth')
    } finally {
      setLoading(false)
    }
  }

  async function handleLogout() {
    await signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  const urgentCount = reports.filter(r => r.ai_analysis?.urgency === 'urgent').length
  const thisMonth = reports.filter(r => {
    const date = new Date(r.upload_date)
    const now = new Date()
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
  }).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">MediScan AI</h1>
              <p className="text-sm text-gray-600">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Reports</p>
                <p className="text-3xl font-bold text-gray-900">{reports.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">This Month</p>
                <p className="text-3xl font-bold text-gray-900">{thisMonth}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Urgent Reports</p>
                <p className="text-3xl font-bold text-red-600">{urgentCount}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <span className="text-2xl">🚨</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link href="/dashboard/upload">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-lg">
                  <Upload className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Upload New Report</h3>
                  <p className="text-blue-100 text-sm">Analyze your medical reports with AI</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/dashboard/history">
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-lg">
                  <History className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">View History</h3>
                  <p className="text-green-100 text-sm">See all your past reports</p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Reports */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Reports</h2>
          </div>

          {reports.length === 0 ? (
            <div className="p-12 text-center">
              <FileText size={64} className="mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No reports yet</h3>
              <p className="text-gray-600 mb-6">Upload your first medical report to get started!</p>
              <Link href="/dashboard/upload">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Upload Report
                </button>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {reports.slice(0, 5).map((report) => (
                <div key={report.id} className="p-6 hover:bg-gray-50 transition">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FileText className="text-blue-600" size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold text-gray-900">{report.file_name}</h3>
                          {report.ai_analysis?.urgency === 'urgent' && (
                            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                              🚨 Urgent
                            </span>
                          )}
                          {report.ai_analysis?.urgency === 'consult_soon' && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium">
                              ⚠️ Consult Soon
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mb-2">
                          {new Date(report.upload_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                        {report.ai_analysis?.summary && (
                          <p className="text-sm text-gray-700">{report.ai_analysis.summary}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {reports.length > 5 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <Link href="/dashboard/history">
                <button className="text-blue-600 hover:underline text-sm font-medium">
                  View all {reports.length} reports →
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}