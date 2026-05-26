export interface FeedProps {
    posts: PostType[],
    setDisplayingPost?: (state: { displaying: boolean, post: PostType | null }) => void
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
    setDisplayingPost?: (state: displayingPostType) => void
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