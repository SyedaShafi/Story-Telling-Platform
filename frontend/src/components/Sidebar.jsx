import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
export default function Sidebar() {
  const [allStories, setAllStories] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/stories/')
      .then((response) => response.json())
      .then((data) => {
        setAllStories(data);
        // console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching stories:', error);
      });
  }, []);
  return (
    <div className='story_list'>
      <h1>Story List</h1>
      <ul>
        {allStories.map((story, index) => (
          <li key={index} >
            <Link to={`/story/${story.id}`} >
              {story.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
