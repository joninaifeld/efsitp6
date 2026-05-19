import { useEffect, useState } from "react"
import api from "./services/api"
import Feed from "./components/Feed"
import Header from "./components/Header"
import Navbar from "./components/Navbar"
import Stories from "./components/Stories"
import data from './data/default_user.json'
import "./styles/App.css"

function App() {
    const [posts, setPosts] = useState(null)
    const [stories, setStories] = useState(null)

    useEffect(() => {
        api.get('/images/search?limit=10')
            .then(response => {
                const data = response.data

                const fetchedPosts = data?.map((item: any) => ({
                    username: `user_name`,
                    userImage: data[Math.floor(Math.random() * data.length)].url,
                    postImage: item.url,
                    caption: `miaouu`,
                    likes: Math.floor(Math.random() * 1000),
                    comments: []
                }))
                const fetchedStories = data.toReversed()?.map((item: any) => ({
                    username: `user_name`,
                    userImage: item.url,
                    isCloseFriend: Math.random() < 0.5
                }))
                
                setPosts(fetchedPosts)
                setStories(fetchedStories)
            })
    }, [])

    return (
        <div>
            <Header />
            <div className="site">
                <Navbar user={data.logged_user} />
                <div className="allFeed">
                    <Stories stories={stories} />
                    <Feed posts={posts} />
                </div>
            </div>
        </div>
    )
}

export default App
