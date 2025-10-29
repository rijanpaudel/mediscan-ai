'use client'

import { useEffect, useState } from 'react'
import { fetchUserReports, deleteReport } from '@/lib/reports'
import { getCurrentUser } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { FileText, Trash2, ArrowLeft, Search, Calendar } from 'lucide-react'
import Link from 'next/link'

export default function HistoryPage() {
  const [reports, setReports] = useState<any[]>([])
  const [filteredReports, setFilteredReports] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterUrgency, setFilterUrgency] = useState('all')
  const [selectedReport, setSelectedReport] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    filterReports()
  }, [searchTerm, filterUrgency, reports])

  async function loadData() {
    try {
      const currentUser = await getCurrentUser()
      if (!currentUser) {
        router.push('/auth')
        return
      }
      
      const userReports = await fetchUserReports()
      setReports(userReports || [])
      setFilteredReports(userReports || [])
    } catch (error) {
      console.error('Error loading reports:', error)
    } finally {
      setLoading(false)
    }
  }

  function filterReports() {
    let filtered = reports

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(r =>
        r.file_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Urgency filter
    if (filterUrgency !== 'all') {
      filtered = filtered.filter(r => r.ai_analysis?.urgency === filterUrgency)
    }

    setFilteredReports(filtered)
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this report?')) return
    
    try {
      await deleteReport(id)
      setReports(reports.filter(r => r.id !== id))
      if (selectedReport?.id === id) {
        setSelectedReport(null)
      }
    } catch (error) {
      alert('Failed to delete report')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading history...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <ArrowLeft size={20} />
              </button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Report History</h1>
              <p className="text-sm text-gray-600">{reports.length} total reports</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Urgency Filter */}
            <select
              value={filterUrgency}
              onChange={(e) => setFilterUrgency(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Urgency Levels</option>
              <option value="routine">Routine</option>
              <option value="consult_soon">Consult Soon</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>

        {/* Reports List */}
        {filteredReports.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <FileText size={64} className="mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {searchTerm || filterUrgency !== 'all' ? 'No reports found' : 'No reports yet'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterUrgency !== 'all' 
                ? 'Try adjusting your filters' 
                : 'Upload your first medical report to get started'}
            </p>
            {!searchTerm && filterUrgency === 'all' && (
              <Link href="/dashboard/upload">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Upload Report
                </button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Reports List */}
            <div className="space-y-4">
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  onClick={() => setSelectedReport(report)}
                  className={`bg-white rounded-xl shadow-sm border-2 p-6 cursor-pointer transition ${
                    selectedReport?.id === report.id
                      ? 'border-blue-500 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                        <FileText className="text-blue-600" size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{report.file_name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar size={14} className="text-gray-400" />
                          <p className="text-sm text-gray-500">
                            {new Date(report.upload_date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(report.id)
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition flex-shrink-0"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {report.ai_analysis?.urgency && (
                    <div className="flex items-center gap-2">
                      {report.ai_analysis.urgency === 'urgent' && (
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                          🚨 Urgent
                        </span>
                      )}
                      {report.ai_analysis.urgency === 'consult_soon' && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium">
                          ⚠️ Consult Soon
                        </span>
                      )}
                      {report.ai_analysis.urgency === 'routine' && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                          ✓ Routine
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Report Details */}
            <div className="lg:sticky lg:top-4 lg:h-fit">
              {selectedReport ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Report Details</h3>
                  
                  {selectedReport.ai_analysis ? (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Summary</h4>
                        <p className="text-gray-700 text-sm">{selectedReport.ai_analysis.summary}</p>
                      </div>

                      {selectedReport.ai_analysis.findings && selectedReport.ai_analysis.findings.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Findings</h4>
                          <div className="space-y-2">
                            {selectedReport.ai_analysis.findings.map((finding: any, i: number) => (
                              <div
                                key={i}
                                className={`p-3 rounded-lg text-sm ${
                                  finding.status === 'abnormal'
                                    ? 'bg-red-50 border border-red-200'
                                    : 'bg-green-50 border border-green-200'
                                }`}
                              >
                                <p className="font-semibold text-gray-900">{finding.test}</p>
                                <p className="text-gray-700 mt-1">{finding.explanation}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedReport.ai_analysis.recommendations && selectedReport.ai_analysis.recommendations.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Recommendations</h4>
                          <ul className="space-y-1">
                            {selectedReport.ai_analysis.recommendations.map((rec: string, i: number) => (
                              <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                                <span className="text-blue-600">•</span>
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No analysis available for this report.</p>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                  <FileText size={48} className="mx-auto mb-3 text-gray-300" />
                  <p className="text-gray-600">Select a report to view details</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}