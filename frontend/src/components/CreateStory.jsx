import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateStory() {
  const authorRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const navigate = useNavigate();
  const [storyDataNew, setStoryData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const author = authorRef.current.value;
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const storyData = {
      author,
      title,
      description,
    };
    fetch('http://127.0.0.1:8000/stories/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(storyData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Story created:', data);
        setStoryData(data);
        authorRef.current.value = '';
        titleRef.current.value = '';
        descriptionRef.current.value = '';
        navigate(`/story/${data.id}/add_section`);
      })
      .catch((error) => {
        console.error('Error creating story:', error);
      });
  };

  return (
    <div className='createStory'>
      <h4 className='title'>Create Story</h4>
      <form className='formclass' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Enter the author name'
          ref={authorRef}
          required
        />
        <input
          type='text'
          placeholder='Enter the story title'
          ref={titleRef}
          required
        />
        <input
          type='text'
          placeholder='Enter a small description'
          ref={descriptionRef}
          required
        />
        <button type='submit' className='btn'>
          Submit
        </button>
      </form>
    </div>
  );
}
