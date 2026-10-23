interface CardProps {
  children: React.ReactNode
}

function Card({ children }: CardProps) {
  return (
    <div className="rounded-lg border border-al-border bg-white p-6">
      {children}
    </div>
  )
}

export default Card