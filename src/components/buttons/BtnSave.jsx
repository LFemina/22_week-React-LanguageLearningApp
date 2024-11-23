import BtnSaveLogo from './images/btnsave.svg';

const BtnSave = () => {
    return (
        <button className='btn btnsave'><img src={BtnSaveLogo} className='pict' alt='Save'/></button>
    );
};

export default BtnSave;