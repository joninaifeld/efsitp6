import type { FeedProps } from "../types/types.ts"
import type { PostType } from "../types/types.ts"
import Post from "./Post.tsx"
import "../styles/Feed.css"
import { useEffect, useRef } from "react"

function Feed({ posts }: FeedProps ) {
  const gridRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const grid: HTMLElement | null = gridRef.current
    if (!grid) return

    const getRowGap = (g: HTMLElement) => {
      const style = getComputedStyle(g)
      const rowGap = style.getPropertyValue('row-gap') || style.getPropertyValue('gap')
      return parseInt(rowGap) || 0
    }

    const resizeAllGridItems = () => {
      const rowHeight = parseInt(getComputedStyle(grid).getPropertyValue('grid-auto-rows')) || 8
      const rowGap = getRowGap(grid)
      grid.querySelectorAll('.post').forEach(item => {
        const el = item as HTMLElement
        const height = el.getBoundingClientRect().height
        const span = Math.ceil((height + rowGap) / (rowHeight + rowGap))
        el.style.gridRowEnd = `span ${span}`
      })
    }

    // Update when images load
    const imgs = grid.querySelectorAll('img')
    imgs.forEach(img => {
      if (!img.complete) img.addEventListener('load', resizeAllGridItems)
    })

    // Initial layout
    // Delay a tick to allow DOM/images to settle
    const t = window.setTimeout(resizeAllGridItems, 50)
    window.addEventListener('resize', resizeAllGridItems)

    return () => {
      clearTimeout(t)
      imgs.forEach(img => {
        img.removeEventListener('load', resizeAllGridItems)
      })
      window.removeEventListener('resize', resizeAllGridItems)
    }
  }, [posts])

  return (
    <div className="feed">
        <h2>Trending</h2>
        <section className="posts" ref={gridRef}>
            {
                posts?.map((post: PostType, index: number) => (
                    <Post key={index} data={post} />
                ))
            }
        </section>
    </div>
  )
}

export default Feed
