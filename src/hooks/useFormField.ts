import { useState } from "react"

/**
 * Custom hook to manage form field state with built-in validation.
 *
 * @param initial - Initial value of the field
 * @param requiredMessage - Error message if the field is required and empty
 * @returns Object with field value, error state, handlers and reset function
 */

export function useFormField(initial = "", requiredMessage?: string) {
  const [value, setValue] = useState(initial)
  const [error, setError] = useState<string | undefined>()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleBlur = () => {
    if (requiredMessage && !value.trim()) {
      setError(requiredMessage)
    } else {
      setError(undefined)
    }
  }

  const validate = () => {
    if (requiredMessage && !value.trim()) {
      setError(requiredMessage)
      return false
    }
    setError(undefined)
    return true
  }

  const reset = () => {
    setValue(initial)
    setError(undefined)
  }

  return {
    value,
    error,
    handleChange,
    handleBlur,
    validate,
    reset,
  }
}
