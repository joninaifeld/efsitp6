import type { Dispatch, SetStateAction } from "react"

export interface FeedProps {
    posts: PostType[],
    setDisplayingPost?: Dispatch<SetStateAction<displayingPostType>>
}


export interface Comment {
    text: string,
    username: string
}
export interface PostType {
    username: string,
    userImage: string,
    postImage: string,
    caption: string,
    likes: number,
    comments: Comment[],
    year: string
}

export interface Story {
    username: string,
    userImage: string,
    isCloseFriend: boolean
}

export interface StoriesProps {
    stories: Story[]
}

export interface PostProps {
    data: PostType,
    setDisplayingPost?: Dispatch<SetStateAction<displayingPostType>>
}

export interface NavbarProps {
    user: {
        username: string,
        displayName: string,
        verified: boolean,
        userImage: string,
        likes: number,
        followers: number,
        story: Story | null
    }
}

export interface displayingPostType {
    displaying: boolean,
    post: PostType | null
}

export interface PostModalProps {
    data: PostType
}