import BtnCloseLogo from './images/btnclose.svg';

const BtnClose = ({ onClose }) => {
    return (
        <button onClick={onClose}>
            <img src={BtnCloseLogo} className='pict' alt='Close' />
        </button>
    );
};

export default BtnClose;