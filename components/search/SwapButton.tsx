'use client'

import { ArrowRightLeft } from 'lucide-react'

interface SwapButtonProps {
  onClick: () => void
  className?: string
}

export default function SwapButton({ onClick, className = '' }: SwapButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`p-3 bg-gray-100 hover:bg-blue-100 rounded-full transition-all duration-300 group ${className}`}
      title="Swap locations"
      type="button"
    >
      <ArrowRightLeft className="w-5 h-5 text-gray-500 group-hover:text-[#035a9e] group-hover:rotate-180 transition-all duration-300" />
    </button>
  )
}
