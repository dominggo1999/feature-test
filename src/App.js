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
  ]);
  const [loading, setLoading] = useState(false);
  const [activeFont, setActiveFont] = useState('sans-serif');
  const [loadedFont, setLoadedFont] = useState([]);

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

  return (
    <div className="bg-blue-400 w-full h-screen">
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

      {/* Content */}
      {loading ? <h1>Loading</h1> : <h1>Ready</h1> }
      <h1
        style={{
          fontFamily: activeFont,
        }}
        className="text-5xl mt-10"
      >A very big text
      </h1>
    </div>
  );
};

export default App;
