import BtnSaveLogo from './images/btnsave.svg';

const BtnSave = ({ onClick }) => {
    return (
        <button className='btn btnsave' onClick={onClick}>
            <img src={BtnSaveLogo} className='pict' alt='Save'/>
        </button>
    );
};

export default BtnSave;