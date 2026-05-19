import { useEffect, useState } from "react"
import api from "./services/api"
import Feed from "./components/Feed"
import Header from "./components/Header"
import Navbar from "./components/Navbar"
import Stories from "./components/Stories"
import data from './data/default_user.json'

function App() {
    const [posts, setPosts] = useState(null)
    const [stories, setStories] = useState(null)

    useEffect(() => {
        api.get('/images/search?limit=10')
            .then(response => {
                const fetchedPosts = response?.data?.map((item: any) => ({
                    username: `user_name`,
                    userImage: `https://i.pinimg.com/736x/1c/8b/0e/1c8b0e5a9d2f3c7a4e5b6c8d9f0a1b.jpg`,
                    postImage: item.url,
                    caption: `miaouu`,
                    likes: Math.floor(Math.random() * 1000),
                    comments: []
                }))
                const fetchedStories = response?.data?.map((item: any) => ({
                    username: `user_name`,
                    userImage: item.url,
                    isBestFriend: Math.random() < 0.5
                }))
                setPosts(fetchedPosts)
                setStories(fetchedStories)
            })
    }, [])

    return (
        <div>
            <Header />
            <div>
                <Navbar user={data.logged_user} />
                <div>
                    <Stories stories={stories} />
                    <Feed posts={posts} />
                </div>
            </div>
        </div>
    )
}

export default App
