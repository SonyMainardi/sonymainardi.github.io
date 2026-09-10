import { useEffect, useState } from 'react'
import { projects, type Project } from '../data/content'
import { fetchProjects } from './github'

export function useProjects() {
  const [items, setItems] = useState<Project[]>(projects)
  const [live, setLive] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    fetchProjects(controller.signal)
      .then((list) => {
        if (controller.signal.aborted) return
        setItems(list)
        setLive(true)
      })
      .catch(() => setLive(false))

    return () => controller.abort()
  }, [])

  return { items, live }
}
