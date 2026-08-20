---
title: Apple TV guide
description: Add and switch Clash Profiles, choose modes and nodes, connect, inspect Connections, and confirm when a new setting takes effect on Apple TV.
keywords:
  - Clash Apple TV guide
  - Clash tvOS Profile
  - choose Clash Apple TV node
  - Clash tvOS Connections
pageClass: clash-device-guide-page
jsonLd:
  "@context": https://schema.org
  "@type": HowTo
  name: How to use Clash on Apple TV
  description: Add a Profile, choose a mode and node, connect, inspect active connections, and confirm a setting is in use.
  inLanguage: en-US
  step:
    - "@type": HowToStep
      position: 1
      name: Add a Profile
      text: Add a configuration through an HTTP or HTTPS Profile URL.
    - "@type": HowToStep
      position: 2
      name: Choose a mode and node
      text: Choose an outbound mode from Using on Home, then select a route on the node screen.
    - "@type": HowToStep
      position: 3
      name: Connect
      text: Start the Tunnel from Home.
    - "@type": HowToStep
      position: 4
      name: Inspect Connections
      text: View proxied, direct, and rejected connections passing through the Tunnel.
---

# Apple TV guide

From adding a Profile to selecting a node with the remote and inspecting live
connections, this page covers only Apple TV.

<nav class="everyday-task-grid" aria-label="Apple TV guide topics">
  <a href="#manage-profiles"><strong>Manage Profiles</strong><span>Add by URL, switch, and update</span></a>
  <a href="#choose-an-outbound-mode"><strong>Choose an outbound mode</strong><span>Rule, Global, and Direct</span></a>
  <a href="#choose-a-node"><strong>Choose a node</strong><span>Policy groups, focus, and the active route</span></a>
  <a href="#connect-the-tunnel"><strong>Connect the Tunnel</strong><span>Start or stop from Home</span></a>
  <a href="#inspect-active-connections"><strong>Inspect active connections</strong><span>Proxied, direct, and rejected</span></a>
  <a href="#confirm-a-setting"><strong>Confirm a setting</strong><span>Check a genuinely new connection</span></a>
</nav>

## Manage Profiles

From the `Using` section on Home, select the current Profile name to open the
Profile list and details. Apple TV adds configurations only through an HTTP or
HTTPS Profile URL. It does not provide configuration-file import, pasted YAML,
QR, or blank-Profile entry points.

Details change with Profile state. The current Profile shows **In use** and
offers **Update now**, **Rename**, and **Remove**. A non-active Profile offers
**Rename**, **Use this profile**, and **Remove**, but not **Update now**.

::: tip Profiles may contain credentials
A Profile URL can contain server credentials. When asking for help publicly, do
not post real URLs, usernames, passwords, keys, or unredacted logs.
:::

## Choose an outbound mode

Open Outbound Mode from the `Using` section on Home:

| Mode | What it does |
|---|---|
| **Rule** | Uses the active Profile to decide whether each connection goes direct, uses a proxy, or is rejected |
| **Global** | Sends traffic to the global proxy group and its selected route |
| **Direct** | Connects without a proxy |

Treat the moved selection indicator as the result; the screen also reports
**In force** or **Currently in force**. When Global has no usable proxy, Clash
keeps the previous mode and explains why.

Direct does not use a proxy, so the node screen does not list policy groups or
nodes. They return when you switch to Rule or Global.

## Choose a node

Select **Node** on Home, or open **Utilities** → **Nodes**. Move focus through
policy groups on the left, then select a node from the grid on the right. The
active node shows **In use**.

In Rule mode, different connections can use different policy groups, so there
is no single “current node” that represents all traffic.

## Connect the Tunnel

Return to Home and start the Tunnel. The first time, approve the system request
to add a VPN configuration. Home then reports connection state, duration, and
live traffic. Stop the Tunnel from the same screen when needed.

## Inspect active connections

Open **Utilities** → **Connections**. Filter the live list by All, Proxied,
Direct, or Rejected to see traffic currently passing through the Tunnel.

Connections on Apple TV is read-only. It does not provide per-connection close,
**Close All**, or a connection-detail screen.

## Confirm a setting

Check these in order:

1. Profile details show **In use**.
2. Outbound Mode reports the intended mode **In force**.
3. The intended node shows **In use** in its policy group.
4. Make the target app establish a **new connection**, then use Connections to
   check whether it is Proxied, Direct, or Rejected.

Reloading content or starting playback again can still reuse an existing
connection. Apple TV does not provide connection-closing controls. When every
old connection must end, stop and reconnect the Tunnel.

Apple TV does not currently provide an External IP card. In Rule mode, a single
exit-IP lookup would not represent every destination anyway.

## What happens to existing connections?

- **Switch Profile:** Clash disconnects the Tunnel, then reconnects with the
  selected Profile. All existing connections are interrupted.
- **Switch a mode or node:** Clash does not actively close existing connections.
  Old connections remain on their original route; new connections use the new
  mode or node.
- **Stop and reconnect the Tunnel:** all connections are interrupted; new ones
  use current settings.

Avoid changing a Profile or the Tunnel during important playback, a call, or a
game. To verify a new setting, make the target app establish a new connection
and check its actual category in Connections.
