import { cn } from "@/lib/utils";

export function ErrorBox({ className, message }: { className?: string; message: string }) {
  return (
    <div className={cn("px-4 py-4 bg-red-900/20 border border-red-900/50 text-red-300 rounded-lg whitespace-pre-wrap break-all", className)}>
      Error: {message}
    </div>
  );
}
