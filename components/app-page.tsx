"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, MessageCircle, Shield, Users, Clock, Database, Zap, Menu, User } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Page() {
  const [showLogin, setShowLogin] = useState(false)
  return (
    <div className="flex flex-col min-h-screen">
      {showLogin ? (
        <LoginForm onBackToHome={() => setShowLogin(false)} />
      ) : (
        <LandingPage onLogin={() => setShowLogin(true)} />
      )}
    </div>
  )
}

function LandingPage({ onLogin }: { onLogin: () => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="#">
          <Image
            src="/images/logo.png"
            alt="MEBA App Logo"
            width={32}
            height={32}
            className="rounded-md object-cover"
            priority
          />
          <span className="ml-2 text-lg font-semibold">MEBA</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4 hidden md:block" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4 hidden md:block" href="#how-it-works">
            How It Works
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4 hidden md:block" href="#benefits">
            Benefits
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4 hidden md:block" href="#testimonials">
            Testimonials
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogin}>Login</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-4">
                <Link
                  className="text-sm font-medium hover:underline underline-offset-4"
                  href="#features"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  className="text-sm font-medium hover:underline underline-offset-4"
                  href="#how-it-works"
                  onClick={() => setIsMenuOpen(false)}
                >
                  How It Works
                </Link>
                <Link
                  className="text-sm font-medium hover:underline underline-offset-4"
                  href="#benefits"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Benefits
                </Link>
                <Link
                  className="text-sm font-medium hover:underline underline-offset-4"
                  href="#testimonials"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Testimonials
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-secondary/20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="relative w-32 h-32 md:w-48 md:h-48">
                <Image
                  src="/images/logo.png"
                  alt="MEBA App Logo"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                  priority
                />
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Members&apos; Employment and Benefits Assistant
                </h1>
                <p className="text-xl font-semibold text-primary">Your Union, Simplified</p>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Navigate your employment, benefits, and insurance policies with ease. MEBA empowers union members with
                  instant access to vital information, powered by AI technology.
                </p>
              </div>
              <div className="space-x-4">
                <Button onClick={onLogin} size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">Get Started</Button>
                <Button variant="outline" size="lg" className="bg-background text-primary hover:bg-secondary/20">Learn More</Button>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    AI-Powered Chatbot
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Ask questions and get instant, accurate answers about your contracts and benefits, powered by advanced AI technology.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Document Access
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  View your contracts and agreements in a secure, read-only format. Access important documents anytime, anywhere.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Secure Platform
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Your data is protected with state-of-the-art security measures, ensuring confidentiality and peace of mind.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    24/7 Availability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Access your information and get answers to your questions any time of day or night, 365 days a year.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Database className="w-5 h-5 mr-2" />
                    Centralized Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  All your employment and benefits information in one place, eliminating the need to search through multiple sources.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-5 h-5 mr-2" />
                    Real-time Updates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Stay informed with the latest changes to your benefits and employment terms as they happen.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/10">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">How It Works</h2>
            <ol className="space-y-8">
              <li className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Document Upload</h3>
                  <p className="text-gray-600">Union administrators securely upload key documents to the MEBA platform, including contracts, benefit plans, and policy documents.</p>
                </div>
              </li>
              <li className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">AI Processing</h3>
                  <p className="text-gray-600">Our advanced AI system analyzes and indexes the uploaded documents, making the information easily searchable and accessible.</p>
                </div>
              </li>
              <li className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Member Access</h3>
                  <p className="text-gray-600">Union members log in to their personalized MEBA dashboard, where they can view documents and interact with the AI chatbot.</p>
                </div>
              </li>
              <li className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Information Retrieval</h3>
                  <p className="text-gray-600">Members can ask questions or browse documents directly. The AI provides instant, accurate answers based on the uploaded information.</p>
                </div>
              </li>
              <li className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold">
                  5
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Continuous Learning</h3>
                  <p className="text-gray-600">The AI system continuously improves its responses based on user interactions, ensuring increasingly accurate and helpful information.</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section id="benefits" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    For Union Members
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Instant access to employment information</li>
                    <li>Clear explanations of complex contract terms</li>
                    <li>Better understanding of your rights and benefits</li>
                    <li>24/7 availability of information</li>
                    <li>Reduced stress and uncertainty about employment terms</li>
                    <li>Empowerment through knowledge and easy access to information</li>
                    <li>Time-saving alternative to manual document searches</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    For Union Administrators
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Streamlined communication with members</li>
                    
                    <li>Reduced workload for administrative staff</li>
                    <li>Improved member engagement and satisfaction</li>
                    <li>Easy document management and updates</li>
                    <li>Decreased number of routine inquiries, allowing focus on complex issues</li>
                    <li>Enhanced transparency and trust within the union</li>
                    <li>Data-driven insights into member concerns and frequently asked questions</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/10">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-gray-600 mb-4">&quot;MEBA has revolutionized how I access my union information. It&apos;s like having a knowledgeable union rep available 24/7!&quot;</p>
                  <p className="font-semibold">- Sarah J., Union Member</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-gray-600 mb-4">&quot;As a union administrator, MEBA has significantly reduced our workload. Members get instant answers, and we can focus on more complex issues.&quot;</p>
                  <p className="font-semibold">- Michael T., Union Administrator</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-gray-600 mb-4">&quot;The AI chatbot is incredibly accurate and helpful. It&apos;s made understanding my benefits so much easier!&quot;</p>
                  <p className="font-semibold">- Emily R., New Union Member</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Simplify Your Union Experience?
              </h2>
              <p className="mx-auto max-w-[600px] text-primary-foreground md:text-xl">
                Join MEBA today and empower your union members with instant access to the information they need.
              </p>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input type="email" placeholder="Enter your email" className="flex-grow" />
                  <Button type="submit" variant="secondary">Get Started</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <div className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="MEBA App Logo"
            width={24}
            height={24}
            className="mr-2 rounded-md object-cover"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 MEBA App. All rights reserved.</p>
        </div>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy Policy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Contact Us
          </Link>
        </nav>
      </footer>
    </>
  )
}

function LoginForm({ onBackToHome }: { onBackToHome: () => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulated API call
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 2000)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Image
              src="/images/logo.png"
              alt="MEBA App Logo"
              width={60}
              height={60}
              className="rounded-md object-cover"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Login to MEBA</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Remember me
                </Label>
              </div>
            </div>
            <Button className="w-full mt-6" type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log in"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center space-y-2">
          <Button variant="link" className="text-sm text-muted-foreground">
            Forgot your password?
          </Button>
          <div className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Button variant="link" className="p-0 text-primary">
              Contact your union administrator
            </Button>
          </div>
          <Button variant="ghost" onClick={onBackToHome}>Back to Home</Button>
        </CardFooter>
      </Card>
    </div>
  )
}