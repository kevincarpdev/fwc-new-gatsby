import React, { Component, Fragment, RefObject, createRef } from 'react';

import { Layout as AntLayout } from 'antd';

import Header from '../Header';
import Footer from '../Footer';
import CookieConsent from "react-cookie-consent";
import './Layout.scss';
export interface Props {
	children: React.ReactNode;
	location: Location;
}

export class Layout extends Component<Props> {

	target: RefObject<HTMLDivElement> = createRef();

	render() {

		return (
			<Fragment>
				<AntLayout className="layout-container">
					<Header location={this.props.location} />
					<div className="layout" ref={this.target}>
						<main>{this.props.children}</main>
					</div>
					<Footer />
					{/* <SideDrawer /> */}
					<CookieConsent
						location='bottom'
						buttonText='I Accept'
						cookieName='fwcEuroCookie'
						style={{ background: '#2B373B' }}
						buttonStyle={{ color: '#4e503b', fontSize: '13px' }}
						expires={150}
						>
						This website uses cookies to enhance the user experience.
					</CookieConsent>
				</AntLayout>
			</Fragment>
		);
	}

}

export default Layout;
