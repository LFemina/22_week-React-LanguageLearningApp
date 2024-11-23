import BtnDelLogo from './images/btndel.svg';

const BtnDel = () => {
    return (
        <button className='btn btndel'><img src={BtnDelLogo} className='pict' alt='Delete'/></button>
    );
};

export default BtnDel;