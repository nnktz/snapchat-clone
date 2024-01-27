import { Skeleton } from '@/components/ui/skeleton'

const Loading = () => {
  return (
    <div className="flex h-screen flex-[3_3_0%] flex-col bg-sigMain px-4 text-white">
      {/* Message topbar skeleton */}
      <div className="my-4 flex justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-6 w-32" />
        </div>

        <Skeleton className="h-8 w-8 rounded-full" />
      </div>

      <div className="my-4 flex flex-1 flex-col overflow-y-auto rounded-xl border border-sigColorBgBorder bg-sigSurface px-3 py-2">
        {/* Message container skeleton */}
        <div className="flex flex-col gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="flex items-center space-x-4" key={i}>
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message input skeleton */}
      <div className="my-3 flex items-center justify-between gap-3">
        <div className="flex flex-1 items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-9 w-full" />
        </div>

        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  )
}

export default Loading
