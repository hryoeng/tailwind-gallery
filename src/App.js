import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoding] = useState(true);
  const [term, setTerm] = useState('snowman');

  useEffect(() => {
    fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo`)
      .then(res => res.json())
      .then(data => {
        console.log(data.hits);
        setImages(data.hits);
      })
      .catch(err => console.log(err));
  }, [term]);


  return (
    // <div className='text-6xl font-bold underline'>
    //   테일윈드 설정
    // </div>

    <div className="container mx-auto my-7">
      <ImageSearch searchText={text => setTerm(text)} />
      {images.length === 0 && <h1 className="text-5xl text-center mt-32">이미지가 없습니다.</h1>}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {images.map(image => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
}

export default App;
