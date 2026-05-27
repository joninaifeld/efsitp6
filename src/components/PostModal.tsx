import type { PostProps } from "../types/types"
import "../styles/PostModal.css"
import { useEffect } from "react"

function PostModal({ data, setDisplayingPost }: PostProps) {

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setDisplayingPost?.((prev) => ({ ...prev, displaying: false }))
            }
        }
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [setDisplayingPost])


    return (
        <div className="modalContainer" onMouseDown={() => setDisplayingPost?.((prev) => ({ ...prev, displaying: false }))}>
            <button className="closeButton" onMouseDown={() => setDisplayingPost?.((prev) => ({ ...prev, displaying: false }))}>
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M18 6l-12 12" />
                    <path d="M6 6l12 12" />
                </svg>
            </button>
            <div className="postModal" onMouseDown={(e) => e.stopPropagation()}>
                <div className="imageContainer">
                    <img src={data.postImage} alt="Post image" />
                </div>
                <div className="postModalRight">
                    <header>
                        {data.userImage && <img src={data.userImage} alt="User profile" className="postModalProfile" />}
                        <div className="title">
                            <h2 className="username">{data.username}</h2>
                            <p className="year">{data.year}</p>
                        </div>
                    </header>
                    <main>
                        { data?.caption && 
                            <div className="comment">
                                {data.userImage && <img src={data.userImage} alt="User profile" className="postModalProfile" />}
                                <div className="body">
                                    <h2 className="username">{data.username}</h2>
                                    <p>{data.caption}</p>
                                </div>
                            </div>
                        }
                        { data.comments && data.comments.length > 0 
                            ? data.comments.map((comment) => 
                                <div className="comment">
                                    {comment.userImage && <img src={comment.userImage} alt="User profile" className="postModalProfile" />}
                                    <div className="body">
                                        <h2 className="username">{comment.username}</h2>
                                        <p>{comment.text}</p>
                                        <div className="commentStats">
                                            <span>1 d</span>
                                            <span className="likes">{comment.likes} likes</span>
                                        </div>
                                    </div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-heart likeButton">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                                        </svg>
                                </div>
                            ) 
                            : <div className="noComments">
                                <p>No comments yet. Be the first to comment!</p>
                            </div>
                        }
                    </main>
                    <footer>
                        <div className="mainInfo">
                            <div className="postActions">
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-heart likeButton">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-message-circle">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M3 20l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c3.255 2.777 3.695 7.266 1.029 10.501c-2.666 3.235 -7.615 4.215 -11.574 2.293l-4.7 1" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-send">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M10 14l11 -11" />
                                    <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
                                </svg>
                                <div className="right">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-bookmark">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M18 7v14l-6 -4l-6 4v-14a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4" />
                                    </svg>
                                </div>
                            </div>
                            <p className="likedBy">Liked by<span>&nbsp;{data.likes}&nbsp;</span>people</p>
                        </div>
                        <div className="addCommentSection">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-mood-wink-2">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 21a9 9 0 1 1 0 -18a9 9 0 0 1 0 18" />
                                <path d="M9 10h-.01" />
                                <path d="M14.5 15a3.5 3.5 0 0 1 -5 0" />
                                <path d="M15.5 8.5l-1.5 1.5l1.5 1.5" />
                            </svg>
                            <input type="text" placeholder="Add a comment..." />
                            <button disabled>Post</button>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    )
}

export default PostModal
