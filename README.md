<img src="nodes/Jellystat/jellystat.svg" width="90" align="right" alt="Jellystat" />

# n8n-nodes-jellystat

[![npm version](https://img.shields.io/npm/v/n8n-nodes-jellystat.svg)](https://www.npmjs.com/package/n8n-nodes-jellystat)
[![npm downloads](https://img.shields.io/npm/dm/n8n-nodes-jellystat.svg)](https://www.npmjs.com/package/n8n-nodes-jellystat)
[![License: MIT](https://img.shields.io/npm/l/n8n-nodes-jellystat.svg)](./LICENSE)

Community node for **n8n** to interact with **Jellystat**. It lets you automate
Jellystat directly from your n8n workflows using a secure stored credential.

> 🟡 **Community node** — submitted to n8n for verification (review in progress).
> Until it is approved, install it as a community node (below).

## Installation

In n8n, go to **Settings → Community Nodes → Install** and enter `n8n-nodes-jellystat`.
Once it passes n8n's verification it will also be available directly from the **+ (Add node)** panel.

## Operations

| Operation | Description |
|---|---|
| **Get Config** | Get the configuration |
| **Get History** | Get the playback history |
| **Get Libraries** | Get many libraries |
| **Get Library Overview** | Get the library overview |
| **Get Sessions** | Get active sessions |

## Authentication

This node uses the **Jellystat API** credential. In n8n, go to **Credentials → New**, pick
**Jellystat API**, and fill in:

- **Base URL** — the address of your instance, e.g. `http://jellystat:3000` (no trailing slash).
- **API Key** — your service API key.

Your credential is sent as the `x-api-token` request header.

**Where to find it:** See the service documentation: https://github.com/CyferShepard/Jellystat

The credential's **Test** button verifies the connection before you save.

## Usage

1. Add the **Jellystat** node to a workflow (after a trigger such as *When clicking 'Test workflow'* or a Schedule Trigger).
2. Select your **Jellystat API** credential.
3. Pick an **Operation** and run the workflow — the response is returned as JSON for the next node.

## Compatibility

Requires n8n **1.0** or newer. Built and linted with the official `@n8n/node-cli`, and
published to npm with a build-provenance attestation.

## Resources

- [Jellystat](https://github.com/CyferShepard/Jellystat)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)

## License

[MIT](./LICENSE)
