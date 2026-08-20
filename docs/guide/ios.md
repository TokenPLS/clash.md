---
title: iPhone and iPad guide
description: Add and switch Clash Profiles, choose modes and routes, connect, inspect Connections, and confirm when a new setting takes effect on iPhone and iPad.
keywords:
  - Clash iPhone guide
  - Clash iPad guide
  - add Clash Profile
  - choose Clash node
  - Clash Connections
pageClass: clash-device-guide-page
jsonLd:
  "@context": https://schema.org
  "@type": HowTo
  name: How to use Clash on iPhone and iPad
  description: Add a Profile, choose a mode and route, connect, inspect active connections, and confirm a setting is in use.
  inLanguage: en-US
  step:
    - "@type": HowToStep
      position: 1
      name: Add a Profile
      text: Start from a Profile URL, configuration file, pasted content, blank Profile, or QR code.
    - "@type": HowToStep
      position: 2
      name: Choose a mode and route
      text: Choose an outbound mode on Home, then select a route inside its policy group.
    - "@type": HowToStep
      position: 3
      name: Connect
      text: Connect from Home and approve the system VPN configuration request.
    - "@type": HowToStep
      position: 4
      name: Inspect Connections
      text: Check the matched rule, outbound target, and proxy chain used by a new connection.
---

# iPhone and iPad guide

From adding your first Profile to changing routes, inspecting connections, and
confirming a setting, this page covers only iPhone and iPad.

<nav class="everyday-task-grid" aria-label="iPhone and iPad guide topics">
  <a href="#manage-profiles"><strong>Manage Profiles</strong><span>Add, switch, update, and remove</span></a>
  <a href="#choose-an-outbound-mode"><strong>Choose an outbound mode</strong><span>Rule, Global, and Direct</span></a>
  <a href="#choose-a-route"><strong>Choose a route</strong><span>Policy groups, nodes, and latency</span></a>
  <a href="#connect-and-use-quick-controls"><strong>Connect and use quick controls</strong><span>Home, Control Center, and Shortcuts</span></a>
  <a href="#inspect-active-connections"><strong>Inspect active connections</strong><span>Rules, proxy chains, and live traffic</span></a>
  <a href="#confirm-a-setting"><strong>Confirm a setting</strong><span>Check a genuinely new connection</span></a>
</nav>

## Manage Profiles

### Open the Profile list

- iPhone: tap the current Profile name at the top of Home.
- iPad: at regular width, open **Profiles** from the sidebar; narrow split views
  use the same path as iPhone.

Choose **Add Profile** to start from a Profile URL, configuration file, pasted
content, or a blank Profile. iPhone and iPad can also scan a QR code directly or
read one from a photo.

Tap a row to switch, or use its info button to open details. The active Profile
shows a checkmark, and Home updates to the new name when switching completes.
Use details to update, rename, export, or remove a Profile.

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

Open **Proxies**, find the policy group responsible for the traffic, and choose
a node inside it. The selected card uses a highlighted background and leading
accent line. Cards also report a latency value, failure, or timeout.

When connected, use **Test All** to compare response times on the current
network. Lower latency can be useful, but it does not guarantee higher
throughput on every network. iPad uses a multi-column grid at wider sizes.

## Connect and use quick controls

Return to Home and connect. The first time, approve the system request to add a
VPN configuration. Home then reports connection state, duration, and live
traffic.

iPhone and iPad also provide common actions through Control Center and
Shortcuts. Automatic connection behavior follows the on-demand conditions you
choose.

## Inspect active connections

- iPhone: **Utilities** → `Current Session` → **Connections**.
- iPad: open **Connections** from the sidebar at regular width; narrow split
  views use the iPhone path.

Connections shows destinations, matched rules, outbound targets, proxy chains,
and transferred bytes. Search, sort, inspect details, close one connection, or
use **Close All** to end current active connections. The originating app may
reconnect according to its own behavior.

## Confirm a setting

Check these in order:

1. The Profile checkmark and Home name have moved to the intended Profile.
2. The Outbound Mode indicator is on the intended mode.
3. The intended node is selected inside the intended policy group.
4. Make sure the target app establishes a **new connection**, then inspect its
   matched rule and proxy chain in Connections.

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
