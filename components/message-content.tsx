import { cn } from "@/lib/utils";

export function MessageContent({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p className={cn("py-2 px-4 rounded-lg leading-7 min-h-10 max-w-full whitespace-pre-wrap break-all", className)}>
      {children}
    </p>
  );
}
