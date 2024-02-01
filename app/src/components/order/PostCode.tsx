import React from 'react';

import {useDaumPostcodePopup} from 'react-daum-postcode';

const Postcode = ({handleComplete}: {handleComplete: (data: any) => void}) => {
  const open = useDaumPostcodePopup('//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');

  const handleClick = () => {
    open({onComplete: handleComplete});
  };

  return (
    <button type="button" onClick={handleClick} className=" bg-white p-2">
      주소찾기
    </button>
  );
};

export default Postcode;
