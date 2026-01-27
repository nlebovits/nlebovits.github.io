---
layout: post.njk
title: "Predicting Illegal Dumping"
date: 2023-10-19
tags: ["projects", "urban", "prediction", "climate", "public health"]
---

Illegal dumping is a major problem in Philadelphia. Especially in low-income, minority neighborhoods, illegal dumping has a significant impact on quality of life, property values, safety, and public health. My interest in illegal dumping dates back to my AmeriCorps years with the city, and is something I've explored in other contexts, including for [Clean & Green Philly](https://www.cleanandgreenphilly.org/) and in my illegal dumping dashboard built in R with `flexdashboard`.

For one of my assignments in my "Public Policy Analytics" class at Penn, I built two Poisson regression-based predictive models to mitigate selection bias in illegal dumping prediction. I incorporated spatial processes into one of the models and evaluated one using spatial cross validation. However, I found that neither model represented an improvement over traditional kernel density estimate-based hotspot prediction.

**Full Analysis:** [View on RPubs](https://rpubs.com/nlebovits/musa-508-hw-3)
