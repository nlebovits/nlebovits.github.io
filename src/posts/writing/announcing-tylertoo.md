---
layout: post.njk
title: "Announcing tylertoo (GeoParquet --> PMTiles goes brrr)"
date: 2026-10-12
tags: ["writing", "geospatial", "open source"]
---

Just before [the CNG Forum](https://2026.cloudnativegeo.org/), I cut a v0.8 release of `tylertoo`: a GeoParquet to PMTiles generator in Rust. It's fast (7-10x faster than [`tippecanoe`](https://github.com/felt/tippecanoe)), supports cool stuff like remote reads, streaming, bounded memory, and sharded jobs on multiple machines, has pretty much all the other functionality of `tippecanoe`, and, oh yeah, it's _really fast_. [Check it out!](https://geoparquet-io.github.io/tylertoo/)

## Wait, why not just use `tippecanoe`?

Because `tippecanoe` doesn't support GeoParquet (and [isn't planning to](https://github.com/felt/tippecanoe/issues/193)), which means that generating PMTiles from GeoParquet requires converting to an intermediate temp file (either GeoJSON or Flatgeobuf, which are usually several times larger than the GeoParquet equivalent) and then streaming that into `tippecanoe`. This is annoying and wasteful and slow, and since I'm spending a lot of my time lately building [Portolan](https://www.portolan-sdi.org/) catalogs (which [strongly encourages PMTiles](https://www.portolan-sdi.org/) alongside all GeoParquet files), this started to be a pretty major bottleneck, which is why I built `tylertoo`.

![Oh, look, an AI-generated tiling crab.](https://raw.githubusercontent.com/geoparquet-io/tylertoo/main/docs/assets/logo-full.png)

## Why use `tylertoo`?

Do you like GeoParquet? Do you like not waiting forever while generating your PMTiles? Me, too!

`tylertoo` is a Rust crate, a CLI and a Python package. It supports:

- GeoParquet from local files, folders, globs, file lists, or `s3://`, `gs://` and `https://`, reading only the row groups a `--bbox` or `--filter` needs
- streaming, with bounded-memory profiles and spill-to-disk
- sharded builds across machines, merged back without re-encoding tiles
- most of `tippecanoe`'s generalization tools: drop rates, point clustering, line coalescing, tiny-polygon squares, a tile-size cap, stable feature ids, max-zoom guessing
- `decode`, `merge` and `pyramid`, for going back to GeoParquet and combining archives

Because of these features, `tylertoo` is particularly suited to large workflows; Chris Holmes and Isaac Corley at [Taylor Geospatial](https://taylorgeospatial.org/) have been using it to generate global PMTiles for the latest Fields of the World release, splitting runs across a Slurm cluster. Anecdotally, each year of data (~150 million polygons) takes about an hour, where previous runs took days or never finished. In their other testing (Planet, FIRMS) they've seen roughly 10x speedups, with much less swap: one Planet run needed a terabyte of swap for `tippecanoe` to finish. Here's an example of what the field boundary PMTiles generated with `tylertoo` look like:

<iframe class="map-embed" width="100%" height="450" src="https://pmtiles.io/#url=https://data.source.coop/ftw/global-data-2e/vector/2025/fields-2025.pmtiles&iframe=true&map=1.5/17.4/2" title="Fields of the World 2025 field boundaries in the PMTiles viewer" loading="lazy"></iframe>

Still not convinced? Check out the tutorials ([global boundaries](https://geoparquet-io.github.io/tylertoo/tutorials/madagascar/) and [Brazilian fields](https://geoparquet-io.github.io/tylertoo/tutorials/brazil/)) and try it yourself.

## What's under the hood?

The cool thing with `tylertoo` is that it's actually based on a crude implementation of overviews in GeoParquet, which turns out to be a pretty efficient way of generating PMTiles. Each feature gets a row at every zoom level it shows up in, so that each zoom level is represented by a band of rows -- sorted from coarse to fine -- where the finest level is just the original unsimplified data. From there, writing PMTiles just requires cutting those features into tiles, and then encoding and writing them, with nearly every step parallelized (`tippecanoe`, in contrast, has to decide what to drop and simplify separately for each tile, as it writes it). The approach I've got working right now is fairly hacky and ad hoc, but eventually I'd like to move toward adopting something like [Kanahiro Iguchi's proposed cloud-optimized GeoParquet extension](https://github.com/Kanahiro/cloud-optimized-geoparquet). (I got a chance to hear Kanahiro present about this at the CNG forum last week and was very impressed by how well thought out it is.)

As for the actual tiling algorithms, they're mostly just reimplementations of `tippecanoe`, ported over to Rust courtesy of Claude. CI then checks changes against a pinned `tippecanoe` build on real datasets. For a comparison of `tippecanoe` and `tylertoo`, see [the docs site](https://geoparquet-io.github.io/tylertoo/guides/tippecanoe/).

## Why's it called that?

See [Tippecanoe and Tyler Too](https://en.wikipedia.org/wiki/Tippecanoe_and_Tyler_Too).

## What's next?

`tylertoo` isn't truly prod-ready (in the sense that it's not battle-tested like `tippecanoe`) but that's the goal of the next couple of releases. I want a bunch of new users to check it out, catch bugs, request features, etc. (Take a look at [the repo](https://github.com/geoparquet-io/tylertoo) for some of the existing planned features.)

Beyond that, my eventual goal is to wire `tylertoo` into `geoparquet-io` so that users can generate PMTiles directly from `geoparquet-io` without reliance on `tippecanoe`. This should lead to much faster performance in `geoparquet-io` and just a better UX generally.

## Acknowledgements

A big thanks to the `tippecanoe` maintainers for making an awesome tool with a well-tested codebase. Also to Chris Holmes for being my first real user and pushing a whole bunch of code to get `tylertoo` in working order for the latest releases.
