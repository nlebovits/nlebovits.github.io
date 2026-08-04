---
layout: post.njk
title: "Integer Slack: Claudese as Extractive Contribution"
date: 2026-08-04
tags: ["writing", "ai"]
---

*TL;DR, Prose outputs from Opus and Fable ("Claudese") suggest that the models are being optimized for programming ability, not human communication. This is a kind of extractive contribution, transfering the cognitive burden from agents to humans, who must scrutinize Claudese in order to keep pace with agentic development. If frontier models are going to keep being optimized for programming skills, we may need to develop tooling—analogous to high-level languages—that exists solely to translate these "optimized" outputs for human users.*

<br>

Over the past several updates, Opus has become harder and harder to understand. I'm not just talking about the annoying tics of AI writing ("It's not X, it's Y" or "load-bearing" or that kind of thing), but about a more pervasive tendency to write prose that is so dense and hermetic as to be unintelligible. As one commenter put it in [a recent Reddit thread](https://www.reddit.com/r/claude/comments/1va2cgr/the_campaign_to_make_claude_speak_like_a_human/), "I've been a software engineer for fifteen years and Opus 5 writes whole paragraphs that I can't understand at all."

## Part I: Colorless green Claudes sleep furiously

The issue at stake here is *not* one of style. I want to be very clear about that. I'm not complaining about the perceived ugliness/genericness/tackiness of AI writing generally. Instead, I want to make a point specifically about the _intelligibility_ of Opus' output.

In my eyes, the primary issue with this new [Claudese](https://benn.substack.com/p/the-frontier-fails-the-turing-test) is that, while it's quite competent in approximating technically correct syntax and diction, *it literally makes no sense.*^[One is reminded of Chomsky's phrase, ["Colorless green ideas sleep furiously"](https://en.wikipedia.org/wiki/Colorless_green_ideas_sleep_furiously)—meant as an example of a grammatically correct yet semantically nonsensical sentence.] Here's an example from a recent PR that Opus drafted for me:

> q23 grades at strict tolerance despite reporting hectares. Integer slack would apply to the field_id column—adjacent plots carry adjacent ids. This would credit an answer naming the wrong farm. Do not apply that slack.

What the hell does that _mean_? The only thing this message is trying to say is that `field_id` is of integer type but actually represents a unique ID, so applying a tolerance threshold of ±1 when grading answers would incorrectly give credit for naming the wrong field. There's nothing complicated in that, and yet Opus has found it necessary to use the phrase "integer slack" to describe the concept—a coinage worthy of high modernist poetry, to be sure, but an utterly bizarre and needlessly difficult way to describe such a simple issue.

"Integer slack" is not merely another example of [Claude's habitual clichés](https://www.linkandth.ink/p/catalog-of-claude-cliches). Instead, it hints at a deeper structural problem with Claude's output: it is no longer optimized for human beings.

I don't think it's an accident that Claude has gotten progressively harder to understand at the same time as it's gotten better and better at writing code. In fact, I suspect that what makes it so good at writing code is exactly what makes it bad at talking to humans, namely, that it is increasingly being optimized to talk to codebases and other agents. As Benn Stancil explains:

> For both sensible economic reasons—it makes, like, [a zillion dollars](https://www.nytimes.com/2026/05/29/business/dealbook/anthropic-ai-openai.html)—and audacious, [sci-fi](https://benn.substack.com/i/184785771/takeoff) ones—it is the [path to superintelligence](https://www.anthropic.com/institute/recursive-self-improvement) and a global utopia—Anthropic has focused on making Claude a good software engineer. It's worked, but as it's gotten better at talking to computers, it's lost track of the weights that helped it talk to people. It has become a strange technical genius, capable of solving [any math problem](https://openai.com/index/model-disproves-discrete-geometry-conjecture/) or [hacking into any computer](https://www.reuters.com/business/anthropics-mythos-model-found-vulnerabilities-classified-us-government-systems-2026-06-24/), but incapable of speaking clearly about what it did.

It is almost as if (forgive my anthropomorphizing) Claude is developing a dialect aimed at engineering prowess and predicated on the fact that its primary interlocutors are not people, but codebases and other agents. And, as in any dialect, this entails the emergence of non-standard usage and jargon that are more or less opaque to outsiders (just try asking non-Philadelphians to guess [the meaning of the word "jawn"](https://www.youtube.com/watch?v=eJng9yzbLi8)).

For Claude, the primary benefit of Claudese is likely efficiency. Evidently, speaking like this works *better* for Claude when interacting with other Claude agents. The problem is that it works *much worse* when speaking to human users. Because Claude's output has all the hallmarks of competent prose, but is rife with non-standard usages and invented turns of phrase, a human user ends up desperately, repeatedly scrutinizing the prose to suss out its meaning, as if she were reading the poetry of John Ashbery and not the output of a coding assistant.

Some users evidently see this as a sign that the models are now "too smart" for us, that Claudese hides profundities beyond our mortal comprehension,

> that it is the language of peak general intelligence. It is not hollow; we just can't keep up. It is explaining itself using prime numbers, and we are [but rats](https://benn.substack.com/p/the-truth-is-out-there#:~:text=A%20rat%20can,prime%20number%20maze%3F).

Alas, it is not so. While Claude has been tallying remarkable wins in many domains, this issue of intelligibility is *not* a problem of a hypertrophied intelligence, but rather a basic failure of communication. This is obvious if you simply paste Opus' abstruse output into Haiku and ask for a translation. Here, for instance, is Haiku's rendering of the earlier message about `field_id`:

> What it meant was, "Do not allow any tolerance on field_id even though it's an integer. If the correct answer names field 100 and you name field 101, that's wrong. Adjacent plot ids are adjacent by design—allowing 'close enough' would credit naming the wrong farm entirely."

So we're clearly not talking about big-brain genius-level complexity here—and yet Opus originally rendered that explanation in prose so recondite it would be at home in [a Judith Butler tome](https://newrepublic.com/article/150687/professor-parody).

The other issue with Claude's new output is that it's _long._ Two or three sentences of Claudese are decipherable on their own. But Opus seems to grow more long-winded by the week. Several times a day now, I find myself staring at my terminal with dread as Opus pumps a Biblical deluge worth of Claudese onto my screen. In fact, I feel that I now spend at least as much of my work time trying to understand Opus and Fable outputs as I spend actually shipping code.

## Part II: Extractive contributions

I maintain a couple of open-source projects in the geospatial world. Probably 99% of our code is now written by agents, which allows us to move much faster than we ever could have in the "olden days." If before our team might have opened three or four tickets and PRs total in one day, now it's not unusual for me to wake up to 10+ new tickets and a four or five PRs, all of them Claude-ed. On the whole, I feel like we do a good job keeping code quality high through a number of checks in CI and elsewhere. But lately, I find myself struggling to keep up with the cognitive load imposed by Claudese at this pace of development.

Here's the first sentence of a ticket recently opened by an Opus agent on one of our repos:

> `_add_bands_section` reads two pre-STAC-1.1.0 summary keys that nothing writes, so the lookup always returns empty and the Bands section is silently omitted for every raster collection.

This is exemplary Claudese: dense, syntactically strange, and just hard to parse. Here's the same sentence rewritten by GPT 5.5:

> The `_add_bands_section` function looks for band metadata in the deprecated pre-STAC 1.1.0 collection summary fields (`eo:bands` and `raster:bands`). However, nothing in the codebase populates those fields, so the lookup always returns an empty list. As a result, the **Bands** section is silently omitted from the generated README for every raster collection.

Ah! That's actually pretty straightforward. But understanding it required real effort: first the frustration of trying to parse the Claudese, then the time and context-switching of copying the message into ChatGPT to make sense of it. And that's just one sentence; multiplied over the entire body of a ticket or a PR, and then again across ten tickets or PRs in a day, and then _again_ every single day, this begins to feel like a huge effort to understand Claude's contributions, regardless of how high-quality they may be.

If you've worked in open source before, this dynamic may sound familiar. Every so often, projects get contributors who add little or nothing to the project, but make serious demands on the maintainers by way of frivolous tickets, non sequiturs in the Slack channel, etc. These contributors may occasionally "contribute," but the net cost of the maintainers is negative. Nadia Eghbal's excellent [_Working in Public_](https://press.stripe.com/working-in-public) refers to these as _extractive contributions_:

> When attention is being appropriated, producers need to weigh the costs and benefits of the transaction. To assess whether the appropriation of attention is net-positive, it's useful to distinguish between extractive and non-extractive contributions. Extractive contributions are those where the marginal cost of reviewing and merging that contribution is greater than the marginal benefit to the project's producers. In the case of a code contribution, it might be a pull request that's too complex or unwieldy to review, given the potential upside.

What's strange with agent contributions here is that, in spite of how much they accelerate development, they can _still_ be extractive if the effort to parse the ticket and/or PR exceeds the value of the PR itself. This is even more true in the aggregate; an occasional Claudese PR message may be acceptable, but if _every_ message requires exegesis, that's a recipe for cognitive burnout.

Beyond tickets and PRs, too, Claude's output in the CLI is just as bad. Scoping a feature in plan mode invariably ends in a wall of text so long that even Tolstoy would have cut it down. Yes, maybe using a better code editor or something would help mitigate the infoglut a little bit, but it's not just the volume—it's the difficulty of parsing even a single sentence of Opus' output, multiplied over many lines of text, itself multiplied over all of your PRs, tickets, docs, etc.

Effectively, this represents an offloading of cognitive demands from the model to the human user. Claudese enables serious efficiency gains in model performance, but the user is then made to pay the cost on the back end, as they spend more and more of their time trying to decipher what Opus is saying. While it's become axiomatic to say that [understanding is the new bottleneck](https://www.youtube.com/watch?v=WkBPX-oDMnA), there's something bitterly ironic in a dynamic that simultaneously bloats your codebase while actively making it harder to understand what's *in* that codebase, even when explicitly asked. It should be obvious that agents are built to serve humans, not the other way around. Optimizing agents for engineering performance is great, but if it comes at the expense of their human users' ability to actually understand what they're building, what is the point?

## Part III: high-level and low-level Claudese

Over the past several months, I've tried all kinds of fixes to make Claude speak clearly: updating my CLAUDE.md, adding hooks, claude-mem, caveman, etc. None of it has stuck for more than a message or two, and even saying explicitly to Claude, "speak clearly" just results in Claudese in shorter sentences, not greater clarity. The only thing that _has_ worked is stupid: I paste Opus' output into Haiku and ask for a translation. While this  unfortunately suggests that Claudese is innate to Opus, it also points to a potential solution.

It's common now to compare AI to a compiler. As [Damien Garros has written](https://opsmill.com/blog/ai-new-compiler/),

> Compilers freed us from worrying about registers and memory addresses. Now AI, acting as a new compiler layer, is freeing us from worrying about syntax, algorithms, and implementation details. … It's the same fundamental concept that's driven programming for decades: raise the level of abstraction so humans can work at the level of intent rather than implementation.

In this metaphor, it's taken for granted that natural language for humans is the "high-level" abstraction that allows users to interact with agents, the same way that Python makes it easy to program without knowing web assembly. But the recent trajectory of Claude suggests that optimizing agents to be great programmers might be incompatible with optimizing them to communicate with humans. If that's the case, Claudese is not truly a high-level language, but a kind of emergent intermediate. Garros suggests:

> The more likely future is that programming languages persist, but evolve away from human readability. Today's languages were optimized for humans to read and write. Tomorrow's may be optimized for AI agents to generate and compilers to consume, prioritizing fast compilation, portability, and performance over legibility.

If Claudese is some strange early version of languages optimized for agents, then we need to rethink the compiler analogy. Instead of trying to optimize a model for both programming and human communication, what if we borrowed an existing framework from computer science and had the equivalent of low-level and high-level agents? Adding a second agent (e.g., Haiku) devoted to "translating" the complex outputs of the implementation agent (e.g., Opus) would give us the best of both worlds: frontier models that could continue to optimize for performance, regardless of intelligibility, and cheap, lightweight translation models whose primary role it is to faithfully and clearly communicate the output of the implementation agent in a way that empowers the human user to build understanding and make decisions, rather than waste mental energy trying to parse Opus' tortured prose. This could be implemented directly in the CLI and—because Haiku is cheap and would only need the most recent Opus message as its input—the gains in usability would be more than worth the marginal increases in cost and latency.

<br>

We are in the strange early days of figuring out what it means to work with agents, and companies like Anthropic are building the car while driving it, so I understand that model advancements are basically just a pendulum swing of corrections and counter-corrections right now. That said, I do feel like we've reached a pivotal moment here where Opus and Fable are enormously powerful but increasingly frustrating to use precisely because of how they're being optimized. Anthropic has been good about addressing UX issues like this (e.g., the recent `auto` mode, which has finally eliminated the need to babysit models, or native worktree and subagent orchestration in the Claude Code CLI), so I'm hopeful that they'll figure something out.
