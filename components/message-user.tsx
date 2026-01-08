import { MessageContent } from "./message-content";
import { CopyToggle } from "./copy-toggle";
import { cn } from "@/lib/utils";

export function MessageUser({
  className,
  message,
}: {
  className?: string;
  message?: string;
}) {
  return (
    <div
      className={cn("flex justify-end gap-4 animate-slide-in-right", className)}
    >
      <div className="flex flex-col gap-2 items-end">
        <MessageContent className="bg-primary text-primary-foreground" isLoading={!message}>
          {message}
        </MessageContent>
        {message && <CopyToggle text={message} align="right" />}
      </div>
    </div>
  );
}
