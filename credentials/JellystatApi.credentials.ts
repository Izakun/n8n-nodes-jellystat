import { IAuthenticateGeneric, ICredentialType, INodeProperties } from 'n8n-workflow';

export class JellystatApi implements ICredentialType {
	name = 'jellystatApi';

	displayName = 'Jellystat API';

	icon = 'file:jellystatApi.svg' as const;

	documentationUrl = 'https://github.com/CyferShepard/Jellystat';

	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'http://jellystat:3000',
			required: true,
			description: 'Base URL of the Jellystat instance (e.g. http://jellystat:3000). No trailing slash.',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'Jellystat API key (Settings → API Keys)',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'x-api-token': '={{$credentials.apiKey}}',
			},
		},
	};
}
