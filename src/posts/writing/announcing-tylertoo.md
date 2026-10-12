---
layout: post.njk
title: "Announcing tylertoo"
date: 2026-10-12
tags: ["writing", "geospatial", "open source"]
---

Just before the CNG Forum, I cut a v0.8 release of `tylertoo`: a GeoParquet to PMTiles generator in Rust. It's fast (~7x faster than tipppecanoe), supports cool stuff like remote reads, streaming, bounded memory, and sharded jobs on multiple machines, has pretty much all the other functionality of tippecanoe, and, oh yeah, it's _really fast_. Check it out!

## Wait, why not just use tipppecanoe?

Because tippecanoe doesn't support GeoParquet (and isn't planning to), which means that generating PMTiles from GeoParquet requires converting to an intermediate temp file (either GeoJSON or Flatgeobuf) and then streaming that into tippecanoe. This is wasteful and slow, and since I'm spending a lot of my time lately building Portolan catalogs (which require PMTiles alongside all GeoParquet files), this started to be a pretty major bottleneck, which is why I built `tylertoo`. So if you aren't using GeoParquet, or you are but you don't mind slow performance, you can keep on using tippecanoe.

## Why use tylertoo?

Do you like GeoParquet? Do you like not waiting forever while generating your PMTiles? Me, too! That's why I built tylertoo.

`tylertoo` is a Rust crate, a CLI and a Python package. It supports:

- GeoParquet from local files, folders, globs, file lists, or `s3://`, `gs://` and `https://`, reading only the row groups a `--bbox` or `--filter` needs
- streaming, with bounded-memory profiles and spill-to-disk
- sharded builds across machines, merged back without re-encoding tiles
- most of tippecanoe's generalization tools: drop rates, point clustering, line coalescing, tiny-polygon squares, a tile-size cap, stable feature ids, max-zoom guessing
- `decode`, `merge` and `pyramid`, for going back to GeoParquet and combining archives

Because of these features, `tylertoo` is particularly suited to large workflows; Chris Holmes and Isaac Corley at Taylor Geospatial have been using to to generate global PMTiles for the latest Fields of the World release, splitting across a Slurm cluster. For one example: Brazil's 43.9M field boundaries, read remotely, took 1 h 12 m to convert and 12 m to export on a single 16-core machine, peaking under 10 GiB of RAM.

Still not convinced? Check out the tutorials and try it yourself.

## Why's it called that?

See [insert wiki link].

## What's under the hood?

tippecanoe decides what to drop and simplify separately for each tile, as it writes it. tylertoo does it once per zoom level for the whole dataset, and stores the result as a GeoParquet file. Each zoom level is a band of rows, coarse to fine, and the finest level is your original data, unchanged. Writing PMTiles from that file is then mostly mechanical: cut features into tiles, encode them, write them. Nearly every step runs in parallel.

That intermediate file is useful on its own. You can query it with DuckDB, re-export it with different tile settings, and check it with `tylertoo validate` against a draft spec, `geo:overviews`. It's a working version of GeoParquet overviews. I worked it out alongside Kanahiro's COGP proposal and there's already a compatibility flag. I'm now looking at converging on COGP and contributing upstream.

The tiling algorithms are re-implementations of tippecanoe's, written with a lot of help from Claude, with the tippecanoe source cited throughout. CI checks every change against a pinned tippecanoe build on real datasets. Where tylertoo differs on purpose, the docs say how and why.

Most of the algorithms were deliberately ported from tippecanoe by brute force by pointing Claude at tippecanoe's test fixtures. On top of that, the library takes advantage of the benefits of optimized GeoParquet, e.g., Hilbert sorting and bbox structures for filtering.

The other interesting thing is that the library is essentially generating a crude version of GeoParquet overviews under the hood (an extra, simplified column for each zoom level), which is then used as the basis for generating the PMTiles. I hashed this out before Kanahiro's release of his COGP proposal, but I'm now looking into adopting that and also contributing upstream based on my implementation.

## What's next?

`tylertoo` isn't truly prod-ready -- in the sense that it's not battle-tested like tippecanoe -- but that's the goal of the next couple of releases. I want a bunch of new users to check it out, catch bugs, request features, etc. (Take a look at the repo for some of the existing planned features.)

Beyond that, my eventual goal is to wire `tylertoo` into `geoparquet-io` so that users can generate PMTiles directly from `geoparquet-io` without reliance on tippecanoe. This should lead to much faster performance in geoparquet-io and just a better UX generally.

## Acknowledgements

A big thanks to the tippecanoe maintainers for making an awesome tool with a well-tested codebase. Also to Chris Holmes for being my first real user and pushing a whole bunch of code to get `tylertoo` in working order for the latest releases.
