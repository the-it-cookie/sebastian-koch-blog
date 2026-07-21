---
title: 'Building an auditable double opt-in log in CIJ'
description: 'Why CIJ''s built-in consent state is not enough for GDPR Article 7 proof, and how to build an append-only double opt-in log with a custom table, a plugin, and a flow.'
pubDate: 2026-08-07
tags: ['Customer Insights - Journeys', 'Consent', 'GDPR', 'Dataverse', 'Power Automate']
draft: true
---

<!--
  Part 3 of 3 in the DOI/consent series. Full text to be supplied separately.
  Outline below reflects the source notes in feedback/Blog_Themen_CIJ.md (Tier 1, item 5).
  Keep all examples generic — no client names, no real GUIDs, no internal
  field/plugin/table names (e.g. no co_ prefixes; use a generic name such as
  "Consent Log" for the custom table).
-->

## What CIJ stores out of the box, and what GDPR Article 7 actually requires

The gap between "current consent state" and "proof of when, how, and via
which channel consent was given."

## Designing an append-only log table

One row per confirmed purpose/topic, with timestamp, source, and a lookup to
the purpose/topic and the form submission that triggered it.

## Binding consent to email, not to the contact record

Why the log keys off the email address (matched against the source system)
rather than the contact ID, and what that solves.

## The sources that feed the log

- Purchase flow
- "My data" self-service page
- Website form (captured via a generic remark/script field)
- Registration (needs a configurable form ID)
- Email address change

## Handling email address changes

A plugin on contact update (post-operation) detects the change via the
pre-image, triggers a cloud flow over HTTP, and moves consent to a fresh DOI
cycle with a 48-72h confirmation window.

## The consent string format

A compact `Purpose=<name>|Topic=<name>` format, where an empty topic means
purpose-level consent only.

## Surfacing the log on the contact record

A read-only subgrid so support and compliance can see the audit trail without
leaving the contact form.
