import { useEffect, useState } from "react"
import caasApi from "./services/caas-api"
import Feed from "./components/Feed"
import Header from "./components/Header"
import Navbar from "./components/Navbar"
import Stories from "./components/Stories"
import data from './data/default_user.json'
import "./styles/App.css"
import PostModal from "./components/PostModal"
import type { displayingPostType, FetchedUser, PostType, Comment } from "./types/types"
import commsApi from "./services/comms-api"
import Profile from "./components/Profile"

function App() {
    const [posts, setPosts] = useState<PostType[] | null>(null)
    const [stories, setStories] = useState(null)
    const [displayingPost, setDisplayingPost] = useState({ displaying: false, post: null } as displayingPostType)
    const [loading, setLoading] = useState(true)
    const [showProfile, setShowProfile] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const responseForPosts = await caasApi.get('/images/search?limit=10')
                const dataForPosts = responseForPosts.data || []

                const responseForUsers = await caasApi.get('/images/search?limit=10')
                const dataForUsers = (responseForUsers.data || [])?.filter((item: any) => !item.url.endsWith('.gif'))

                const responseForComments = await commsApi.get('/comments?limit=10')
                const dataForComments = responseForComments?.data?.comments

                const fetchedUsers: FetchedUser[] = dataForUsers?.map((item: any, index: number) => ({
                    username: dataForComments[index]?.user?.username || `user_name_${index}`,
                    userImage: item.url
                })) || []

                const fetchedComments: Comment[] = dataForComments.map((item: any, index: number) => ({
                    text: item.body,
                    username: item.user.username,
                    likes: item.likes,
                    userImage: fetchedUsers[index] ? fetchedUsers[index].userImage : dataForUsers[Math.floor(Math.random() * dataForUsers.length)].url
                })) || []

                const fetchedPosts: PostType[] = dataForPosts?.map((item: any) => {
                    const user: FetchedUser = fetchedUsers[Math.floor(Math.random() * fetchedUsers.length)] || { username: `user_name`, userImage: dataForUsers[Math.floor(Math.random() * dataForUsers.length)].url }
                    return {
                        username: user.username,
                        userImage: user.userImage,
                        postImage: item.url,
                        caption: `miaouu miaouumiaouu miaouu miaouumiaouu miaouu miaouumiaouu miaouu miaouumiaouu miaouu miaouumiaouu miaouu miaouumiaouu miaouu miaouumiaouu miaouu miaouumiaouu miaouu miaouumiaouu miaouu miaouumiaouu`,
                        likes: Math.floor(Math.random() * 1000),
                        comments: fetchedComments,
                        year: `${Math.floor(Math.random() * 5) + 2019}`
                    }
                }) || []
                
                const fetchedStories = fetchedUsers?.map((user: any) => {
                    return {
                        username: user.username,
                        userImage: user.userImage,
                        isCloseFriend: Math.random() > 0.7
                    }
                }) || []

                setPosts(fetchedPosts)
                setStories(fetchedStories)
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (displayingPost.displaying) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    }, [displayingPost])

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
                        : <Profile user={data.logged_user} setDisplayingPost={setDisplayingPost} />
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
