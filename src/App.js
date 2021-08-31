import { useRef, useState, useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import FontFaceObserver from 'fontfaceobserver';
import WebFont from 'webfontloader';

const App = () => {
  const [fontList, setFontList] = useState([
    'Roboto',
    'Besley',
    'Lato',
    'Montserrat',
    'Pacifico',
  ]);
  const [uploadedFontList, setUploadedFontList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeFont, setActiveFont] = useState('sans-serif');
  const [loadedFont, setLoadedFont] = useState([]);
  const ref = useRef();

  const loadFont = (fontFamily) => {
    setLoading(true);

    // check if font has loaded or not

    if(loadedFont.indexOf(fontFamily) === -1) {
      WebFont.load({
        google: {
          families: [fontFamily],
        },
      });

      const fontObserver = new FontFaceObserver(fontFamily);

      fontObserver.load()
        .then((_) => {
          setLoading(false);
          setActiveFont(fontFamily);
          setLoadedFont([
            ...loadedFont,
            fontFamily,
          ]);
        })
        .then((err) => {
          if(err) {
            console.log(err);
          }
        });
    }else{
      setActiveFont(fontFamily);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fileInput = ref.current.files;

    const file = fileInput[0];
    const data = await file.arrayBuffer();
    const fontFamily = file.name.split('.')[0];
    if(fileInput.length && uploadedFontList.indexOf(fontFamily) === -1) {
      const font = new FontFace(fontFamily, data);
      await font.load();
      document.fonts.add(font);

      // Add font to list
      setUploadedFontList([
        ...uploadedFontList,
        fontFamily,
      ]);
    }else{
      console.log('font is already exists');
    }
    ref.current.value = '';
  };

  return (
    <div className="bg-blue-400 w-full p-10">
      <h1>Google font</h1>
      <ul className="w-full flex flex-col justify-center">
        {
          fontList.map((f) => {
            return (
              <button
                key={f}
                onClick={() => loadFont(f)}
              >{f}
              </button>
            );
          })
        }
      </ul>

      <h1>Uploaded Font</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          ref={ref}
          required
        />
        <button
          className="bg-red-500 text-white p-3"
          type="submit"
        >Upload
        </button>
      </form>
      <ul className="mb-20 w-full flex flex-col justify-center">
        {
          uploadedFontList && uploadedFontList.map((font) => {
            return (
              <button
                onClick={() => setActiveFont(font)}
                key={`font-${font}`}
              >{font}
              </button>
            );
          })
        }
      </ul>

      {/* Content */}
      {loading ? <h1>Loading</h1> : <h1>Ready</h1> }
      <h1
        style={{
          fontFamily: activeFont,
        }}
        className="text-5xl mt-10"
      >A very big text Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident quam sint minima maiores. Porro dolores nihil, voluptatum numquam debitis autem?
      </h1>
    </div>
  );
};

export default App;
