const API_BASE_URL = 'http://localhost:3333' // Adjust based on your backend port

export interface CreateLinkRequest {
  originalUrl: string
  shortCode: string
}

export interface LinkResponse {
  id: string
  shortCode: string
  originalUrl: string
  clicks: number
  createdAt: string
}

export interface ApiError {
  message: string
}

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    })

    if (!response.ok) {
      const error: ApiError = await response.json().catch(() => ({ 
        message: 'Network error' 
      }))
      throw new Error(error.message || `HTTP ${response.status}`)
    }

    return response.json()
  }

  async createLink(data: CreateLinkRequest): Promise<LinkResponse> {
    return this.request<LinkResponse>('/api/links', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async getLinks(): Promise<LinkResponse[]> {
    return this.request<LinkResponse[]>('/api/links')
  }

  async getLinkByShortCode(shortCode: string): Promise<LinkResponse> {
    return this.request<LinkResponse>(`/api/links/${shortCode}`)
  }

  async deleteLink(id: string): Promise<void> {
    return this.request<void>(`/api/links/${id}`, {
      method: 'DELETE',
    })
  }

  async exportLinks(): Promise<Blob> {
    const response = await fetch(`${API_BASE_URL}/api/links/export`, {
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    return response.blob()
  }
}

export const apiService = new ApiService()
