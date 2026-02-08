import { useEffect, useMemo, useState } from 'react'
import GradientText from './GradientText'
import { Slider } from '@/components/ui/slider'
import './App.css'

const fontOptions = [
  { label: 'Inter', value: 'Inter, system-ui, -apple-system, Segoe UI, sans-serif' },
  { label: 'System UI', value: 'system-ui, -apple-system, Segoe UI, sans-serif' },
  { label: 'Arial', value: 'Arial, Helvetica, sans-serif' },
  { label: 'Verdana', value: 'Verdana, Geneva, sans-serif' },
  { label: 'Georgia', value: 'Georgia, serif' },
  { label: 'Times New Roman', value: '"Times New Roman", Times, serif' },
  { label: 'Garamond', value: 'Garamond, serif' },
  { label: 'Courier New', value: '"Courier New", Courier, monospace' },
  { label: 'Fira Code', value: '"Fira Code", ui-monospace, SFMono-Regular, Menlo, monospace' },
  { label: 'Sackers Gothic', value: "'SackersGothic', sans-serif" }
]

const fontColorOptions = [
  { label: 'White', value: '#ffffff' },
  { label: 'Shade 2', value: '#f2f2f2' },
  { label: 'Shade 3', value: '#e5e5e5' },
  { label: 'Shade 4', value: '#d8d8d8' },
  { label: 'Shade 5', value: '#cacaca' },
  { label: 'Shade 6', value: '#bdbdbd' },
  { label: 'Shade 7', value: '#b0b0b0' },
  { label: 'Light gray', value: '#a3a3a3' }
]

function App() {
  const [text, setText] = useState(
    'Paste your text here to start a rapid serial visual presentation session.'
  )
  const [wpm, setWpm] = useState(320)
  const [fontFamily, setFontFamily] = useState(fontOptions[0].value)
  const [fontSize, setFontSize] = useState(64)
  const [fontColor, setFontColor] = useState(fontColorOptions[0].value)
  const [showPivot, setShowPivot] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const words = useMemo(() => text.trim().split(/\s+/).filter(Boolean), [text])
  const totalWords = words.length
  const currentWord = words[currentIndex] ?? ''
  const isAtEnd = totalWords > 0 && currentIndex >= totalWords - 1
  const wordNumber = totalWords ? Math.min(currentIndex + 1, totalWords) : 0
  const progress = totalWords ? Math.min((wordNumber / totalWords) * 100, 100) : 0
  const status = !totalWords ? 'Idle' : isPlaying ? 'Playing' : isAtEnd ? 'Completed' : 'Paused'

  useEffect(() => {
    if (currentIndex >= words.length) {
      setCurrentIndex(0)
    }
  }, [currentIndex, words.length])

  useEffect(() => {
    if (!isPlaying || !words.length) return

    const intervalMs = Math.max(20, Math.round(60000 / wpm))
    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1
        if (next >= words.length) {
          setIsPlaying(false)
          return prev
        }
        return next
      })
    }, intervalMs)

    return () => window.clearInterval(timer)
  }, [isPlaying, wpm, words.length])

  const handleStart = () => {
    if (!totalWords) return
    if (isAtEnd) setCurrentIndex(0)
    setIsPlaying(true)
  }

  const handlePause = () => setIsPlaying(false)

  const handleReset = () => {
    setIsPlaying(false)
    setCurrentIndex(0)
  }

  const getPivotIndex = (word: string) => {
    const length = word.length
    if (length <= 1) return 0
    if (length <= 5) return 1
    if (length <= 9) return 2
    if (length <= 13) return 3
    return 4
  }

  const getWordParts = (word: string) => {
    if (!word || !showPivot) {
      return { lead: word, pivot: '', tail: '' }
    }

    const pivotIndex = Math.min(getPivotIndex(word), word.length - 1)
    return {
      lead: word.slice(0, pivotIndex),
      pivot: word[pivotIndex],
      tail: word.slice(pivotIndex + 1)
    }
  }

  const { lead, pivot, tail } = getWordParts(currentWord)

  return (
    <div className="app">
      <header className="app-header">
        <GradientText showBorder animationSpeed={10} className="title">
          Rapid Serial Visual Presentation
        </GradientText>
        <p className="subtitle">Paste text, set your speed, and read one focused word at a time.</p>
      </header>

      <div className="layout">
        <section className="controls">
          <label className="field">
            <span>Text</span>
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Paste or type your reading text..."
              rows={6}
            />
          </label>

          <div className="field">
            <span className="label-with-help">
              Words per minute
              <span className="wpm-help">
                ?
                <span className="wpm-tooltip">
                  {(wpm / 60).toFixed(1)} words per second. Higher speeds reduce comprehension — find a pace that stays comfortable.
                </span>
              </span>
            </span>
            <div className="inline">
              <Slider
                min={100}
                max={900}
                step={20}
                value={[wpm]}
                onValueChange={(value) => setWpm(value[0])}
                className="flex-1"
              />
              <span className="value">{wpm} WPM</span>
            </div>
          </div>

          <div className="field">
            <span>Font family</span>
            <select value={fontFamily} onChange={(event) => setFontFamily(event.target.value)}>
              {fontOptions.map((option) => (
                <option key={option.label} value={option.value} style={{ fontFamily: option.value }}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <span>Font size</span>
            <div className="inline">
              <Slider
                min={28}
                max={120}
                step={20}
                value={[fontSize]}
                onValueChange={(value) => setFontSize(value[0])}
                className="flex-1"
              />
              <span className="value">{fontSize}px</span>
            </div>
          </div>

          <div className="field">
            <span>Font color</span>
            <div className="color-swatches">
              {fontColorOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`color-swatch ${fontColor === option.value ? 'selected' : ''}`}
                  style={{ backgroundColor: option.value }}
                  onClick={() => setFontColor(option.value)}
                  title={option.label}
                  aria-label={option.label}
                />
              ))}
            </div>
          </div>

          <label className="toggle">
            <input
              type="checkbox"
              checked={showPivot}
              onChange={(event) => setShowPivot(event.target.checked)}
            />
            <span>Highlight the center letter in red</span>
          </label>

          <div className="actions">
            <button className="primary" onClick={isPlaying ? handlePause : handleStart} disabled={!totalWords}>
              {isPlaying ? 'Pause' : 'Start'}
            </button>
            <button onClick={handleReset} disabled={!totalWords}>
              Reset
            </button>
          </div>
        </section>

        <section className="viewer">
          <div
            className="word-display"
            style={{
              fontFamily,
              fontSize: `${fontSize}px`,
              color: fontColor
            }}
          >
            {currentWord ? (
              showPivot ? (
                <>
                  <span className="word-lead">{lead}</span>
                  <span className="word-pivot">{pivot}</span>
                  <span className="word-tail">{tail}</span>
                </>
              ) : (
                <span>{currentWord}</span>
              )
            ) : (
              <span className="word-placeholder">Paste text to begin.</span>
            )}
          </div>
          <div className="viewer-meta">
            <span>
              Word {wordNumber} of {totalWords}
            </span>
            <span>{status}</span>
          </div>
          <div className="progress">
            <div className="progress-bar" style={{ width: `${progress}%` }} />
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
