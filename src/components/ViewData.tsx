import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/reduxHoks";
import { IFormData } from "../types/types";

interface Props {
  forms: IFormData[];
}


const ViewData: React.FC<Props> = ({ forms }) => {
  const { img } = useAppSelector((store) => store.img);
  const [last, setLast] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLast(false);
    }, 1000);

    return () => clearTimeout(timeout);
  })

  return (
    <div className="forms">
      {forms.map((formData, index) => (
        <div className="view-data" key={index}>
          <ul className="data-list" style={{backgroundColor: last ? "#10ff15" : ""}}>
            {Object.entries(formData).map(([key, value]) => (
              <li className="data-line" key={key}>
                <span className="data-name">{key.charAt(0).toUpperCase() + key.slice(1)} :</span>
                <p className="data-value">{value}</p>
              </li>
            ))}
          </ul>
          {img ? <img src={img[index]} alt='image from redux' width={500} height={500} style={{backgroundColor: last ? "#10ff15" : ""}}/> : null}
        </div>
      ))}
  </div>
  )
};

export default ViewData;