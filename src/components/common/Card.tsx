interface CardProps {
  children: React.ReactNode
}

function Card({ children }: CardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      {children}
    </div>
  )
}

export default Card