import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

export default function Story() {
  const { story_id } = useParams();
  const [section_id, setSectionId] = useState(null);
  const [data, setData] = useState([]);
  const [randomGif, setRandomGif] = useState(1);
  // console.log(story_id);
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/stories/${story_id}/`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setData(data);
        fetch(`http://127.0.0.1:8000/sections/`)
          .then((response) => response.json())
          .then((data) => {
            const allSection = data.filter(
              (ele) => ele.story === parseInt(story_id)
            );
            allSection.length > 0 && setSectionId(allSection[0].id);
            const getRandomNumber = () => Math.floor(Math.random() * 5) + 1;
            setRandomGif(getRandomNumber());
            console.log(randomGif);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [story_id]);

  return (
    <div className='story_container'>
      <h1>The title: {data.title}</h1>
      <h3>The Author: {data.author}</h3>
      <p>
        <strong>The Description:</strong> {data.description}
      </p>
      <div>
        {section_id === null ? (
          <div>
            <h3>No Path available</h3>
            <Link className='btn' to={`/story/${story_id}/add_section`}>
              Add The sections and make paths
            </Link>
          </div>
        ) : (
          <div>
            <button className='story_button btn'>
              <Link to={`/story/${story_id}/sections/${section_id}`}>
                Let's Go!
              </Link>
            </button>
            <div className='gif_box'>
              <img className='gif' src={`/${randomGif}.gif`} alt='' />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
