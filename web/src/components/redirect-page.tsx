import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiService } from '../services/api'

export function RedirectPage() {
  const { shortCode } = useParams<{ shortCode: string }>()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const redirectToOriginalUrl = async () => {
      if (!shortCode) {
        setError('Link inválido')
        return
      }

      try {
        // First try to get from localStorage (for local development)
        const savedLinks = localStorage.getItem('brevly-links')
        if (savedLinks) {
          const links = JSON.parse(savedLinks)
          const link = links.find((l: { shortCode: string; originalUrl: string }) => l.shortCode === shortCode)
          if (link) {
            window.location.href = link.originalUrl
            return
          }
        }

        // If not found locally, try the API
        const linkData = await apiService.getLinkByShortCode(shortCode)
        window.location.href = linkData.originalUrl
      } catch (error) {
        console.error('Redirect error:', error)
        setError('Link não encontrado')
      }
    }

    redirectToOriginalUrl()
  }, [shortCode])

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center max-w-md w-full">
          <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-600 mb-2">404</h1>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Link não encontrado</h2>
          <p className="text-gray-600 mb-6">
            O link que você está tentando acessar não existe, foi removido ou é uma URL inválida. 
            Saiba mais em <a href="/" className="text-blue-600 hover:underline">brev.ly</a>.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Voltar ao início
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center max-w-md w-full">
        <div className="w-16 h-16 mx-auto mb-6 text-blue-600">
          <svg className="animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-600 mb-2">Redirecionando...</h2>
        <p className="text-gray-600 mb-4">
          O link será aberto automaticamente em alguns instantes.
        </p>
        <p className="text-sm text-gray-500">
          Não foi redirecionado? <button className="text-blue-600 hover:underline">Acesse aqui</button>
        </p>
      </div>
    </div>
  )
}
