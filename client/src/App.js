
import React, { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const handleSearch = async () => {
    let handle = '';

    if (query) {
      const res = await fetch('http://localhost:5000/api/nlp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: query })
      });
      const data = await res.json();
      handle = data.handle;
    } else if (image) {
      const formData = new FormData();
      formData.append('file', image);
      const res = await fetch('http://localhost:5000/api/vision', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      handle = data.handle;
    }

    const prodRes = await fetch(`http://localhost:5000/api/product/${handle}`);
    const prodData = await prodRes.json();
    setResult(prodData);
  };

  return (
    <div className="App">
      <h1>Cricket Product Search</h1>
      <input type="text" placeholder="Search cricket gear..." onChange={(e) => setQuery(e.target.value)} />
      <p>or</p>
      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
      <button onClick={handleSearch}>Search</button>

      {result && (
        <div className="result">
          <img src={result.image} alt={result.title} width={200} />
          <h3>{result.title}</h3>
          <p>Price: ₹{result.price}</p>
          <a href={`https://wa.me/91XXXXXXXXXX?text=Hi, I'm interested in ${result.title}`}>Buy Now on WhatsApp</a>
        </div>
      )}
    </div>
  );
}

export default App;
