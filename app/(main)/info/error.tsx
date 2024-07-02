'use client'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="h-4/5 w-full flex items-center justify-center">
      <h2>網路連線失敗</h2>
      <button onClick={() => reset()}>請稍後再試，或聯絡客服</button>
    </div>
  )
}