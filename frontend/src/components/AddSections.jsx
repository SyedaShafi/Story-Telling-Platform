import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function AddSections() {
  const { story_id } = useParams();
  const contentRef = useRef();
  const isEndRef = useRef();
  const currentSection = useRef();
  const optionName = useRef();
  const nextSection = useRef();

  const [allSections, setAllSections] = useState([]);
  const [section, setSection] = useState(false);

  // console.log(story_id);
  useEffect(() => {
    fetch('http://127.0.0.1:8000/sections/')
      .then((res) => res.json())
      .then((data) => {
        const allData = data.filter((d) => d.story === parseInt(story_id));
        setAllSections(allData);
        // console.log(allSections);
        // console.log(allData);
      });
  }, [section]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const content = contentRef.current.value;
    const is_end = isEndRef.current.value;

    const sectionData = {
      content: content,
      is_end: is_end,
      story: story_id,
    };

    // console.log(sectionData);

    fetch('http://127.0.0.1:8000/sections/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sectionData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(
          `Section added successfully for story id ${story_id}`,
          data
        );
        contentRef.current.value = '';
        setSection(!section);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handlePathSubmit = (e) => {
    e.preventDefault();
    const text = optionName.current.value;
    const section = currentSection.current.value;
    const next_section = nextSection.current.value;
    const optionData = {
      text: text,
      section: section,
      next_section: next_section,
    };

    fetch('http://127.0.0.1:8000/options/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(optionData),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log('New path created successfully:', data);
        currentSection.current.value = '';
        optionName.current.value = '';
        nextSection.current.value = '';
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className='addsection_conatiner'>
      <div className='add_section'>
        <div id='allcontent'>
          {allSections.length > 0 && (
            <ul>
              <h3>Normal Flow Of Story: </h3>
              <br />
              {allSections.map((ele) => (
                <li key={ele.id}>
                  <div>Content: {ele.content}</div>
                  <div>{ele.is_end ? 'End: True' : 'End: False'} </div>
                  <div>StoryId: {ele.story}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div id='makepath'>
          {allSections.length !== 0 && (
            <div>
              <h3>Let's make multiple paths for the story: </h3>
              <br />
              <form className='path_form' onSubmit={handlePathSubmit}>
                <div>
                  <label>Current Section: </label>
                  <select name='text' id='text' ref={currentSection} required>
                    {allSections.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.content}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Option Name: </label>
                  <input
                    type='text'
                    placeholder='Ex: Option A'
                    ref={optionName}
                    required
                  />
                </div>
                <div>
                  <label>Next Section: </label>

                  <select name='text' id='text' ref={nextSection} required>
                    {allSections.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.content}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <button type='submit' className='btn'>
                    Submit
                  </button>
                </div>
              </form>
              <br />
            </div>
          )}
        </div>
      </div>

      <div className='addsection_form'>
        <div>
          <h4 className='title'>Add Section</h4>
          <form className='formclass' onSubmit={handleSubmit}>
            <div>
              <label htmlFor='content'>Section Content: </label>
              <br />
              <textarea
                name='content'
                id='content'
                className='textarea'
                ref={contentRef}
                required
              ></textarea>
              <br />
            </div>

            <div>
              <label htmlFor='isEnd'>Is this the ending section? </label>
              <br />
              <select
                name='isEnd'
                id='isEnd'
                className='select'
                ref={isEndRef}
                required
              >
                <option value='1'>True</option>
                <option value='0'>False</option>
              </select>
            </div>
            <div>
              <button type='submit' className='btn'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      
    </div>
  );
}
