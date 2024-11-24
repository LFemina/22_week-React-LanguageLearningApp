import BtnSave from "./BtnSave";
import BtnEdit from "./BtnEdit";
import BtnDel from "./BtnDel";
import './Buttons.css';

const Buttons = () => {
    return (
        <div className="btnlist">
            <BtnSave />
            <BtnEdit />
            <BtnDel />
        </div>
    );
};

export default Buttons;