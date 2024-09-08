import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Dashboad() {
  const [userStories, setUserStory] = useState([]);
  useEffect(() => {
    fetch('http://127.0.0.1:8000/stories/')
      .then((res) => res.json())
      .then((data) => {
        const Data = data.filter((d) => d.user === 3);
        setUserStory(Data);
      });
  }, []);
  return (
    <div>
      <div className='welcome_title'>Welcome, here is your story list:</div>
      <div className='user_dash_box'>
      {userStories.map((story) => (
          <div className='user_dash_button' key={story.id}>
            <Link to={`/story/${story.id}/add_section`}>{story.title}: </Link>
            <div>Total Time taken by the reader
                : </div>
          </div>
        ))}
        </div>
    </div>
  );
}
