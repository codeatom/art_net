import './Layout.css';
import Header from './header/Header';
import Footer from './footer/Footer'
import LeftPanel from './leftPanel/LeftPanel';
import RightPanel from './rightPanel/RightPanel';
import MiddlePanel from './middlePanel/MiddlePanel';


const Layout = () => {
    return (
        <div className="container mainpage-container">
            <div className="row">  {/* a bootstrap row */}
                <Header />
            </div>

            <div className="row">{/* a bootstrap row */}
                <div className="col-3 left-panel">{/* a column */}
                    <LeftPanel />
                </div>

                <div className="col-6 middle-side">{/* a column */}
                    <MiddlePanel />
                </div>

                <div className="col-3 right-panel">{/* a column */}
                    <RightPanel />
                </div>
            </div>

            <div className="row">  {/* a bootstrap row */}
                <Footer />
            </div>
        </div>
    );
}

export default Layout;