import { cn } from "@/lib/utils";
import { LoadingDots } from "./loading-dots";

export function MessageContent({
  className,
  children,
  isLoading,
}: {
  className?: string;
  children?: React.ReactNode;
  isLoading?: boolean;
}) {
  return (
    <div className={cn("py-2 px-4 rounded-lg leading-7 min-h-10 max-w-full whitespace-pre-wrap break-all flex items-center", className)}>
      {isLoading ? <LoadingDots /> : children}
    </div>
  );
}
