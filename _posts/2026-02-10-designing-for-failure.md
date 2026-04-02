---
layout: post
title: "Designing for failure"
date: 2026-02-10
tags: [architecture, resilience, distributed-systems]
---

Most engineers design for the happy path. You build the thing, you make it work, you ship it. Failure is an afterthought — something you handle after production has already told you about it.

That's backwards.

## Failure is the default

In a distributed system, the question isn't whether a component will fail. It's when, and whether you're ready. Networks partition. Databases reject connections. Downstream services time out at the worst possible moment. If your system assumes everything works, it will misbehave in ways that are difficult to reproduce and unpleasant to debug.

The shift I had to make — and it took longer than I'd like to admit — was treating failure as a first-class design concern. Not an edge case. Not a future ticket. A primary input to every decision.

## What that looks like in practice

When I'm reviewing an architecture, I now ask: what happens if this call fails? What happens if it fails halfway through? What does the system look like after five minutes of a downstream outage?

That last question is the important one. A system that degrades gracefully under partial failure is usually more valuable than one that's marginally faster under normal conditions.

Concretely, this means:

- **Timeouts everywhere.** No call without a timeout is production-ready.
- **Retries with backoff and jitter.** Naive retries turn an outage into a stampede.
- **Circuit breakers.** Stop hammering a failing service. Give it room to recover.
- **Idempotency.** If you might retry, your operations need to be safe to repeat.
- **Fallbacks.** A stale cache response is usually better than an error.

## The harder part

The technical patterns are well-documented. The harder part is cultural. Teams under deadline pressure cut failure-handling first, because it's invisible when it's working and only visible when something has already gone wrong.

The most effective lever I've found is making failure modes part of the definition of done. Not a separate ticket. Not a "we'll add it later." Part of the acceptance criteria for the feature.

It slows things down slightly at the beginning. It speeds things up significantly later.

## Chaos as a practice

If your system is mature enough, deliberately introduce failure. Chaos engineering isn't about breaking things for the sake of it. It's about finding out whether your failure-handling assumptions are actually true before production finds out for you.

We ran a controlled experiment last year where we introduced latency on a specific internal API. Three teams assumed their code handled it. One of them was right. That's the kind of information worth having early.

---

Designing for failure is uncomfortable. It requires sitting with the reality that the thing you're building will not always work. But that discomfort is where the interesting engineering lives.

Build it to fail well.
