---
title: 'Prefilling consent in CIJ real-time marketing forms, and the traps nobody warns you about'
description: 'Practical patterns and pitfalls for prefilling consent and email fields in CIJ real-time marketing forms using the d365mkt-afterformload event.'
pubDate: 2026-07-31
accentWord: 'nobody'
difficulty: 'medium'
tags: ['Customer Insights - Journeys', 'Consent', 'JavaScript', 'Power Platform']
draft: true
---

<!--
  Part 2 of 3 in the DOI/consent series. Full text to be supplied separately.
  Outline below reflects the source notes in feedback/Blog_Themen_CIJ.md (Tier 1, item 1).
  Keep all examples generic — no client names, no real GUIDs, no internal
  field/plugin names (e.g. no co_ prefixes).
-->

## The `d365mkt-afterformload` event

What it is, when it fires, and why it is the right hook for prefilling.

## Reading existing consent state into hidden fields

Pulling historical purpose/topic decisions into the form before the visitor
sees it.

## Trap: `data-topicid="undefined"` as a string

Why a missing ID does not fail the way you expect, and how to guard for it.

## Trap: matching purpose vs. topic

Where prefill logic silently matches the wrong kind of consent record.

## Trap: `event.target` vs. the parent container

Registration forms and purchase-flow forms expose the data differently — one
reads from `event.target`, the other from the parent container.

## Trap: guarding against empty `{}` / `[]` responses

Defensive checks before iterating over a consent payload that might be empty.

## Trap: `checked` via `setAttribute` is not enough

Why the checkbox looks right visually but the form still submits unchecked,
and which events need to fire alongside it.

## Putting it together: a safe prefill pattern

A consolidated, generic snippet combining the guards above.
