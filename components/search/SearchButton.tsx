'use client'

import { Search, Loader2 } from 'lucide-react'

interface SearchButtonProps {
  onClick: () => void
  disabled?: boolean
  loading?: boolean
  className?: string
}

export default function SearchButton({
  onClick,
  disabled = false,
  loading = false,
  className = '',
}: SearchButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        px-6 py-3 rounded-xl font-semibold 
        flex items-center justify-center gap-2 
        transition-all duration-200
        ${disabled || loading
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
          : 'bg-[#046cbb] hover:bg-[#035a9e] text-white shadow-lg shadow-[#046cbb]/25 hover:shadow-[#046cbb]/35 hover:scale-[1.02] active:scale-[0.98]'
        }
        ${className}
      `}
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="hidden sm:inline">Searching...</span>
        </>
      ) : (
        <>
          <Search className="w-5 h-5" />
          <span className="hidden sm:inline">Search</span>
        </>
      )}
    </button>
  )
}
