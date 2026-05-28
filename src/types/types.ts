import type { Dispatch, SetStateAction } from "react"

export interface FeedProps {
    posts: PostType[],
    setDisplayingPost?: Dispatch<SetStateAction<displayingPostType>>
}

export interface Comment {
    text: string,
    username: string,
    userImage: string,
    likes: number
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
    data: PostType | null,
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
    },
    showProfile: boolean,
    setShowProfile: Dispatch<SetStateAction<boolean>>
}

export interface displayingPostType {
    displaying: boolean,
    post: PostType | null
}

export interface PostModalProps {
    data: PostType
}

export interface ProfileProps {
    user: {
        username: string,
        displayName: string,
        verified: boolean,
        userImage: string,
        likes: number,
        followers: number,
        story: Story | null,
        bio?: string,
        following?: number,
        postsCount?: number,
        posts?: PostType[],
    },
    setDisplayingPost?: Dispatch<SetStateAction<displayingPostType>>
}

export interface FetchedUser {
    username: string
    userImage: string
}