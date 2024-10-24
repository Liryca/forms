// import React from "react";
// import { useQuery } from "react-query";
// import TemplateServices from "./TemplateServices"; // Сервис для API

// const Results = ({ templateId }) => {
//   const { data: results, isLoading } = useQuery(["results", templateId], () =>
//     TemplateServices.getResultsByTemplateId(templateId)
//   );

//   if (isLoading) return <div>Loading...</div>;

//   return (
//     <div>
//       <h2>Результаты</h2>
//       {/* Вывод результатов */}
//       <ul>
//         {results.map((result, index) => (
//           <li key={index}>{result}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Results;
