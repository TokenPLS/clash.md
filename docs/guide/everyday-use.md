---
title: Everyday use
description: Understand Clash Profiles, outbound modes, policy groups, nodes, and active connections, and confirm when a setting is actually used by a new connection.
keywords:
  - Clash everyday use
  - Clash Profile
  - choose Clash node
  - Rule Global Direct
  - Clash active connections
  - Clash setting takes effect
pageClass: clash-everyday-page
jsonLd:
  "@context": https://schema.org
  "@type": FAQPage
  mainEntity:
    - "@type": Question
      name: What is the difference between Rule, Global, and Direct?
      acceptedAnswer:
        "@type": Answer
        text: Rule applies the active Profile to each connection, Global sends traffic to the global policy group, and Direct connects without a proxy.
    - "@type": Question
      name: Why does my route not change immediately after switching a mode or node?
      acceptedAnswer:
        "@type": Answer
        text: Existing connections do not migrate to a new route. They use the new mode or node only after they end or reconnect.
    - "@type": Question
      name: How can I confirm that a new Clash setting is in use?
      acceptedAnswer:
        "@type": Answer
        text: Check the active Profile, outbound mode, and selected node, then make sure a new connection is established and inspect its matched rule and proxy chain in Connections.
---

# Everyday use

The exact controls depend on your device, but the logic behind “which Profile,
mode, and route am I using?” is shared. Understand the layers below, then open
the complete guide for your device when you need exact steps.

## Complete guides by device

<nav class="guide-platform-grid" aria-label="Complete usage guides by device">
  <a href="/guide/ios"><strong>iOS</strong><span>Complete iPhone and iPad guide</span></a>
  <a href="/guide/macos"><strong>macOS</strong><span>Complete Mac guide</span></a>
  <a href="/guide/tvos"><strong>tvOS</strong><span>Complete Apple TV guide</span></a>
</nav>

## The four layers to understand

<nav class="everyday-task-grid" aria-label="Four layers of everyday Clash use">
  <a href="#a-profile-defines-what-is-available"><strong>Profile</strong><span>Nodes, policy groups, rules, and DNS</span></a>
  <a href="#mode-decides-how-to-route"><strong>Outbound mode</strong><span>Rule, Global, and Direct</span></a>
  <a href="#policy-groups-and-nodes-choose-the-route"><strong>Policy groups and nodes</strong><span>From a rule result to a specific route</span></a>
  <a href="#connections-shows-the-real-result"><strong>Connections</strong><span>See where each connection actually went</span></a>
</nav>

### A Profile defines what is available

A Profile is a complete configuration that can contain nodes, policy groups,
rules, DNS, and personal settings. Switching Profiles changes this complete set,
not just one node.

### Mode decides how to route

| Mode | What it does |
|---|---|
| **Rule** | Uses the active Profile to decide whether each connection goes direct, uses a proxy, or is rejected |
| **Global** | Sends traffic to the `GLOBAL` policy group and its selected route |
| **Direct** | Connects without a proxy |

Rule is the usual everyday choice. Different connections can use different
policy groups, so there is no single “current node” that represents all traffic.
Direct does not use a proxy; an empty node screen in Direct is expected.

### Policy groups and nodes choose the route

Rules can send different connections to different policy groups. A policy group
then chooses the node used for that traffic. Latency tests compare response time
on the current network, but lower latency does not guarantee higher throughput
on every network or at every time.

Automatic groups follow health checks in the Profile. Manual groups use the node
you currently select.

### Connections shows the real result

Connections shows active traffic passing through the Tunnel, including its
destination, matched rule, outbound target, proxy chain, and transferred bytes.
For Rule mode, it is more useful than a single exit-IP check when you need to
know which route a specific connection is actually using.

## Confirm a new setting

Do not stop at “I tapped the button.” Follow the state from the interface to
real traffic:

1. **Check the Profile:** the active item and Home name show the intended Profile.
2. **Check the mode:** the Outbound Mode indicator is on the intended mode.
3. **Check the node:** the intended node is selected or shows **In use** in its
   policy group.
4. **Establish a new connection:** a page refresh can still reuse HTTP/2,
   HTTP/3, or QUIC.
5. **Inspect Connections:** confirm the new connection's matched rule, outbound
   target, and proxy chain.

The External IP card on iPhone, iPad, and Mac proves only where that particular
lookup went. In Rule mode, it cannot represent every destination. Apple TV does
not currently provide that card.

## What happens to existing connections?

**Existing connections do not migrate to a new route.** They normally keep the
rule and outbound selected when they were created until they end, are closed,
or reconnect. These client behaviors also apply:

| Action | Existing connections | When they use the new setting |
|---|---|---|
| Switch Profiles on iPhone, iPad, or Mac | Normally ends current active connections | After the app establishes a new connection through the new Profile |
| Switch Profiles on Apple TV | Disconnects the Tunnel and interrupts all connections | The new Tunnel uses the selected Profile |
| Switch between Rule and Direct | The mode change itself does not actively close them | New connections use the new mode; a later runtime-configuration refresh can still end old connections |
| Switch to Global on iPhone, iPad, or Mac | End only when the `GLOBAL` group must also change and the default close-connections setting is enabled | After the app establishes a new connection through the new mode |
| Change a node manually on iPhone, iPad, or Mac | End when the default close-connections setting is enabled | After the app establishes a new connection through the new node |
| Switch a mode or node on Apple TV | Remain on their original route | After they end or reconnect |
| Stop and reconnect the Tunnel | All connections are interrupted | New connections in the new Tunnel use current settings |

The system can continue to show VPN Connected while a download, video,
WebSocket, game, or call reconnects. The reverse is also true: a new mode can be
visible while a long-lived connection continues using its original route.

### UDP, QUIC, and DNS

UDP and QUIC commonly reuse an existing mapping until it times out, closes, or
is created again. DNS can also reuse an existing DoH, DoT, or DoQ transport; a
new DNS query is not always a new DNS connection. These flows may adopt a new
route later than the visible setting.

### Need traffic to use the new setting now?

- On iPhone, iPad, and Mac, close the corresponding old connection or use
  **Close All** in Connections, then make the target app establish a new one.
- Connections on Apple TV is read-only. When every old connection must end,
  stop and reconnect the Tunnel.
- Avoid changing a Profile or the Tunnel during an important download, call,
  game, or playback session.

For exact controls and platform limitations, continue with the
[iPhone and iPad](/guide/ios), [Mac](/guide/macos), or
[Apple TV](/guide/tvos) guide.
