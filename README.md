# n8n-nodes-jellystat

[![npm version](https://img.shields.io/npm/v/n8n-nodes-jellystat.svg)](https://www.npmjs.com/package/n8n-nodes-jellystat)

n8n community node for [Jellystat](https://github.com/CyferShepard/Jellystat) — Jellyfin statistics — via its API.

Install via **Settings -> Community Nodes -> Install** -> `n8n-nodes-jellystat`.

## Operations
- Get Libraries, Get Config

## Credentials
Configure the base URL and authentication in the **Jellystat API** credential.

## Usage example

List tracked libraries:

1. Add the node after a trigger (e.g. *When clicking 'Test workflow'*).
2. Select your credential.
3. **Get Libraries**.
4. Execute the node — example output:

```json
{ "Id": "f1...", "Name": "Movies", "CollectionType": "movies", "Library_Count": 842 }
```

## Disclaimer
Not affiliated with or endorsed by the respective project.
