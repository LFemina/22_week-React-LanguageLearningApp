import BtnDelLogo from './images/btndel.svg';

const BtnDel = ({ onClick }) => {
    return (
        <button className='btn btndel' onClick={onClick}>
            <img src={BtnDelLogo} className='pict' alt='Delete'/>
        </button>
    );
};

export default BtnDel;