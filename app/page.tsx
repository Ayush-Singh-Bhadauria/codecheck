"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, Play, Download, Clock, AlertTriangle, CheckCircle } from "lucide-react"
import Navigation from "@/components/navigation"
import CodeEditor from "@/components/code-editor"
import DiffViewer from "@/components/diff-viewer"

export default function HomePage() {
  const [code, setCode] = useState(`function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`)

  const [language, setLanguage] = useState("javascript")
  const [onlineSources, setOnlineSources] = useState(true)
  const [internalSources, setInternalSources] = useState(false)
  const [isChecking, setIsChecking] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState({
    score: 0,
    timeTaken: 0,
    matches: [],
  })

  const handleRunCheck = async () => {
    setIsChecking(true)
    setShowResults(false)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Mock results
    setResults({
      score: 23,
      timeTaken: 2.4,
      matches: [
        {
          source: "GitHub - user/algorithms",
          similarity: 85,
          lines: "1-8",
          url: "https://github.com/user/algorithms",
        },
        {
          source: "StackOverflow Answer",
          similarity: 67,
          lines: "2-4",
          url: "https://stackoverflow.com/questions/123",
        },
      ],
    })

    setIsChecking(false)
    setShowResults(true)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCode(e.target?.result as string)
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Navigation />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Column - Code Editor */}
          <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Code Input</span>
                <div className="flex items-center gap-2">
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="cpp">C++</SelectItem>
                      <SelectItem value="csharp">C#</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" size="sm" className="relative bg-transparent">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload File
                    <input
                      type="file"
                      accept=".js,.py,.java,.cpp,.cs,.txt"
                      onChange={handleFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CodeEditor value={code} onChange={setCode} language={language} />
            </CardContent>
          </Card>

          {/* Right Column - Options */}
          <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Check Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="online-sources" className="text-base font-medium">
                    Compare with Online Sources
                  </Label>
                  <Switch id="online-sources" checked={onlineSources} onCheckedChange={setOnlineSources} />
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Check against GitHub, StackOverflow, and other public repositories
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="internal-sources" className="text-base font-medium">
                    Compare with Internal Submissions
                  </Label>
                  <Switch id="internal-sources" checked={internalSources} onCheckedChange={setInternalSources} />
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Check against previously submitted code in your organization
                </p>
              </div>

              <Button
                onClick={handleRunCheck}
                disabled={isChecking || (!onlineSources && !internalSources)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3"
              >
                {isChecking ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Checking...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Run Check
                  </>
                )}
              </Button>

              {isChecking && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Analyzing code...</span>
                    <span>45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        {showResults && (
          <div className="space-y-8">
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Plagiarism Results</span>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div
                      className={`text-4xl font-bold mb-2 ${
                        results.score < 30 ? "text-green-600" : results.score < 70 ? "text-yellow-600" : "text-red-600"
                      }`}
                    >
                      {results.score}%
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">Similarity Score</p>
                    <div className="flex items-center justify-center mt-2">
                      {results.score < 30 ? (
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Low Risk
                        </Badge>
                      ) : results.score < 70 ? (
                        <Badge
                          variant="secondary"
                          className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                        >
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Medium Risk
                        </Badge>
                      ) : (
                        <Badge variant="destructive">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          High Risk
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">{results.matches.length}</div>
                    <p className="text-slate-600 dark:text-slate-400">Sources Found</p>
                  </div>

                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-600 mb-2 flex items-center justify-center">
                      <Clock className="w-8 h-8 mr-2" />
                      {results.timeTaken}s
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">Time Taken</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Matched Sources</h3>
                  {results.matches.map((match, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">{match.source}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Lines {match.lines}</p>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-lg font-bold ${
                            match.similarity > 80
                              ? "text-red-600"
                              : match.similarity > 60
                                ? "text-yellow-600"
                                : "text-green-600"
                          }`}
                        >
                          {match.similarity}%
                        </div>
                        <Button variant="link" size="sm" className="p-0 h-auto">
                          View Source
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Diff Viewer */}
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Code Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <DiffViewer
                  originalCode={code}
                  matchedCode={`function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// This is a classic recursive implementation
console.log(fibonacci(10));`}
                />
              </CardContent>
            </Card>
          </div>
        )}
      </section>
    </div>
  )
}
