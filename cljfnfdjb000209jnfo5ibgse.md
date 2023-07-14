---
title: "GSoC'23 Improving CI & Simplifying PyBaMM Installation  (Week 1 &2)"
datePublished: Wed Jun 28 2023 11:44:11 GMT+0000 (Coordinated Universal Time)
cuid: cljfnfdjb000209jnfo5ibgse
slug: gsoc23-pybamm-week-1-2
canonical: https://arjxnpy.hashnode.dev/gsoc23-pybamm-week-1-2
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1687943747211/233f1466-f38c-4304-b643-797d374725b5.png
tags: python, gsoc, testing, ci-cd, gsoc2023

---

Hi all, Arjun this side a GSoC student under [NumFocus](https://numfocus.org/) umbrella org for [PyBaMM](https://pybamm.org/) project. As an enthusiastic participant, the first four weeks of this program have been an exhilarating experience, filled with challenges, accomplishments, and invaluable opportunities for personal growth. In this blog post, I will reflect upon my progress during these 2 weeks of GSoC, the lessons learned, and the collaborative spirit that drives this incredible program.

![Best Programming Monitors For Developers 👨🏻‍💻 in 2023 - DEV Community](https://res.cloudinary.com/practicaldev/image/fetch/s--T7rtzNiy--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/etkk913ihaa1tkmgkwq2.gif align="center")

# Week 1

The major objective of the project is to Dockerize [Pybamm](https://pybamm.org/), a battery modeling package. However, before diving into the Dockerization process, it was essential to simplify the installation process and enhance the Continuous Integration (CI) infrastructure. The existing PyBaMM CI relied on Tox 3.28, which presented a learning opportunity for me to learn using [tox](https://tox.wiki/).

## Understanding CI & Tox

During the first week of the project, my focus was on immersing myself in the tox documentation and understanding PyBaMM's existing testing workflows. I dedicated time to thoroughly explore the documentation, familiarizing myself with the intricacies of tox and its role in the project's CI infrastructure. To gain a deeper understanding of the project's CI system, I also analyzed the CI logs. By examining the logs, I could observe the sequence of events, dependencies, and interactions taking place during the CI process. This analysis helped me identify areas that needed improvement and gain insights into how different components were working together.

Armed with this knowledge, I set out to rewrite and extend the CI configuration. I aimed to enhance the existing workflows and ensure they aligned with PyBaMM's specific requirements. This involved modifying the tox configuration file to accommodate the project's testing needs, such as running unit tests, integration tests, and other relevant checks.

## [Adding testing for `pybamm_install_odes`](https://github.com/pybamm-team/PyBaMM/pull/2973)

During this phase, I undertook the responsibility of implementing testing for the `pybamm_install_odes` command, which plays a critical role in seamlessly installing essential dependencies such as `SUNDIALS, Jax` and `scikits.odes`. I conducted iterative testing both on my local environment and within the CI to verify the installation process and ensure its reliability across different platforms. By successfully addressing this issue, working on this particular issue gave me a chance to deepen my understanding of PyBaMM's codebase and its underlying dependencies.

# Week 2

## [Giving a try to Tox4](https://github.com/pybamm-team/PyBaMM/pull/3005)

At the beginning of the second week, with a solid understanding of the CI infrastructure, it was time to focus on migrating the CI system from `tox 3.28` to either `tox 4` or `nox`. Initially, I embarked on the migration process to `tox 4`, aiming to retain tox as our testing tool. However, during the first three days of the migration attempt, I encountered multiple failures that hindered the smooth transition. Consequently, I decided to switch gears and explore the possibility of using `nox` as an alternative testing framework. This change in direction allowed me to adapt and find a more suitable solution for the migration, ensuring a stable and efficient CI environment.

During the remaining two days of the week, I dedicated my efforts to exploring the documentation of nox, an alternative testing framework, and delving into other projects like `pandas` and `scikit-hep/vector` that had already implemented nox as their testing tool. This allowed me to gain valuable insights into the best practices and successful implementation of nox for complex Continuous Integration (CI) systems. By studying these projects, I tried to understand how they leveraged nox to achieve efficient and reliable CI. This research proved to be a solid foundation for implementing nox in PyBaMM, ensuring that I could make informed decisions and apply best practices while migrating the CI system.

The week was over already, In next blog you'll be able to witness the transition from Tox to Nox. So till then, stay tuned. Bye-Bye.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1689189010443/111f7b7e-1d21-40ef-b49f-fcee976e58b6.png align="center")