"use client"

interface DiffViewerProps {
  originalCode: string
  matchedCode: string
}

export default function DiffViewer({ originalCode, matchedCode }: DiffViewerProps) {
  const originalLines = originalCode.split("\n")
  const matchedLines = matchedCode.split("\n")

  // Simple diff algorithm - in a real app, you'd use a proper diff library
  const maxLines = Math.max(originalLines.length, matchedLines.length)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Original Code */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          Your Code
        </h4>
        <div className="bg-slate-900 dark:bg-slate-950 rounded-lg overflow-hidden">
          <div className="bg-slate-800 dark:bg-slate-900 px-4 py-2 text-xs text-slate-400 font-mono border-b border-slate-700">
            Original
          </div>
          <div className="p-4 font-mono text-sm text-slate-100 max-h-96 overflow-auto">
            {originalLines.map((line, index) => (
              <div key={index} className="flex">
                <span className="text-slate-500 mr-4 select-none w-8 text-right">{index + 1}</span>
                <span className={`flex-1 ${index < 4 ? "bg-red-900/30 text-red-200" : ""}`}>{line || " "}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Matched Code */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          Matched Source
        </h4>
        <div className="bg-slate-900 dark:bg-slate-950 rounded-lg overflow-hidden">
          <div className="bg-slate-800 dark:bg-slate-900 px-4 py-2 text-xs text-slate-400 font-mono border-b border-slate-700">
            GitHub - user/algorithms
          </div>
          <div className="p-4 font-mono text-sm text-slate-100 max-h-96 overflow-auto">
            {matchedLines.map((line, index) => (
              <div key={index} className="flex">
                <span className="text-slate-500 mr-4 select-none w-8 text-right">{index + 1}</span>
                <span className={`flex-1 ${index < 4 ? "bg-green-900/30 text-green-200" : ""}`}>{line || " "}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
