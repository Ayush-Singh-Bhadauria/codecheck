"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language: string
}

export default function CodeEditor({ value, onChange, language }: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.max(400, textareaRef.current.scrollHeight)}px`
    }
  }, [value])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault()
      const start = e.currentTarget.selectionStart
      const end = e.currentTarget.selectionEnd
      const newValue = value.substring(0, start) + "  " + value.substring(end)
      onChange(newValue)

      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2
        }
      }, 0)
    }
  }

  return (
    <div className="relative">
      <div className="absolute top-3 left-3 text-xs text-slate-400 dark:text-slate-500 font-mono">{language}</div>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full min-h-[400px] p-4 pt-8 bg-slate-900 dark:bg-slate-950 text-slate-100 font-mono text-sm rounded-lg border border-slate-700 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none overflow-auto"
        placeholder="Paste your code here or upload a file..."
        spellCheck={false}
      />
      <div className="absolute bottom-3 right-3 text-xs text-slate-400 dark:text-slate-500 font-mono">
        {value.split("\n").length} lines
      </div>
    </div>
  )
}
