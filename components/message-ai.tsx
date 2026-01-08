import { MessageContent } from "./message-content";
import { CopyToggle } from "./copy-toggle";
import { cn } from "@/lib/utils";

export function MessageAI({ className, message }: { className?: string, message?: string }) {
  return (
    <div className={cn("flex gap-4 max-w-full animate-slide-in-left", className)}> 
      <div className="flex flex-col gap-2">
        <MessageContent className="bg-muted text-foreground" isLoading={!message}>
          {message}
        </MessageContent>
        {message && <CopyToggle text={message} align="left" />}
      </div>
    </div>
  );
}