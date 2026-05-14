import type { PostProps } from "../types/types"

function Post({ data }: PostProps) {

    return (
        <div className="postModal">
            <img src={data.postImage} alt="Post image" />
        </div>
    )
}

export default Post
