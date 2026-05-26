import type { PostProps } from "../types/types"
import "../styles/PostModal.css"

function PostModal({ data }: PostProps) {

    return (
        <div className="modalContainer">
            <div className="postModal">
                <div className="imageContainer">
                    <img src={data.postImage} alt="Post image" />
                </div>
                <div className="postModalRight">
                    <header>
                        {data.userImage && <img src={data.userImage} alt="User profile" className="postModalProfile" />}
                        <div className="title">
                            <h2>{data.username}</h2>
                            <p>{data.year}</p>
                        </div>
                    </header>
                    <main>
                        <p>{data.caption}</p>
                    </main>
                    <footer>
                        <div>
                            <div className="postModalActions">
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-heart">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-message-circle">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M3 20l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c3.255 2.777 3.695 7.266 1.029 10.501c-2.666 3.235 -7.615 4.215 -11.574 2.293l-4.7 1" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-send">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M10 14l11 -11" />
                                    <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
                                </svg>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-bookmark">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M18 7v14l-6 -4l-6 4v-14a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4" />
                                    </svg>
                                </div>
                            </div>
                            <p>Liked by {data.likes} people</p>
                        </div>
                        <div className="addComment">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-mood-wink-2">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 21a9 9 0 1 1 0 -18a9 9 0 0 1 0 18" />
                                <path d="M9 10h-.01" />
                                <path d="M14.5 15a3.5 3.5 0 0 1 -5 0" />
                                <path d="M15.5 8.5l-1.5 1.5l1.5 1.5" />
                            </svg>
                            <form>
                                <input type="text" placeholder="Add a comment..." />
                                <button>Post</button>
                            </form>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    )
}

export default PostModal
