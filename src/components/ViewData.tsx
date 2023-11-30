import { IFormData } from "../types/types";

interface Props {
  formData: IFormData;
}

const ViewData: React.FC<Props> = ({ formData }) => {

  return (
    <div className="view-data">
      <ul className="data-list">
        {Object.entries(formData).map(([key, value]) =>
          (<li className="data-line" key={key}>
            <span className="data-name">{key}</span>
            <p className="data-name">{value}</p>
          </li>)
        )}
      </ul>
    </div>
  )
};

export default ViewData;