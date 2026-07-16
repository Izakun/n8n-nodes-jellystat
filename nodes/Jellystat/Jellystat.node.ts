import {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	JsonObject,
	NodeApiError,
	NodeConnectionTypes,
	NodeOperationError,
} from 'n8n-workflow';

export class Jellystat implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Jellystat',
		name: 'jellystat',
		icon: { light: 'file:jellystat.svg', dark: 'file:jellystat.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Query your Jellystat (Jellyfin statistics) instance through its API',
		defaults: { name: 'Jellystat' },
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'jellystatApi', required: true }],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Get Config', value: 'getConfig', action: 'Get the configuration' },
					{ name: 'Get Libraries', value: 'getLibraries', action: 'Get many libraries' },
				],
				default: 'getLibraries',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const URL_BY_OP: Record<string, string> = {
			getConfig: '/api/getConfig',
			getLibraries: '/api/getLibraries',
		};

		for (let i = 0; i < items.length; i++) {
			try {
				const credentials = await this.getCredentials('jellystatApi', i);
				const baseURL = (credentials.baseUrl as string).replace(/\/+$/, '');
				const operation = this.getNodeParameter('operation', i) as string;

				const url = URL_BY_OP[operation];
				if (!url) {
					throw new NodeOperationError(this.getNode(), `Unsupported operation: ${operation}`, {
						itemIndex: i,
					});
				}

				const response = await this.helpers.httpRequestWithAuthentication.call(
					this,
					'jellystatApi',
					{
						method: 'GET' as IHttpRequestMethods,
						baseURL,
						url,
						json: true,
					} as IHttpRequestOptions,
				);

				if (Array.isArray(response)) {
					for (const element of response) {
						returnData.push({ json: element as IDataObject, pairedItem: { item: i } });
					}
				} else {
					returnData.push({ json: response as IDataObject, pairedItem: { item: i } });
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: (error as Error).message }, pairedItem: { item: i } });
					continue;
				}
				throw new NodeApiError(this.getNode(), error as JsonObject, { itemIndex: i });
			}
		}

		return [returnData];
	}
}
