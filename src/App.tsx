import { useEffect, useState } from "react"
import caasApi from "./services/caas-api"
import Feed from "./components/Feed"
import Header from "./components/Header"
import Navbar from "./components/Navbar"
import Stories from "./components/Stories"
import data from './data/default_user.json'
import "./styles/App.css"
import PostModal from "./components/PostModal"
import type { displayingPostType } from "./types/types"
import commsApi from "./services/comms-api"
import Profile from "./components/Profile"

function App() {
    const [posts, setPosts] = useState(null)
    const [stories, setStories] = useState(null)
    const [displayingPost, setDisplayingPost] = useState({ displaying: false, post: null } as displayingPostType)
    const [loading, setLoading] = useState(true)
    const [showProfile, setShowProfile] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const responseForPosts = await caasApi.get('/images/search?limit=10')
            const dataForPosts = responseForPosts.data || []
            const responseForUsers = await caasApi.get('/images/search?limit=10')
            const dataForUsers = (responseForUsers.data || [])?.filter((item: any) => !item.url.endsWith('.gif'))
            const responseForComments = await commsApi.get('/comments?limit=10')
            const dataForComments = responseForComments?.data?.comments
            const fetchedComments = dataForComments.map((item: any, index: number) => ({
                text: item.body,
                username: item.user.username,
                likes: item.likes,
                userImage: dataForUsers[dataForUsers[index] ? index : Math.floor(Math.random() * dataForUsers.length)].url
            })) || []

            const fetchedPosts = dataForPosts?.map((item: any) => ({
                username: `user_name`,
                userImage: dataForUsers[Math.floor(Math.random() * dataForUsers.length)].url,
                postImage: item.url,
                caption: `miaouu miaouumiaouu miaouu miaouumiaouu miaouu miaouumiaouu miaouu miaouumiaouu miaouu miaouumiaouu miaouu miaouumiaouu miaouu miaouumiaouu miaouu miaouumiaouu miaouu miaouumiaouu miaouu miaouumiaouu`,
                likes: Math.floor(Math.random() * 1000),
                comments: fetchedComments,
                year: `${Math.floor(Math.random() * 5) + 2019}`
            }))
            
            const fetchedStories = dataForUsers?.map((item: any) => ({
                username: `user_name`,
                userImage: item.url,
                isCloseFriend: Math.random() > 0.7
            }))
            
            setPosts(fetchedPosts)
            setStories(fetchedStories)
            setLoading(false)
        }
        fetchData()
    }, [])

    return (
        <>
            <div>
                <Header />
                <div className="site">
                    <Navbar user={data.logged_user} showProfile={showProfile} setShowProfile={setShowProfile} />
                    { !showProfile
                        ? <> 
                            { !loading
                                ? <div className="allFeed">
                                    <Stories stories={stories || []} />
                                    <Feed posts={posts || []} setDisplayingPost={setDisplayingPost} />
                                </div>
                                : <div className="loading"><p>Loading...</p></div>
                            }
                        </>
                        : <Profile user={data.logged_user} />
                    }
                </div>
            </div>
            { displayingPost.displaying && 
                <PostModal data={displayingPost.post} setDisplayingPost={setDisplayingPost} />
            }
        </>
    )
}

export default App
