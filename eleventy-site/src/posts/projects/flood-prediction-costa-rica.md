---
layout: post.njk
title: "Flood Prediction for Costa Rica"
date: 2023-12-11
tags: ["projects", "flooding", "remote sensing", "google earth engine", "machine learning", "global south"]
---

## Overview

As part of a broader UN-Habitat initiative, I have been developing a methodology to predict urban flooding probabilities using open source remote sensing data and machine learning models in Google Earth Engine. This work will help urban planners in Costa Rica mitigate biodiversity loss due to urban and agricultural expansion.

## Data and Model

This work builds on a UN-Spider workflow that extracts flooding data for a given date, a paper on building a municipal flood index in Costa Rica, and two papers on building deep learning-based flood prediction models in Seoul and Brisbane. Data come via Google Earth Engine and are used to train a random forest model in Google Earth Engine via the Python API.

**Code:** [View on GitHub Gist](https://gist.github.com/nlebovits/224359fc03ccf1cd4c5deb57067a4cec)

## Ongoing Work

Currently, I am working on several related components of this project: incorporating additional climate risks (heat hazard, landslide susceptibility, and drought risk), calculating population exposure and vulnerability, and scaling the workflow using Google Cloud and Compute Engine to allow for processing larger volumes of data faster.
