import { useEffect } from "react"

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} - Aero`;
  }, [title])
}

export default useTitle;