import type { StoriesProps, Story } from "../types/types.ts"
import "../styles/Stories.css"

function Stories({ stories }: StoriesProps) {

    return (
        <div className="stories">
            <h2>Stories</h2>
            <section className="storiesContainer">
                {
                    stories?.map((story: Story, index: number) => (
                        <div key={index} className="story">
                            <div className={`pfpContainer hasStory ${story.isBestFriend ? 'bf' : ''}`}>
                                <img src={story.userImage} alt={`${story.username}'s profile picture`} />
                            </div>
                            <span>@{story.username}</span>
                        </div>
                    ))
                }
            </section>
        </div>
    )
}

export default Stories
