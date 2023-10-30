// import { useEffect, useState } from 'react';
// import { IPeople } from '../types/types';
// import { useParams } from 'react-router';

// const Detail: React.FC = () => {
//   const [item, setItem] = useState(null);
//   const { name } = useParams();

//   // useEffect(() => {

//   // });

//   if (item) {
//     return (
//       <div className="result__item">
//         {Object.entries(item).map((value, index) => {
//           return (
//             <div className="item" key={index}>
//               <h2 className="item__name">{value[0]}</h2>
//               <p className="item__value">
//                 {Array.isArray(value[1])
//                   ? (value[1] as string[]).map((value) => value + '\n')
//                   : String(value[1])}
//               </p>
//             </div>
//           );
//         })}
//       </div>
//     );
//   } else {
//     console.log(name);
//   }
// };

// export default Detail;
