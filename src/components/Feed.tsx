import type { FeedProps } from "../types/types.ts"
import Post from "./Post.tsx"

function Feed({ posts }: FeedProps ) {

  return (
    <div className="feed">
        <h2>Trending</h2>
        <section className="post">
            {
                posts.map(post => (
                    <Post key={post.id} data={post} />
                ))
            }
        </section>
    </div>
  )
}

export default Feed
