import React from 'react';
import { 
    Spinner,
    Navbar,
    NavbarBrand
} from 'reactstrap';
import store from '../../redux/store/index'

export default class LoadingPage extends React.Component {

    componentDidMount() {
        // prevent going back in page navigation
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event) {
            window.history.pushState(null, document.title, window.location.href);
        });

        // get values from redux store
        console.log('values from redux: ', store.getState().details[0]);  
    }

    render() {
        return(
            <div>
                <Navbar className="navbar-style" light expand="md">
                    <NavbarBrand href="#">
                        <h5 className="navbar-text" style={{ color: '#fff' }} >Noetic Payments</h5>
                    </NavbarBrand>
                </Navbar>
            
                <div className="container vh-100 d-flex align-items-center col justify-content-center">
                    <h2  style={{ color: '#6dc1c3' }}>Payment Processing... </h2>
                    <Spinner type="grow" style={{ width: '3rem', height: '3rem', color:"#6dc1c3" }}/>
                </div>
            </div>
        )
    }
}