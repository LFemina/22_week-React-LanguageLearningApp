import { Link } from 'react-router-dom';
import './Header.css';
import Logo from "./Logo/logo.svg";

const Header = ({ style }) => {
    return (
        <header className="header" style={style}>
            <div className="header-logo-container">
                <Link to="/">
                    <img src={Logo} alt="logo" className="header-logo-pict" />
                </Link>
            </div>
            <h1 className="header-head">Изучение иностранных языков</h1>
        </header>
    );
}

export default Header;