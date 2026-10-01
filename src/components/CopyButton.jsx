import { useState } from "react"
import Icon from "./Icon"

function CopyButton({ value, compact = false }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    if (!value || !navigator.clipboard) return
    await navigator.clipboard.writeText(value)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button className={compact ? "icon-button" : "button secondary"} onClick={copy} type="button" aria-label="Copy password">
      <Icon name={copied ? "check" : "copy"} />
      {!compact && <span>{copied ? "Copied" : "Copy"}</span>}
    </button>
  )
}

export default CopyButton
