import { isMobile } from 'react-device-detect';
import { ReactComponent as Edit } from '../../assets/edit.svg';

const justAnArray = Array.from(Array(10), () => 0);

const Mobile = () => {
  if(!isMobile) {
    return null;
  }

  return (
    <div className="bottom-bar">
      <div className="w-full bg-black">

        <div className="w-full overflow-x-scroll phone-no-scrollbar text-white flex items-center">

          {
            justAnArray.map((i, id) => {
              const a = id;

              return (
                <div
                  key={`main-tab-${a}`}
                  className="w-[72px] h-[72px] flex flex-col justify-center items-center cursor-pointer flex-shrink-0 flex-grow-0"
                >
                  <Edit className="fill-current w-6 h-6" />
                  <p className="text-sm font-semibold">Text</p>
                </div>
              );
            })
          }
        </div>
        <div className="w-full overflow-x-scroll phone-no-scrollbar text-white flex items-center">
          {
            justAnArray.map((i, id) => {
              const a = id;

              return (
                <div
                  key={`tab-${a}`}
                  className="w-[72px] h-[60px] flex flex-col justify-center items-center cursor-pointer flex-shrink-0 flex-grow-0"
                >
                  <Edit className="fill-current w-6 h-6" />
                  <p className="text-sm font-semibold">Text</p>
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

export default Mobile;
