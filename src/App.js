import './App.css';
import React, { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const updateQuery = (evt) => setQuery(evt.target.value);

  const fetchQuery = async () => {
    await fetch('https://serverless-api.therealdang.workers.dev/', {
      method: 'POST',
      body: JSON.stringify({
        query,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => setImages(responseJson));
  };

  return (
    <div className="App">
      <div className="form">
        <input
          id="query"
          type="text"
          onChange={updateQuery}
          placeholder="Search photos"
        />
        <button onClick={fetchQuery}>Search</button>
      </div>
      {images.map((image) => {
        return (
          <div>
            <a key={image.id} href={image.link} target="_blank">
              <img src={image.image} />
            </a>
          </div>
        );
      })}
    </div>
  );
}

export default App;
