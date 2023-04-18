import { Component } from "react";
import ProfileData from "../ProfileData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBook, faCalendar, faHouseFlag, faImages, faInfoCircle, faPen, faQuestion, faXmark } from '@fortawesome/free-solid-svg-icons';




import events from "./events";
import './Sidebar.css';
import { Link } from "react-router-dom";

interface Props {
    authToken: string;
    onLogout: () => Promise<void>;
  }

interface State {
    profile: ProfileData | null;
    isOpen: boolean;
}

export default class ProfilePage extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            profile: null,
            isOpen: false,
        }
    }

    componentDidMount(): void {
        this.handleLoadProfile();
    }

    handleLoadProfile = async () => {
        const response = await fetch('http://localhost:3000/profile', {
            headers: {
                'Authorization': 'Bearer ' + this.props.authToken
            }
        });
        const profileData = await response.json();
        this.setState({ profile: profileData });
    }

    toggleSidebar = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        const { profile } = this.state;

        

        return (
            <div>
                <button className="menubutton" onClick={this.toggleSidebar}><FontAwesomeIcon icon={faBars} /></button>
                <aside className={`sidebar ${this.state.isOpen ? 'open' : ''}`}>
                <button className="menubutton" onClick={this.toggleSidebar}><FontAwesomeIcon icon={faXmark}/></button>
                    <ul className="sidebar__menu">
                        <li className="sidebar__menu-item">
                            <Link to="/main"><FontAwesomeIcon icon={faHouseFlag} />
                            &nbsp;Főoldal</Link>
                        </li>
                        <li className="sidebar__menu-item">
                        <Link to="/calendar">
                        <FontAwesomeIcon icon={faCalendar} />
                             &nbsp;Naptár
                            </Link>
                            </li>

                        <li className="sidebar__menu-item">
                            <FontAwesomeIcon icon={faBook} />
                            <Link to="/catchdiary">&nbsp;Fogásinapló</Link>
                        </li>
                        <li className="sidebar__menu-item">
                        <FontAwesomeIcon icon={faImages} />
                            <Link to="/images">&nbsp;Képek</Link>
                        </li>
                        <li className="sidebar__menu-item">
                        <FontAwesomeIcon icon={faPen} />
                            <Link to="/blog">&nbsp;Blog</Link>
                        </li>
                        <li className="sidebar__menu-item">
                        <FontAwesomeIcon icon={faInfoCircle} />
                            <Link to="/gyik">&nbsp;GYIK</Link>
                        </li>
                        <li className="sidebar__menu-item">
                        <FontAwesomeIcon icon={faQuestion} />
                            <Link to="/contact">&nbsp;Elérhetőség</Link>
                        </li>
                    </ul>
                </aside>
                <div className="card-container">
          <div className="card">
            <h2>App letöltés</h2>
            <p>Ezen a linek keresztül tudod letölteni a telefenos alkalmazásunkat.</p><p><Link to="/app" className="infoalso">&nbsp; Kattints ide!</Link></p>
          </div>
          <div className="card">
            <h2>Információk</h2>
            <p><Link to="/gyik" className="infoalso">&nbsp;GYIK</Link></p>
            <p><Link to="/contact" className="infoalso">&nbsp;Elérhetőség</Link></p>
          </div>
          <div className="card">
            <h2 className="card">Elérhetőségeink:</h2>
            <p>Fogj ki ha tudsz.&nbsp;
            E-mail cím:</p>
            <p>Web: dominik.budavari@gmail.com</p>
            <p>Mobil: moravcsikmark@gmail.com</p>
          </div>
        </div>
            </div>
        );
    }
}