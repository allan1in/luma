"use client";

import { ErrorMessage } from "@/components/error-message";
import { Input } from "@/components/input";
import { MessageAI } from "@/components/message-ai";
import { MessageUser } from "@/components/message-user";
import { Navbar } from "@/components/navbar";
import { useState, useEffect, useRef } from "react";

interface Message {
  role: "user" | "assistant" | "error";
  content: string;
}

export default function Home() {
  // 发送消息
  const [messages, setMessages] = useState<Message[]>([]);

  async function handleSend(inputText: string, done: () => void) {
    autoScrollRef.current = true;
    const newMessages = [
      ...messages,
      { role: "user" as const, content: inputText },
      { role: "assistant" as const, content: "" },
    ];
    setMessages(newMessages);

    // 过滤掉 error 类型的消息
    const apiMessages = newMessages.filter((m) => m.role !== "error");

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ messages: apiMessages }),
    });

    if (!res.body) {
      done();
      return;
    }

    // 如果报错
    if (!res.ok) {
      const errData = await res.json();
      // 删除最后一条空消息
      setMessages((prev) => prev.slice(0, -1));
      // 添加错误消息
      setMessages((prev) => [
        ...prev,
        { role: "error", content: `${errData.error}` },
      ]);
      done();
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let resMsg = "";

    while (true) {
      const { done: streamDone, value } = await reader.read();
      if (streamDone) break;
      resMsg += decoder.decode(value);

      setMessages((prev) => {
        const msgCopy = [...prev];
        const last = msgCopy[msgCopy.length - 1];
        last.content = resMsg;
        return msgCopy;
      });
    }

    done();
  }

  // 自动滚动
  const autoScrollRef = useRef(true);

  useEffect(() => {
    if (!autoScrollRef.current) return;
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    const handleWheel = () => {
      autoScrollRef.current = false;
    };
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div>
      <Navbar />
      <main className="flex items-center justify-center min-h-dvh px-4 pt-14">
        <div className="py-4 max-w-3xl w-full flex flex-col min-h-[calc(100dvh-3.5rem)]">
          <div className="pt-4 pb-52">
            {messages.map((m, id) =>
              m.role === "user" ? (
                <MessageUser key={id} className="mb-8" message={m.content} />
              ) : m.role === "assistant" ? (
                <MessageAI key={id} className="mb-8" message={m.content} />
              ) : (
                <ErrorMessage className="mb-8" key={id} message={m.content} />
              )
            )}
          </div>
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-3xl pb-4 bg-background rounded-t-2xl">
            <Input className="w-full" onSend={handleSend} />
          </div>
        </div>
      </main>
    </div>
  );
}
