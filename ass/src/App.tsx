import React, { useState, useEffect, useRef } from "react"

/* 1. usePrevious -------------------------------------------------------- */

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

/* 2. useDebouncedState -------------------------------------------------- */

function useDebouncedState<T>(initialValue: T, delay: number): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [internalValue, setInternalValue] = useState<T>(initialValue)
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(internalValue)
    }, delay)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [internalValue, delay])

  // debouncedValue is the "state" value
  // setInternalValue is the setter you call
  return [debouncedValue, setInternalValue]
}

/* 3. useTypewriter ------------------------------------------------------ */

function useTypewriter(text: string, delay: number): string {
  const [displayed, setDisplayed] = useState("")

  useEffect(() => {
    // restart effect whenever text or delay changes
    setDisplayed("")

    if (!text || delay <= 0) {
      setDisplayed(text || "")
      return
    }

    let index = 0
    const intervalId = setInterval(() => {
      index += 1
      setDisplayed(text.slice(0, index))

      if (index >= text.length) {
        clearInterval(intervalId)
      }
    }, delay)

    return () => {
      clearInterval(intervalId)
    }
  }, [text, delay])

  return displayed
}

/* App showing off all three hooks --------------------------------- */

function App() {
  // usePrevious
  const [count, setCount] = useState(0)
  const previousCount = usePrevious(count)

  // useDebouncedState
  const [inputValue, setInputValue] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useDebouncedState("", 500)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInputValue(value)          // live value
    setDebouncedSearch(value)     // debounced value
  }

  // useTypewriter 
  const [typewriterInput, setTypewriterInput] = useState("type here")
  const typedText = useTypewriter(typewriterInput, 100)

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "1.5rem" }}>
      <h1>Custom Hooks</h1>

      {/* usePrevious section */}
      <section style={{ marginBottom: "2rem" }}>
        <h2>1. usePrevious</h2>
        <p>Current count: {count}</p>
        <p>Previous count: {previousCount === undefined ? "none yet" : previousCount}</p>
        <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      </section>

      {/* useDebouncedState section */}
      <section style={{ marginBottom: "2rem" }}>
        <h2>2. useDebouncedState</h2>
        <p>
          Type in the box. The debounced value updates 500 ms after you stop changing the text.
        </p>
        <input
          type="text"
          value={inputValue}
          onChange={handleSearchChange}
          placeholder="Type here..."
          style={{ padding: "0.4rem", width: "100%", maxWidth: "320px" }}
        />
        <p>Immediate value: {inputValue}</p>
        <p>Debounced value: {debouncedSearch}</p>
      </section>

      {/* useTypewriter section */}
      <section>
        <h2>3. useTypewriter</h2>
        <p>
          Changing the text below restarts the typewriter effect.
        </p>
        <input
          type="text"
          value={typewriterInput}
          onChange={(e) => setTypewriterInput(e.target.value)}
          placeholder="Type something to animate..."
          style={{ padding: "0.4rem", width: "100%", maxWidth: "320px" }}
        />
        <p style={{ marginTop: "1rem" }}>
          Typewriter output: <span style={{ fontWeight: "bold" }}>{typedText}</span>
        </p>
      </section>
    </div>
  )
}

export default App
