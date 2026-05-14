export interface FeedProps {
    posts: Post[]
}

export interface Post {
    id: number,
    username: string,
    userImage: string,
    postImage: string,
    caption: string,
    likes: number,
    comments: Comment[]
}

export interface Story {
    username: string,
    userImage: string
}

export interface StoriesProps {
    stories: Story[]
}

export interface PostProps {
    data: Post
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