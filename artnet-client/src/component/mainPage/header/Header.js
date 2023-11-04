import logo from "../../../images/logo.png";
import "./Header.css";


const Header = (props) => {

    return (
        <div className="container header-div">
            <div className="row align-items-start h-line-left">

                <div className="col-2">{/*column*/}
                    <img src={logo} className='header-logo' />
                </div>

                <div className="col-8">{/*column*/}
                </div>

                <div className="col-2">{/*column*/}
                </div>
                
            </div>
        </div>
    );
}

export default Header;