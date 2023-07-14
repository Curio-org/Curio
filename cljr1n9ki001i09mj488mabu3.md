---
title: "GSoC'23 Improving CI & Simplifying PyBaMM Installation  (Week 3 &4)"
datePublished: Thu Jul 06 2023 11:07:42 GMT+0000 (Coordinated Universal Time)
cuid: cljr1n9ki001i09mj488mabu3
slug: gsoc23-pybamm-week-3-4
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1688631638756/9fe7fd95-9949-4f1a-b865-79a989a61da0.png
tags: python, testing, ci-cd, gsoc2023

---

Hi again, hope y'all are doing well :)

In this blog, I will share the progress for weeks 3 & 4 for my contribution to Improving CI & Simplifying PyBaMM Installation as a part of Google Summer of Code 2023.

# Week 3

## [Time for Tox to Nox](https://github.com/pybamm-team/PyBaMM/pull/3005)

With a firm understanding of the migration process from tox to nox, I proceeded to code the noxfile. To ensure a smooth transition, I began by converting the easier sessions, such as unit and integration tests. However, as I progressed, I realized that I couldn't proceed without addressing the conversion of the pybamm-requires session. This particular session was crucial for installing C dependencies and building scikits.odes. Unfortunately, I encountered repeated failures in the CI logs due to this missing conversion. This realization prompted me to prioritize the conversion of the pybamm-requires session to overcome these challenges and ensure the successful execution of the CI pipeline.

![Continuous Integration, Continuous Delivery and Continuous Deployment (CI/CD):  An Overview - Hashnode](https://cdn.hashnode.com/res/hashnode/image/upload/v1590600797408/OVU0J59BY.jpeg?auto=compress,format&format=webp align="center")

### [`pybamm-requires` session](https://github.com/pybamm-team/PyBaMM/blob/develop/noxfile.py#L34)

The `pybamm-requires` session played a vital role in the installation process as it was responsible for installing SuiteSparse and SUNDIALS, building scikits.odes using SUNDIALS, and incorporating pybind11 into the project via Git. Below, I have provided the code snippet representing the session:

```python
@nox.session(name="pybamm-requires", reuse_venv=True)
def run_pybamm_requires(session):
    homedir = os.getenv("HOME")
    session.env["SUNDIALS_INST"] = session.env.get("SUNDIALS_INST", f"{homedir}/.local")
    session.env[
        "LD_LIBRARY_PATH"
    ] = f"{homedir}/.local/lib:{session.env.get('LD_LIBRARY_PATH')}"
    if sys.platform != "win32":
        session.install("wget", "cmake")
        session.run("python", "scripts/install_KLU_Sundials.py")
        if not os.path.exists("./pybind11"):
            session.run(
                "git",
                "clone",
                "https://github.com/pybind/pybind11.git",
                "pybind11/",
                external=True,
            )
    else:
        session.error("nox -s pybamm-requires is only available on Linux & MacOS.")
```

![The Journey to Implement CI/CD in Higher Education Institutions](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYY4PSek7Nt3DS_h__5plZxpmXdWobWl2Yyw&usqp=CAU align="center")

### CI Testing Sessions

The testing sessions in the CI pipeline encompassed various aspects, including [unit](https://github.com/pybamm-team/PyBaMM/blob/develop/noxfile.py#L80) testing, [integration](https://github.com/pybamm-team/PyBaMM/blob/develop/noxfile.py#L65) testing, [coverage](https://github.com/pybamm-team/PyBaMM/blob/develop/noxfile.py#L52) checks, running [examples](https://github.com/pybamm-team/PyBaMM/blob/develop/noxfile.py#L90), executing [doctests](https://github.com/pybamm-team/PyBaMM/blob/develop/noxfile.py#L74), and combined unit and integration tests. I followed an iterative approach to convert and implement each session, ensuring that they functioned as expected through local testing.

Furthermore, these sessions incorporated OS handling to cater to specific dependencies required on certain operating systems, such as Linux, while avoiding the installation of certain dependencies on others, such as Windows. This approach ensured that the CI process was tailored to different environments and maintained consistent behavior across different operating systems.

![Meme Creator - Funny CI/CD is fast when there are no tests Meme Generator  at MemeCreator.org!](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRewaG5NfVvTAdikMlUeIlxmNSbWDkS-lW3kA&usqp=CAU align="center")

Below, I have provided the code snippet representing the coverage testing session:

```python
@nox.session(name="coverage", reuse_venv=True)
def run_coverage(session):
    homedir = os.getenv("HOME")
    session.env["SUNDIALS_INST"] = session.env.get("SUNDIALS_INST", f"{homedir}/.local")
    session.env[
        "LD_LIBRARY_PATH"
    ] = f"{homedir}/.local/lib:{session.env.get('LD_LIBRARY_PATH')}"
    session.install("coverage")
    session.install("-e", ".")
    if sys.platform != "win32":
        session.install("scikits.odes")
        session.run("pybamm_install_jax")
    session.run("coverage", "run", "--rcfile=.coveragerc", "run-tests.py", "--nosub")
    session.run("coverage", "combine")
    session.run("coverage", "xml")
```

# Week 4

During the weekly call with my mentor, an important issue was highlighted: approximately 60+ tests were being skipped in the unit tests, integration testing, and coverage checks, which was not the desired outcome. To address this issue, I took a closer look into the problem and discovered that the skipping was occurring due to the incomplete build of `scikits.odes`. Determined to resolve this, I refactored the code and attempted to fix the failures encountered during the initial phase of converting to nox. After several attempts, I successfully configured the environment variables correctly, allowing the CI to build `scikits.odes` smoothly. Consequently, the tests that were previously skipped could now be executed as intended, ensuring comprehensive testing coverage for PyBaMM.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1689191011259/9b1d3583-a9ac-4691-9121-bf0abf702049.png align="center")

### [Developer Installation Session (Install from Source)](https://github.com/pybamm-team/PyBaMM/blob/develop/noxfile.py#L96)

The addition of the `dev` session to the noxfile was of utmost importance as it allows for a straightforward PyBaMM developer installation using the command `nox -s dev`. Before its implementation, I meticulously ensured the smooth installation of developer dependencies, carefully configuring the necessary packages. The `dev` session, defined within the noxfile, incorporates the installation of these dependencies using `setup.py` & `session.install()` command with the `"dev"` extras. This session greatly simplifies the setup process for developers, offering a convenient and standardized approach to establishing their PyBaMM development environment and promoting seamless collaboration within the project.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1689191432155/92d46820-e79b-426b-a67c-57d3c89273c3.png align="center")

Below is the code snippet for the dev session:

```python
@nox.session(name="dev", reuse_venv=True)
def set_dev(session):
    homedir = os.getenv("HOME")
    LD_LIBRARY_PATH = f"{homedir}/.local/lib:{session.env.get('LD_LIBRARY_PATH')}"
    envbindir = session.bin
    session.install("-e", ".[dev]")
    session.install("cmake")
    session.run(
        "echo",
        "export",
        f"LD_LIBRARY_PATH={LD_LIBRARY_PATH}",
        ">>",
        f"{envbindir}/activate",
    )
```

### [Concluding migration with Docs Session](https://github.com/pybamm-team/PyBaMM/blob/develop/noxfile.py#L121)

Another important session to incorporate in the noxfile was the `docs` session, which enables the local building of PyBaMM documentation with a single command `nox -s docs`. This session was designed specifically to cater to the requirements of the documentation development process. To ensure efficient execution, I made sure to install only the necessary dependencies for building the documentation, avoiding the installation of unnecessary extras. The `docs` session proved to be immensely helpful during the development of PyBaMM documentation, providing a convenient and focused environment for generating and testing the documentation. Its inclusion in the noxfile further streamlined the documentation workflow and facilitated the production of high-quality documentation for PyBaMM.

Below is the code snippet for the docs session:

```python
@nox.session(name="docs", reuse_venv=True)
def build_docs(session):
    envbindir = session.bin
    session.install("-e", ".[docs]")
    session.chdir("docs/")
    session.run(
        "sphinx-autobuild", "--open-browser", "-qT", ".", f"{envbindir}/../tmp/html"
    )
```

This concludes the work of weeks 3 & 4, For weeks 5 and 6, the primary focus will be on creating optional dependencies for PyBaMM and improving the Nox CI infrastructure.

ThankYou Byee.

![Smile - me about to put the last; to finish my code +2 14 new errors made with mematic](https://i.chzbgr.com/full/9728219904/h6F75242D/person-about-put-last-finish-my-code-2-14-new-errors-made-with-mematic align="left")