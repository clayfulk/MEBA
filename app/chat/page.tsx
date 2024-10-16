"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Send, Bot, User, Plus, RefreshCw } from "lucide-react"

type Message = {
  role: "user" | "assistant"
  content: string
}

type Document = {
  id: string
  name: string
}

const documents: Document[] = [
  { id: 'crowley', name: 'Crowley MOU' },
  { id: 'express', name: 'Express Class' },
  { id: 'drycargo', name: 'Dry Cargo Agreement' },
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [linkedDocuments, setLinkedDocuments] = useState<string[]>([])
  const router = useRouter()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return

    const userMessage: Message = { role: "user", content }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [...messages, userMessage], linkedDocuments }),
      });

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'API request failed')
      }

      const assistantMessage: Message = await response.json()
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error calling chat API:", error)
      setError(error instanceof Error ? error.message : 'An unknown error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage(input)
  }

  const handleSuggestedPrompt = (prompt: string) => {
    handleSendMessage(prompt)
  }

  const toggleDocument = (documentId: string) => {
    setLinkedDocuments(prev => 
      prev.includes(documentId)
        ? prev.filter(id => id !== documentId)
        : [...prev, documentId]
    )
  }

  const suggestedPrompts = [
    'Explain the overtime rules in the Crowley MOU',
    'Summarize the Express Class benefits',
    'What are the key points in the Dry Cargo agreement?',
    'Compare vacation policies across agreements'
  ]

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Left Sidebar */}
      <div className="w-56 bg-secondary p-4 flex flex-col">
        <Button className="mb-4" onClick={() => setMessages([])}>
          <Plus className="mr-2 h-4 w-4" /> New Chat
        </Button>
        <div className="flex-grow">
          {/* Chat history could go here */}
        </div>
        <Button variant="outline" className="mt-auto">
          Upgrade to Plus
        </Button>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-secondary p-2 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="MEBA Logo"
              width={32}
              height={32}
              className="mr-2"
            />
            <span className="text-xl font-bold">MEBA Chat</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setMessages([])}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-auto p-4">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="grid grid-cols-2 gap-4 max-w-2xl">
                {suggestedPrompts.map((prompt, index) => (
                  <Card 
                    key={index} 
                    className="p-3 cursor-pointer hover:bg-secondary/50 transition-colors"
                    onClick={() => handleSuggestedPrompt(prompt)}
                  >
                    <CardContent className="p-0">
                      <p className="font-medium text-sm">{prompt}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-4`}>
                <div className={`flex items-start ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"} mr-2`}>
                    {message.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                  </div>
                  <div className={`max-w-[70%] rounded-lg px-4 py-2 ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                    {message.role === "user" ? (
                      message.content
                    ) : (
                      <div dangerouslySetInnerHTML={{ __html: message.content }} />
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-background">
          <form onSubmit={handleFormSubmit} className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Ask MEBAssistant..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
          {error && (
            <p className="text-destructive mt-2">{error}</p>
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-56 bg-secondary p-4">
        <h2 className="font-semibold mb-4">Linked Documents</h2>
        <div className="space-y-2">
          {documents.map((doc) => (
            <Button 
              key={doc.id}
              variant={linkedDocuments.includes(doc.id) ? 'secondary' : 'ghost'} 
              className={`w-full justify-start ${
                linkedDocuments.includes(doc.id) 
                  ? 'border-2 border-primary rounded-md' 
                  : 'border border-transparent'
              }`}
              onClick={() => toggleDocument(doc.id)}
            >
              {doc.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}