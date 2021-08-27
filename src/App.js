import { useRef, useState } from 'react';

const App = () => {
  const ref = useRef();
  const [imageURL, setImageURL] = useState('https://images.pexels.com/photos/7538060/pexels-photo-7538060.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940');

  const handleSubmit = (e) => {
    e.preventDefault();
    const file = ref.current.files[0];

    const reader = new FileReader();
    const img = new Image();
    reader.onload = () => {
      img.src = reader.result;
      setImageURL(reader.result);
    };

    img.onload = () => {
      console.log(img.naturalHeight, img.naturalWidth);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      <form>
        <input
          onChange={handleSubmit}
          ref={ref}
          accept="image/png,image/jpeg,image/jpg"
          type="file"
        />
        <button type="submit">Upload</button>
      </form>
      <img
        src={imageURL}
        alt="Choco"
      />
    </div>
  );
};

export default App;
