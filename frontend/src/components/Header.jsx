import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className='header_container'>
      <ul className='header'>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/create_story'>Create Story</Link>
        </li>
        <li>
          <Link to='/dashboard'>Dashboard</Link>
        </li>
      </ul>
    </div>
  );
}
