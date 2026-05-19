export interface FeedProps {
    posts: PostType[]
}

export interface PostType {
    username: string,
    userImage: string,
    postImage: string,
    caption: string,
    likes: number,
    comments: Comment[]
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
    data: PostType
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