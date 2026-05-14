import type { StoriesProps } from "../types/types.ts"

function Stories({ stories }: StoriesProps ) {

  return (
    <div className="stories">
        <h2>Stories</h2>
        <section className="storiesContainer">
            {
                stories.map(story => (
                    <div key={story.username} className="story">
                        <div className="pfpContainer">
                            <img src={story.userImage} alt={`${story.username}'s profile picture`} />
                        </div>
                        <span>{story.username}</span>
                    </div>
                ))
            }
        </section>
    </div>
  )
}

export default Stories
