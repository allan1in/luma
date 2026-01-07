import { Avatar } from "./avatar";
import { LoadingMsg } from "./loading-msg";
import { MessageContent } from "./message-content";
import { CopyButton } from "./copy-button";
import { cn } from "@/lib/utils";

export function MessageAI({ className, message }: { className?: string, message?: string }) {
  return (
    <div className={cn("flex gap-4 max-w-full animate-slide-in-left", className)}> 
        <div className="shrink-0">
            <Avatar className="bg-gradient-to-br from-neutral-600 via-neutral-700 to-neutral-900"/>
        </div>
        {message ? <div className="flex flex-col gap-2">
            <MessageContent className="bg-neutral-800">
              {message}
            </MessageContent>
            <CopyButton text={message} align="left" />
        </div> : (
          <LoadingMsg/>
        )}
        <div className="shrink-0 w-11">
        </div>
    </div>
  );
}