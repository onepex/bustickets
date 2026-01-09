import { OperatorCard } from '@/components/OperatorCard'
import { operators } from '@/lib/operators'

export default function OperatorPreviewPage() {
  const operatorNames = Object.keys(operators)

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Operator Cards Preview</h1>
        <p className="text-gray-600 mb-8">All {operatorNames.length} operators with logos and bus photos</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {operatorNames.map((name) => (
            <OperatorCard
              key={name}
              name={name}
              rating={4.5}
              description={`${operators[name].name} - Major provincial bus operator serving routes across the Philippines.`}
              terminals={['Cubao', 'Pasay']}
              priceRange="₱500 - ₱1,200"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
