---
title: Inbound, listeners, and TUN
description: Hako support boundaries for mihomo inbound, listener, TUN, route, and server fields inside Apple Network Extension.
---

# Inbound, listeners, and TUN

Clash creates a Packet Tunnel through Apple Network Extension. Apple owns the
virtual interface, routes, and lifecycle, so Linux and desktop TUN settings do
not map literally to iOS, macOS, and tvOS.

## What is supported

- iOS, macOS, and tvOS support Packet Tunnel and TUN configuration. Routine use
  does not require a virtual-device name or desktop routing parameters.
- Hako installs platform-appropriate routes and may force, repair, or ignore
  TUN fields that do not apply to Network Extension.
- macOS can expose process name, path, and UID routing metadata. iOS and tvOS
  cannot.

## Three TUN stacks on Apple platforms

On iOS, macOS, and tvOS, Hako supports the gVisor, System, and Mixed TUN stacks
across startup, TCP/UDP/DNS traffic, routing, reconnection, cross-stack
switching, and clean shutdown.

Mixed runtime state is currently confirmed through configuration readback,
switch state, and data-plane behavior; a dedicated runtime stack identifier
will follow in a later Core delivery.

## Not a default product surface

Local ports, `allow-lan`, custom listeners, tunnels, server configurations, and
external controllers can expose services on the device. Core recognition does
not mean a field is appropriate to enable by default. Apple Packet Tunnel also
does not provide Linux `interface-name`, `routing-mark`, iptables, or TPROXY
routing.

<ConfigFieldMatrix category="inbound" />
