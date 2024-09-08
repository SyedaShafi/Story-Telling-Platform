import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function AllSections() {
  const { story_id, section_id } = useParams();
  const [currentSection, setCurrentSection] = useState([]);
  const [optionsData, setOptionsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/sections/${section_id}`)
      .then((response) => response.json())
      .then((data) => {
        setCurrentSection(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching section:', error);
        setLoading(false);
      });
  }, [section_id]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/options/')
      .then((res) => res.json())
      .then((options) => {
        const optionsData = options.filter(
          (option) => option.section === parseInt(section_id)
        );
        setOptionsData(optionsData);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [section_id]);

  if (loading) return <div>Loading...</div>;
  return (
    <div className='allsection_container'>
      <h1>Story ID: {currentSection.story}</h1>
      {currentSection ? (
        <div>
          <p className='content_section'>
            <strong>Content:</strong> {currentSection.content}
          </p>
          <div className='option_list'>
            <h3>Choose your option</h3>
            {optionsData.length === 0 ? (
              currentSection.is_end ? (
                <div>
                  <h5 className='no_option'>
                    No Options available, this is the end of the story
                  </h5>
                  <button className='btn'>
                    <Link to='/'>Go back</Link>
                  </button>
                </div>
              ) : (
                <Link className='btn' to={`/story/${story_id}/add_section`}>
                  Add more sections or add the ending of the story.
                </Link>
              )
            ) : (
              optionsData.map((data) => (
                <button className='btn' key={data.id}>
                  <Link to={`/story/${story_id}/sections/${data.next_section}`}>
                    {data.text}
                  </Link>
                </button>
              ))
            )}
          </div>
        </div>
      ) : (
        <p>No section found</p>
      )}
    </div>
  );
}
