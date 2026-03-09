---
layout: post.njk
title: "Introducing geoparquet-io"
date: 2026-03-03
tags: ["writing", "geospatial", "open source"]
---

Chris Holmes and I have been building [`geoparquet-io`](https://geoparquet.io/), an opinionated command-line tool for converting, validating, and optimizing GeoParquet files.

`geoparquet-io` is written in Python and uses DuckDB (with GDAL embedded for legacy format support), PyArrow, and `obstore` for fast operations on larger-than-memory datasets. By default, it enforces best practices: `bbox` columns, Hilbert ordering, ZSTD compression, and smart row group sizes.

The tool enables seamless conversion from legacy formats like Shapefiles, GeoJSON, and GeoPackages to optimized GeoParquet, with significant performance improvements of 10–100x for compression, I/O, and spatial queries. It also supports cloud-native workflows with direct integration for S3, GCS, and Azure storage.

`geoparquet-io` is now out in a v1-beta release. We're seeking early adopters for testing and feedback.

**Read the full post:** [Introducing `geoparquet-io` on the Cloud-Native Geospatial Forum](https://cloudnativegeo.org/blog/2026/03/introducing-geoparquet-io/)
