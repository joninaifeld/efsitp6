import { useEffect, useState } from "react"
import api from "./services/api"
import Feed from "./components/Feed"
import Header from "./components/Header"
import Navbar from "./components/Navbar"
import Stories from "./components/Stories"
import data from './data/default_user.json'
import "./styles/App.css"
import PostModal from "./components/PostModal"
import type { displayingPostType } from "./types/types"

function App() {
    const [posts, setPosts] = useState(null)
    const [stories, setStories] = useState(null)
    const [displayingPost, setDisplayingPost] = useState({ displaying: false, post: null } as displayingPostType)

    useEffect(() => {
        const fetchData = async () => {
            const responseForPosts = await api.get('/images/search?limit=10')
            const dataForPosts = responseForPosts.data || []
            const responseForUsers = await api.get('/images/search?limit=10')
            const dataForUsers = (responseForUsers.data || [])?.filter((item: any) => !item.url.endsWith('.gif'))
            
            const fetchedPosts = dataForPosts?.map((item: any) => ({
                username: `user_name`,
                userImage: dataForUsers[Math.floor(Math.random() * dataForUsers.length)].url,
                postImage: item.url,
                caption: `miaouu`,
                likes: Math.floor(Math.random() * 1000),
                comments: [],
                year: `${Math.floor(Math.random() * 5) + 2019}`
            }))
            
            const fetchedStories = dataForUsers?.map((item: any) => ({
                username: `user_name`,
                userImage: item.url,
                isCloseFriend: Math.random() < 0.5
            }))
            
            setPosts(fetchedPosts)
            setStories(fetchedStories)
        }
        fetchData()
    }, [])

    return (
        <>
            <div>
                <Header />
                <div className="site">
                    <Navbar user={data.logged_user} />
                    <div className="allFeed">
                        <Stories stories={stories} />
                        <Feed posts={posts} setDisplayingPost={setDisplayingPost} />
                    </div>
                </div>
            </div>
            { displayingPost.displaying && 
                <PostModal data={displayingPost.post} />
            }
        </>
    )
}

export default App
