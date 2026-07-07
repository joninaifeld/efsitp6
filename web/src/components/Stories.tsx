import type { StoriesProps, Story } from "../types/types.ts"
import "../styles/Stories.css"

function Stories({ stories }: StoriesProps) {

    return (
        <div className="stories">
            <h2>STORIES</h2>
            <section className="storiesContainer">
                {
                    [...(stories || [])/* , ...stories */]?.map((story: Story, index: number) => (
                        <div key={index} className="story">
                            <div className={`pfpContainer hasStory ${story.isCloseFriend ? 'cf' : ''}`}>
                                <img src={story.userImage} alt={`${story.username}'s profile picture`} />
                            </div>
                            <span className="username">{story.username}</span>
                        </div>
                    ))
                }
            </section>
        </div>
    )
}

export default Stories
