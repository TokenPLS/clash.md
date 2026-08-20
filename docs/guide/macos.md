---
title: Mac guide
description: Add and switch Clash Profiles, choose modes and routes, use the menu bar, inspect Connections, and confirm when a new setting takes effect on Mac.
keywords:
  - Clash Mac guide
  - Clash macOS Profile
  - choose Clash Mac node
  - Clash menu bar
  - Clash Connections
pageClass: clash-device-guide-page
jsonLd:
  "@context": https://schema.org
  "@type": HowTo
  name: How to use Clash on Mac
  description: Add a Profile, choose a mode and route, connect, inspect active connections, and confirm a setting is in use.
  inLanguage: en-US
  step:
    - "@type": HowToStep
      position: 1
      name: Add a Profile
      text: Start from a Profile URL, configuration file, pasted content, blank Profile, or QR image.
    - "@type": HowToStep
      position: 2
      name: Choose a mode and route
      text: Choose an outbound mode on Home, then select a route inside its policy group.
    - "@type": HowToStep
      position: 3
      name: Connect
      text: Connect from the main window or menu bar.
    - "@type": HowToStep
      position: 4
      name: Inspect Connections
      text: Check the matched rule, outbound target, and proxy chain used by a new connection.
---

# Mac guide

From the main window to the menu bar, and from Profile management to connection
inspection, this page covers the complete Mac workflow.

<nav class="everyday-task-grid" aria-label="Mac guide topics">
  <a href="#manage-profiles"><strong>Manage Profiles</strong><span>Add, switch, sync, and export</span></a>
  <a href="#choose-an-outbound-mode"><strong>Choose an outbound mode</strong><span>Rule, Global, and Direct</span></a>
  <a href="#choose-a-route"><strong>Choose a route</strong><span>Policy groups, nodes, and latency</span></a>
  <a href="#connect-and-use-the-menu-bar"><strong>Connect and use the menu bar</strong><span>Main window and quick controls</span></a>
  <a href="#inspect-active-connections"><strong>Inspect active connections</strong><span>Rules, proxy chains, and details</span></a>
  <a href="#confirm-a-setting"><strong>Confirm a setting</strong><span>Check a genuinely new connection</span></a>
</nav>

## Manage Profiles

Open **Profiles** from the sidebar. Choose **Add Profile** to start from a
Profile URL, configuration file, pasted content, or a blank Profile. QR codes
are read from an image file.

Click a row to switch, or use its trailing arrow to open details. The active
Profile and switching progress stay visible in the list. Right-click a Profile
to sync, duplicate, export, or delete it; details provide its other editable
properties.

::: tip Profiles may contain credentials
Profile URLs, configuration files, and backups can contain server credentials.
When asking for help publicly, do not post real URLs, usernames, passwords,
keys, or unredacted logs.
:::

## Choose an outbound mode

Choose from the **Outbound Mode** card on Home:

| Mode | What it does |
|---|---|
| **Rule** | Uses the active Profile to decide whether each connection goes direct, uses a proxy, or is rejected |
| **Global** | Sends traffic to the global proxy group and its selected route |
| **Direct** | Connects without a proxy |

Rule is the usual everyday choice. Different connections can use different
policy groups, so Rule mode has no single “current node” that represents all
traffic. Direct does not use a proxy; an empty node screen in Direct is expected.

## Choose a route

Open **Proxies**, expand a policy group, and choose a node. The selected card
uses a highlighted background and leading accent line. Cards also report a
latency value, failure, or timeout.

Search, expand-all, and collapse-all controls are in the window toolbar. When
connected, use **Test All** to compare response times on the current network.
Lower latency does not guarantee higher throughput on every network.

## Connect and use the menu bar

Connect from Home. The first time, approve the system request to add a VPN
configuration. Home then reports connection state, duration, and live traffic.

Use the menu bar to connect, disconnect, switch Mode, and see the current route
without opening the main window. The menu bar does not select nodes. To change
a node, open the **Proxies** card on Home or **Proxies** in the sidebar. Return
to the main window when you need to inspect Profiles, rules, DNS, logs, or
connection details.

## Inspect active connections

Open `Session` → **Connections** from the sidebar. The list shows destinations,
matched rules, outbound targets, proxy chains, and transferred bytes. The detail
pane adds endpoints, traffic, and connection metadata.

Search, sort, close one connection, or use **Close All** to end every active
connection. The originating app may reconnect according to its own behavior.

## Confirm a setting

Check these in order:

1. The active item in Profiles is the intended configuration.
2. The Outbound Mode indicator is on the intended mode.
3. The intended node is selected inside the intended policy group.
4. Make sure the target app establishes a **new connection**, then inspect its
   matched rule, outbound target, and proxy chain in Connections.

A page refresh can still reuse HTTP/2, HTTP/3, or QUIC. When certainty matters,
close the corresponding old connection in Connections before making the target
app connect again.

The optional **External IP** card on Home provides another signal, but it proves
only where that particular lookup went. In Rule mode, it cannot represent every
destination.

## What happens to existing connections?

- **Switch Profile:** a successful switch normally ends current active
  connections. Apps that still need network access use the new Profile when
  they establish new connections. The Tunnel can remain Connected.
- **Switch between Rule and Direct:** the mode change itself does not migrate
  or actively close old connections. New connections use the new mode; a later
  runtime-configuration refresh by the client can still end old connections.
- **Switch to Global:** active connections end only when the `GLOBAL` group must
  also change and the default **Close connections on node switch** setting is
  enabled.
- **Change a node manually:** active connections end when **Close connections
  on node switch** is enabled. Disabling it leaves old connections in place.
- **Stop and reconnect the Tunnel:** all connections are interrupted; new ones
  use current settings.

Avoid changing a Profile, node, or the Tunnel during an important download,
call, or game. To move traffic immediately, use **Close All** in Connections,
then make the target app establish a new connection.
