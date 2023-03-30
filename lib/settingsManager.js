import clone from 'clone';
import deepmerge from 'deepmerge';
import Logger from './Logger';

import storage from './storage';

const logger = new Logger('settingsManager');

const DEFAULT_SIP_DOMAIN = 'tryit.jssip.net';
const DEFAULT_SETTINGS =
{
	'display_name' : "Hung Feng",
	uri            : "sip:2001@cc95.siptrunk.vn",
	password       : "Adsxanh@!#2001",
	socket         :
	{
		uri             : 'wss://cc95.siptrunk.vn:58089/ws',
		'via_transport' : 'auto'
	},
	'registrar_server'    : null,
	'contact_uri'         : null,
	'authorization_user'  : null,
	'instance_id'         : null,
	'session_timers'      : true,
	'use_preloaded_route' : false,
	pcConfig              :
	{
		rtcpMuxPolicy : 'negotiate',
		iceServers    :
		[
			{ urls: [ 'stun:stun.l.google.com:19302' ] }
		]
	},
	callstats :
	{
		enabled   : false,
		AppID     : null,
		AppSecret : null
	}
};

let settings;

// First, read settings from local storage
// settings = storage.get();

// Try to read settings from a global SETTINGS object
// if (window.SETTINGS)
// {
// 	logger.debug('window.SETTINGS found');

// 	settings = deepmerge(
// 		window.SETTINGS,
// 		settings || {},
// 		{ arrayMerge: (destinationArray, sourceArray) => sourceArray });
// }

// If not settings are found, clone default ones

// settings = clone(DEFAULT_SETTINGS, false);

settings = DEFAULT_SETTINGS;

module.exports =
{
	get()
	{
		return settings;
	},

	set(newSettings)
	{
		storage.set(newSettings);
		settings = newSettings;
	},

	clear()
	{
		storage.clear();
		settings = clone(DEFAULT_SETTINGS, false);
	},

	isReady()
	{
		return Boolean(settings.uri);
	},

	getDefaultDomain()
	{
		return DEFAULT_SIP_DOMAIN;
	}
};
