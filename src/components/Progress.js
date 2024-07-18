// import React, { useState, useEffect } from 'react';

// const Progress = () => {
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       // 10번의 테스트를 가정하고 10%씩 증가
//       setProgress(prevProgress => prevProgress + 10);
//     }, 1000); // 1초마다 프로그레스를 업데이트

//     return () => clearInterval(interval);
//   }, []); // componentDidMount와 같이 초기 한 번만 실행

//   return (
//     <div style={{ width: '100%', backgroundColor: '#f0f0f0', marginTop: '20px' }}>
//       <div
//         style={{
//           width: `${progress}%`,
//           height: '30px',
//           backgroundColor: '#007bff',
//           textAlign: 'center',
//           lineHeight: '30px',
//           color: 'white',
//         }}
//       >
//         {progress}%
//       </div>
//     </div>
//   );
// };

// export default Progress;
import React from 'react';

const Progress = ({ step, totalSteps }) => {
  const progress = (step / totalSteps) * 100;
  return (
    <div style={{ width: '100%', backgroundColor: '#f0f0f0', marginTop: '20px' }}>
      <div
        style={{
          width: `${progress}%`,
          height: '30px',
          backgroundColor: '#007bff',
          textAlign: 'center',
          lineHeight: '30px',
          color: 'white',
        }}
      >
        {progress.toFixed(0)}%
      </div>
    </div>
  );
};

export default Progress;
