// // PhotoGrid.js

// import React from 'react';

// const PhotoGrid = ({ photos, selectedPhotos, onPhotoClick }) => {
//   return (
//     <div className="photo-grid">
//       {photos.map(photo => (
//         <img
//           key={photo.id}
//           src={photo.url}
//           alt={`Photo ${photo.id}`}
//           className={selectedPhotos.includes(photo.id) ? 'selected' : ''}
//           onClick={() => onPhotoClick(photo.id)}
//         />
//       ))}
//     </div>
//   );
// };

// export default PhotoGrid;
