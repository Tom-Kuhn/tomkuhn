---
layout: post
title: "Why I still write code"
date: 2026-03-01
tags: [staff-engineer, engineering, craft]
description: "As a staff engineer it's easy to drift away from the code. Here's why I've made a deliberate choice to stay close — and why signal quality matters more than credibility."
---

There's a version of the staff engineer career path where you drift away from the code. You spend your days in design reviews, strategy documents, cross-team alignment meetings. You become a coordinator, a translator, an influencer. The keyboard gathers dust.

I've made a deliberate choice not to let that happen to me.

## The credibility argument

The obvious argument for staying technical is credibility. Engineers trust you more when you've recently shipped something. They're less likely to dismiss your architectural opinion as abstract theory when they've seen you work through a gnarly concurrency bug at 11pm.

That argument is real, but it's not the one I find most compelling.

## The signal argument

The better argument is about signal quality. When I write code — even small things, even experimental things — I stay close to the actual friction in the system. I feel what's awkward. I notice what's confusing. I find the places where the abstractions leak.

That signal is hard to get any other way. Reading code is not the same as writing it. Code review is not the same as writing it. A staff engineer who hasn't written production code in a year is navigating partly on outdated maps.

## What I actually do

I'm realistic about the constraints. I'm not trying to be the most productive individual contributor on the team — that's not the role. But I try to stay close enough that my mental model of the codebase stays honest.

In practice that means:

- Picking up small, well-scoped tickets when the roadmap allows it
- Writing the first version of a new service or library, then handing it off
- Doing enough code review that I understand what patterns are actually appearing, not just what we agreed to in the design doc
- Running the developer experience myself, so I know whether our tooling actually works

The last one matters more than people realise. If you never run the onboarding flow, you don't know it takes 45 minutes and requires three Slack messages to three different people.

## The honest trade-off

Staying technical takes time. That's time not spent on something else. I've had to be deliberate about what I trade it against, and I've had to accept that I won't always get the balance right.

But the alternative — becoming someone who talks about the code without writing it — carries its own costs. Slower feedback loops. Weaker intuitions. Architectural decisions that look reasonable on paper and reveal their problems only in implementation.

I'd rather stay close enough to feel those problems myself.
