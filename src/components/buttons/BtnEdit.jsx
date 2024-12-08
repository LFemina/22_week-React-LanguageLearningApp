import BtnEditLogo from './images/btnedit.svg';

const BtnEdit = ({ onClick }) => {
    return (
        <button className='btn btnedit' onClick={onClick}>
            <img src={BtnEditLogo} className='pict' alt='Edit'/>
        </button>
    );
};

export default BtnEdit;