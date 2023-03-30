import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import classnames from 'classnames';
import Logger from '../Logger';
import utils from '../utils';
import UserChip from './UserChip';
import CommunicationCall from 'material-ui/svg-icons/communication/call';
import UrlParse from 'url-parse';

const logger = new Logger('Dialer');

export default class Dialer extends React.Component {
	constructor(props) {
		super(props);

		const query = new UrlParse(window.location.href, true);
		this.state =
		{
			uri: query.query.phone,
		};


	}

	render() {
		const state = this.state;
		const props = this.props;
		const settings = props.settings;

		return (
			<div>
				{!props.busy && (
					<div data-component='Dialer'>
					<form
						className={classnames('uri-form', { hidden: props.busy && utils.isMobile() })}
						action=''
						onSubmit={this.handleSubmit.bind(this)}
					>
						
						<div className='uri-container'>
							<TextField
								hintText='SIP URI or username'
								fullWidth
								disabled={false}
								value={state.uri}
								onChange={this.handleUriChange.bind(this)}
							/>
						</div>
						<CommunicationCall
							className='control'
							color={'green'}
							style={{
								width: 50,
								height: 80,
							}}
							hidden={state.calling}
							disabled={!this._canCall() || !state.uri}
							onClick={this.handleClickCall.bind(this)}
						/>
	
					</form>
	
					
					{/* <div className='userchip-container'>
						<UserChip
							name={settings.display_name}
							uri={settings.uri || ''}
							status={props.status}
							fullWidth
						/>
					</div> */}
	
	
				</div>
				)}
			</div>
		);
	}

	handleUriChange(event) {
		this.setState({ uri: event.target.value });
	}

	handleSubmit(event) {
		logger.debug('handleSubmit()');

		event.preventDefault();

		if (!this._canCall() || !this.state.uri)
			return;

		this._doCall();
	}

	handleClickCall() {
		logger.debug('handleClickCall()');

		this._doCall();
	}

	_doCall() {
		const uri = this.state.uri;

		logger.debug('_doCall() [uri:"%s"]', uri);

		this.props.onCall(uri);
	}

	_canCall() {
		const props = this.props;

		return (
			!props.busy &&
			(props.status === 'connected' || props.status === 'registered')
		);
	}

}

Dialer.propTypes =
{
	settings: PropTypes.object.isRequired,
	status: PropTypes.string.isRequired,
	busy: PropTypes.bool.isRequired,
	callme: PropTypes.string,
	onCall: PropTypes.func.isRequired
};
