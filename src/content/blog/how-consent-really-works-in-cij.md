---
title: 'How consent really works in Customer Insights - Journeys'
description: 'The foundations of consent in CIJ: compliance profiles, purposes and topics, and the architecture decision between modeling something as a purpose or as a topic.'
pubDate: 2026-07-24
tags: ['Customer Insights - Journeys', 'Consent', 'GDPR', 'Power Platform']
draft: true
---

<!--
  Part 1 of 3 in the DOI/consent series. Full text to be supplied separately.
  Outline below reflects the source notes in Blog_Themen_CIJ.md (Tier 1, item 2)
  plus general foundations. Keep all examples generic — no client names, no real
  GUIDs, no internal field/plugin names.
-->

## Compliance profiles: the container for consent

What a compliance profile is, and how it groups everything below it.

## Purposes vs. topics: what is the difference

Definitions, with a generic example of each.

## The architecture decision: purpose or topic?

Why this looks like a modeling detail but is actually a business decision. Core
argument: a purpose is shareable across business units, a topic is not.

## Why this decision is hard to undo later

What breaks if you model something as a topic and later need it to behave like
a purpose (or vice versa).

## A generic worked example

Walk a fictional two-business-unit organization through the decision.
