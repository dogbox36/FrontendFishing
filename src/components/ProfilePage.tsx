import { Component } from "react";
import ProfileData from "../ProfileData";
import FullCalendar from "@fullcalendar/react";
import { EventInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBook, faCalendar, faImages, faInfoCircle, faPen } from '@fortawesome/free-solid-svg-icons';

import events from "./events";
import './Sidebar.css';
import { Link } from "react-router-dom";

interface Props {
    authToken: string;
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

        const calendarProps = {
            defaultView: "dayGridMonth",
            header: {
              left: "prev,next",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay"
            },
            themeSystem: "Simplex",
            plugins: [dayGridPlugin],
            events: events
        };

        const containerStyle = {
            maxWidth: "40%",
            maxHeight: "25%",
        };
        

        return (
            <div>
                <button className="menubutton" onClick={this.toggleSidebar}><FontAwesomeIcon icon={faBars} /></button>
                <p>My profile:</p>
                <p>Username: {profile?.username}</p>
                <p>User id: {profile?.id}</p>
                <div className="App full-calendar-container" style={containerStyle}>
                    <FullCalendar {...calendarProps} />
                </div>
                <aside className={`sidebar ${this.state.isOpen ? 'open' : ''}`}>
                    <ul className="sidebar__menu">
                        <li className="sidebar__menu-item">
                            <Link to="/">&nbsp;Főoldal</Link>
                        </li>
                        <li className="sidebar__menu-item">
                        <FontAwesomeIcon icon={faCalendar} />
                            <Link to="/calendar">&nbsp;Naptár</Link>
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
                            <Link to="/contact">&nbsp;Elérhetőség</Link>
                        </li>
                    </ul>
                </aside>
            </div>
        );
    }
}
