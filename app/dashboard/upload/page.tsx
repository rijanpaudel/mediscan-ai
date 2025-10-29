'use client'

import { useState } from 'react'
import { extractTextFromImage } from '@/lib/ocr'
import { analyzeReport } from '@/lib/ai'
import { saveReport } from '@/lib/reports'
import { useRouter } from 'next/navigation'
import { Upload, FileText, CheckCircle, AlertCircle, ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function UploadPage() {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState('')
  const [analysis, setAnalysis] = useState<any>(null)
  const [extractedText, setExtractedText] = useState('')
  const [error, setError] = useState('')
  const [fileName, setFileName] = useState('')
  const router = useRouter()

  const handleFileUpload = async (file: File) => {
    if (!file) return
    
    setUploading(true)
    setError('')
    setAnalysis(null)
    setExtractedText('')
    setFileName(file.name)
    
    try {
      // Step 1: Extract text with OCR
      setProgress('📄 Extracting text from image...')
      const text = await extractTextFromImage(file)
      setExtractedText(text)
      console.log('Extracted text:', text)
      
      if (!text || text.trim().length < 20) {
        throw new Error('Could not extract enough text from the image. Please use a clearer image.')
      }
      
      // Step 2: Analyze with AI
      setProgress('🤖 Analyzing with AI...')
      const aiAnalysis = await analyzeReport(text)
      console.log('AI Analysis:', aiAnalysis)
      
      // Step 3: Save to database
      setProgress('💾 Saving to database...')
      await saveReport(file.name, text, aiAnalysis)
      
      setAnalysis(aiAnalysis)
      setProgress('✅ Complete!')
      
    } catch (err: any) {
      console.error('Upload error:', err)
      setError(err.message || 'Failed to process report. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB')
        return
      }
      handleFileUpload(file)
    }
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
              <h1 className="text-2xl font-bold text-gray-900">Upload Report</h1>
              <p className="text-sm text-gray-600">Upload and analyze your medical report</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Area */}
        {!analysis && (
          <div className="bg-white rounded-xl shadow-sm border-2 border-dashed border-gray-300 p-12">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Upload className="text-blue-600" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Upload Medical Report
              </h3>
              <p className="text-gray-600 mb-6">
                Supports images (JPG, PNG) up to 5MB
              </p>
              
              <label className="inline-block">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={uploading}
                  className="hidden"
                />
                <span className={`inline-block px-6 py-3 rounded-lg font-semibold cursor-pointer transition ${
                  uploading 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}>
                  {uploading ? 'Processing...' : 'Choose File'}
                </span>
              </label>

              <p className="text-xs text-gray-500 mt-4">
                Your data is encrypted and secure
              </p>
            </div>
          </div>
        )}

        {/* Progress Indicator */}
        {uploading && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Loader2 className="animate-spin text-blue-600" size={24} />
              <p className="text-blue-900 font-medium">{progress}</p>
            </div>
            <p className="text-sm text-blue-700">
              Processing: {fileName}
            </p>
            <div className="mt-3 w-full bg-blue-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={24} />
              <div>
                <h4 className="font-semibold text-red-900 mb-1">Error</h4>
                <p className="text-red-700">{error}</p>
                <button
                  onClick={() => {
                    setError('')
                    setAnalysis(null)
                  }}
                  className="mt-3 text-sm text-red-600 hover:underline"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-6">
            {/* Success Header */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="text-green-600" size={28} />
                <h3 className="text-xl font-bold text-green-900">Analysis Complete!</h3>
              </div>
              <p className="text-green-700">Your report has been analyzed and saved.</p>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FileText size={20} className="text-blue-600" />
                Summary
              </h4>
              <p className="text-gray-700 leading-relaxed">{analysis.summary}</p>
            </div>

            {/* Urgency Level */}
            <div className={`rounded-xl p-6 border-2 ${
              analysis.urgency === 'urgent' 
                ? 'bg-red-50 border-red-300' 
                : analysis.urgency === 'consult_soon'
                ? 'bg-yellow-50 border-yellow-300'
                : 'bg-green-50 border-green-300'
            }`}>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                {analysis.urgency === 'urgent' && <span className="text-2xl">🚨</span>}
                {analysis.urgency === 'consult_soon' && <span className="text-2xl">⚠️</span>}
                {analysis.urgency === 'routine' && <span className="text-2xl">✅</span>}
                <span className={
                  analysis.urgency === 'urgent' 
                    ? 'text-red-900' 
                    : analysis.urgency === 'consult_soon'
                    ? 'text-yellow-900'
                    : 'text-green-900'
                }>
                  {analysis.urgency === 'urgent' && 'Urgent - Consult Doctor Immediately'}
                  {analysis.urgency === 'consult_soon' && 'Consult Doctor Soon'}
                  {analysis.urgency === 'routine' && 'Routine - No Immediate Concerns'}
                </span>
              </h4>
            </div>

            {/* Findings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Detailed Findings</h4>
              <div className="space-y-3">
                {analysis.findings?.map((finding: any, i: number) => (
                  <div
                    key={i}
                    className={`p-4 rounded-lg border-l-4 ${
                      finding.status === 'abnormal'
                        ? 'bg-red-50 border-red-500'
                        : 'bg-green-50 border-green-500'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-semibold text-gray-900">{finding.test}</h5>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        finding.status === 'abnormal'
                          ? 'bg-red-200 text-red-800'
                          : 'bg-green-200 text-green-800'
                      }`}>
                        {finding.status === 'abnormal' ? '⚠️ Abnormal' : '✓ Normal'}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-2 text-sm">
                      <div>
                        <span className="text-gray-600">Your Value:</span>
                        <span className="ml-2 font-medium text-gray-900">{finding.value}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Normal Range:</span>
                        <span className="ml-2 font-medium text-gray-900">{finding.normalRange}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{finding.explanation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            {analysis.recommendations && analysis.recommendations.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Recommendations</h4>
                <ul className="space-y-2">
                  {analysis.recommendations.map((rec: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-blue-600 mt-1">•</span>
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Extracted Text */}
            {extractedText && (
              <details className="bg-white rounded-xl shadow-sm border border-gray-200">
                <summary className="p-6 cursor-pointer hover:bg-gray-50 transition font-semibold text-gray-900">
                  View Extracted Text
                </summary>
                <div className="px-6 pb-6 border-t border-gray-200 pt-4">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg overflow-auto max-h-96">
                    {extractedText}
                  </pre>
                </div>
              </details>
            )}

            {/* Actions */}
            <div className="flex gap-4">
              <Link href="/dashboard" className="flex-1">
                <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                  Back to Dashboard
                </button>
              </Link>
              <button
                onClick={() => {
                  setAnalysis(null)
                  setExtractedText('')
                  setFileName('')
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
              >
                Upload Another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}