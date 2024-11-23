import BtnEditLogo from './images/btnedit.svg';

const BtnEdit = () => {
    return (
        <button className='btn btnedit'><img src={BtnEditLogo} className='pict' alt='Edit'/></button>
    );
};

export default BtnEdit;