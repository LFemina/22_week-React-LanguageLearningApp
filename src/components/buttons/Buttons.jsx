import BtnSave from "./BtnSave";
import BtnEdit from "./BtnEdit";
import BtnDel from "./BtnDel";
import './Buttons.css';
import '../theme/theme-color.css';
import '../theme/theme-animation.css';

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