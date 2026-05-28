import { useEffect, useRef } from "react"
import type { ProfileProps, PostType } from "../types/types"
import Post from "./Post.tsx"
import "../styles/Profile.css"

function Profile({ user, setDisplayingPost }: ProfileProps) {
    const posts: PostType[] = (user.posts as PostType[]) || []
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

        const imgs = grid.querySelectorAll('img')
        imgs.forEach(img => {
            if (!img.complete) img.addEventListener('load', resizeAllGridItems)
        })

        const t = window.setTimeout(resizeAllGridItems, 50)
        window.addEventListener('resize', resizeAllGridItems)

        return () => {
            clearTimeout(t)
            imgs.forEach(img => img.removeEventListener('load', resizeAllGridItems))
            window.removeEventListener('resize', resizeAllGridItems)
        }
    }, [posts])

    return (
        <div className="profile">
            <div className="profileHeader">
                <div className="profileAvatarContainer">
                    <img className="profileImg" src={user.userImage} alt={user.username} />
                </div>
                <div className="profileInfo">
                    <div className="profileTopRow">
                        <h2 className="profileUsername">{user.username}{user.verified && <span className="verified"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-rosette-discount-check"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12.01 2.011a3.2 3.2 0 0 1 2.113 .797l.154 .145l.698 .698a1.2 1.2 0 0 0 .71 .341l.135 .008h1a3.2 3.2 0 0 1 3.195 3.018l.005 .182v1c0 .27 .092 .533 .258 .743l.09 .1l.697 .698a3.2 3.2 0 0 1 .147 4.382l-.145 .154l-.698 .698a1.2 1.2 0 0 0 -.341 .71l-.008 .135v1a3.2 3.2 0 0 1 -3.018 3.195l-.182 .005h-1a1.2 1.2 0 0 0 -.743 .258l-.1 .09l-.698 .697a3.2 3.2 0 0 1 -4.382 .147l-.154 -.145l-.698 -.698a1.2 1.2 0 0 0 -.71 -.341l-.135 -.008h-1a3.2 3.2 0 0 1 -3.195 -3.018l-.005 -.182v-1a1.2 1.2 0 0 0 -.258 -.743l-.09 -.1l-.697 -.698a3.2 3.2 0 0 1 -.147 -4.382l.145 -.154l.698 -.698a1.2 1.2 0 0 0 .341 -.71l.008 -.135v-1l.005 -.182a3.2 3.2 0 0 1 3.013 -3.013l.182 -.005h1a1.2 1.2 0 0 0 .743 -.258l.1 -.09l.698 -.697a3.2 3.2 0 0 1 2.269 -.944zm3.697 7.282a1 1 0 0 0 -1.414 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" /></svg>
                        </span>}</h2>
                        <div className="profileActionsContainer">
                            <button className="editButton">Edit profile</button>
                        </div>
                    </div>
                    <div className="profileStats">
                        <div className="stat"><strong>{user.postsCount ?? posts.length}</strong><span>posts</span></div>
                        <div className="stat"><strong>{user.followers ?? 0}</strong><span>followers</span></div>
                        <div className="stat"><strong>{user.following ?? 0}</strong><span>following</span></div>
                    </div>
                    {user.bio && <div className="profileBio">{user.bio}</div>}
                </div>
            </div>
            <section className="posts" ref={gridRef}>
                {posts.length === 0
                    ? <div className="noPosts">No posts yet</div>
                    : posts.map((p, i) => (
                        <Post key={i} data={p} setDisplayingPost={setDisplayingPost} />
                    ))
                }
            </section>
        </div>
    )
}

export default Profile
