import Link from 'next/link';

import classes from './main-header.module.css';

function MainHeader() {
    return <header className={classes.header}>
        <div className={classes.logo}>
            {/* logo klikalne */}
            <Link href="/">NextEvent</Link>
        </div>
        <nav className={classes.navigation}>
            <ul>
                <li>
                    <Link href='/events'> Browse All Events</Link>
                </li>
            </ul>
        </nav>
    </header>

}

export default MainHeader;