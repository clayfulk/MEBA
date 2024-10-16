"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Bot, User } from "lucide-react"

export function Page() {
  const [messages, setMessages] = useState<{ role: "user" | "bot"; content: string }[]>([])
  const [input, setInput] = useState("")
  const router = useRouter()

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message to the chat
    setMessages((prev) => [...prev, { role: "user", content: input }])
    
    // Clear input field
    setInput("")

    // Simulate bot response (replace this with actual API call to your ChatGPT endpoint)
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", content: "This is a simulated response. In a real implementation, this would be the response from the ChatGPT API based on the user's input and the relevant organizational documents." }])
    }, 1000)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <Image
            src="/images/logo.png"
            alt="MEBA App Logo"
            width={32}
            height={32}
            className="rounded-md object-cover"
            priority
          />
          <span className="ml-2 text-lg font-semibold">MEBA Chat</span>
        </Link>
        <nav className="ml-auto">
          <Button variant="ghost" onClick={() => router.push("/")}>Back to Home</Button>
        </nav>
      </header>
      <main className="flex-1 p-4 md:p-6 flex flex-col">
        <Card className="flex-1 flex flex-col">
          <CardHeader>
            <CardTitle>Chat with MEBA</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden">
            <ScrollArea className="h-[calc(100vh-16rem)]">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-4`}>
                  <div className={`flex items-start ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"} mr-2`}>
                      {message.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                    </div>
                    <div className={`max-w-[75%] rounded-lg px-4 py-2 ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}