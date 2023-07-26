---
title: "GSoC'23 Improving CI & Simplifying PyBaMM Installation (Week 5 &6)"
datePublished: Wed Jul 19 2023 12:18:49 GMT+0000 (Coordinated Universal Time)
cuid: clk9owsta000x09lc2urt5qrh
slug: gsoc23-pybamm-week-5-6
canonical: https://arjxnpy.hashnode.dev/gsoc23-pybamm-week-5-6
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1689765803897/6a5ff273-30cd-4254-810f-4b74d086b016.png

---

Hey everyone, welcome to my third blog.

In this blog, I will share the progress for weeks 5 & 6 for my contribution to Improving CI & Simplifying PyBaMM Installation as a part of Google Summer of Code 2023.

# Week 5

## Making optional dependencies for PyBaMM

By the end of week 4, the migration process from tox to nox was nearly complete, marking an important milestone. With that accomplished, the focus shifted towards providing PyBaMM with support for optional dependencies. To begin this task, I thoroughly examined the current dependency tree of PyBaMM and compiled a list of dependencies that could be made optional. The guidance and assistance from my mentors and project maintainers proved invaluable as they helped me navigate the intricacies of making dependencies optional. Their expertise and insights provided a clear direction on how to approach and implement this aspect of the project, ensuring that PyBaMM would offer users the flexibility to choose and install additional dependencies as needed.

* Old Dependency Tree of PyBaMM :
    

```bash
pybamm==23.5
├── anytree [required: >=2.4.3, installed: 2.8.0]
│   └── six [required: >=1.9.0, installed: 1.16.0]
├── autograd [required: >=1.2, installed: 1.5]
│   ├── future [required: >=0.15.2, installed: 0.18.3]
│   └── numpy [required: >=1.12, installed: 1.24.2]
├── bpx [required: Any, installed: 0.3.0]
│   ├── pydantic [required: Any, installed: 1.10.5]
│   │   └── typing-extensions [required: >=4.2.0, installed: 4.5.0]
│   └── pyparsing [required: Any, installed: 3.0.9]
├── casadi [required: >=3.6.0, installed: 3.6.3]
│   └── numpy [required: Any, installed: 1.24.2]
├── imageio [required: >=2.9.0, installed: 2.26.0]
│   ├── numpy [required: Any, installed: 1.24.2]
│   └── pillow [required: >=8.3.2, installed: 9.4.0]
├── importlib-metadata [required: Any, installed: 6.0.0]
│   └── zipp [required: >=0.5, installed: 3.15.0]
├── matplotlib [required: >=2.0, installed: 3.7.1]
│   ├── contourpy [required: >=1.0.1, installed: 1.0.7]
│   │   └── numpy [required: >=1.16, installed: 1.24.2]
│   ├── cycler [required: >=0.10, installed: 0.11.0]
│   ├── fonttools [required: >=4.22.0, installed: 4.39.0]
│   ├── importlib-resources [required: >=3.2.0, installed: 5.12.0]
│   │   └── zipp [required: >=3.1.0, installed: 3.15.0]
│   ├── kiwisolver [required: >=1.0.1, installed: 1.4.4]
│   ├── numpy [required: >=1.20, installed: 1.24.2]
│   ├── packaging [required: >=20.0, installed: 23.0]
│   ├── pillow [required: >=6.2.0, installed: 9.4.0]
│   ├── pyparsing [required: >=2.3.1, installed: 3.0.9]
│   └── python-dateutil [required: >=2.7, installed: 2.8.2]
│       └── six [required: >=1.5, installed: 1.16.0]
├── numpy [required: >=1.16, installed: 1.24.2]
├── pandas [required: >=0.24, installed: 1.5.3]
│   ├── numpy [required: >=1.20.3, installed: 1.24.2]
│   ├── python-dateutil [required: >=2.8.1, installed: 2.8.2]
│   │   └── six [required: >=1.5, installed: 1.16.0]
│   └── pytz [required: >=2020.1, installed: 2022.7.1]
├── pybtex [required: >=0.24.0, installed: 0.24.0]
│   ├── latexcodec [required: >=1.0.4, installed: 2.0.1]
│   │   └── six [required: >=1.4.1, installed: 1.16.0]
│   ├── PyYAML [required: >=3.01, installed: 6.0]
│   └── six [required: Any, installed: 1.16.0]
├── scikit-fem [required: >=0.2.0, installed: 8.0.0]
│   ├── numpy [required: Any, installed: 1.24.2]
│   └── scipy [required: Any, installed: 1.10.1]
│       └── numpy [required: >=1.19.5,<1.27.0, installed: 1.24.2]
├── scipy [required: >=1.3, installed: 1.10.1]
│   └── numpy [required: >=1.19.5,<1.27.0, installed: 1.24.2]
├── sympy [required: >=1.8, installed: 1.11.1]
│   └── mpmath [required: >=0.19, installed: 1.3.0]
├── tqdm [required: Any, installed: 4.65.0]
└── xarray [required: Any, installed: 2023.4.2]
    ├── numpy [required: >=1.21, installed: 1.24.2]
    ├── packaging [required: >=21.3, installed: 23.0]
    └── pandas [required: >=1.4, installed: 1.5.3]
        ├── numpy [required: >=1.20.3, installed: 1.24.2]
        ├── python-dateutil [required: >=2.8.1, installed: 2.8.2]
        │   └── six [required: >=1.5, installed: 1.16.0]
        └── pytz [required: >=2020.1, installed: 2022.7.1]
```

In the initial phase, a decision was made to designate only casadi, numpy, pandas, scipy, and xarray as required dependencies for PyBaMM. All other dependencies were intended to be optional. Additionally, it was decided that pandas would also be made optional in future pull requests. To organize these dependencies effectively, I divided them into different groups based on their purpose and usage within PyBaMM. This categorization allowed for a clear distinction between required and optional dependencies, making it easier for users to understand and customize their PyBaMM installation according to their specific needs. The decided groups were :

1. \[docs\]: Have all dependencies required for docs i.e. Sphinx & required extensions
    
2. \[examples\]: had jupyter for example notebooks
    
3. \[plot\]: for graphical visualisation i.e. matplotlib
    
4. \[cite\]: for citing the project i.e. pybtex
    
5. \[latexify\]: For symbolic mathematics.
    
6. \[bpx\]: Battery Parameter eXchange
    
7. \[tqdm\]: For logging loops.
    
8. \[dev\]: Code formatting
    
9. \[all\]: Has all the dependencies
    

New Dependency Tree of PyBaMM with only required dependencies :

```bash
pybamm==23.5
├── casadi [required: >=3.6.0, installed: 3.6.3]
│   └── numpy [required: Any, installed: 1.25.1]
├── numpy [required: >=1.16, installed: 1.25.1]
├── scipy [required: >=1.3, installed: 1.11.1]
│   └── numpy [required: >=1.21.6,<1.28.0, installed: 1.25.1]
└── xarray [required: Any, installed: 2023.7.0]
    ├── numpy [required: >=1.21, installed: 1.25.1]
    ├── packaging [required: >=21.3, installed: 21.3]
    └── pandas [required: >=1.4, installed: 2.0.3]
        ├── numpy [required: >=1.21.0, installed: 1.25.1]
        ├── python-dateutil [required: >=2.8.2, installed: 2.8.2]
        │   └── six [required: >=1.5, installed: 1.16.0]
        ├── pytz [required: >=2020.1, installed: 2023.3]
        └── tzdata [required: >=2022.1, installed: 2023.3]
```

# Week 6

## Improving Nox CI

During Week 6, the primary focus was on enhancing the Nox CI infrastructure. This involved significant improvements, such as incorporating default Nox sessions to streamline and standardize testing procedures. Additionally, a pre-commit session was introduced to automate code formatting, ensuring consistent adherence to style guidelines.

Alongside improving the Nox CI infrastructure, I dedicated efforts to documentation enhancements. I documented additional useful Nox commands, providing developers with a comprehensive reference for various Nox functionalities to boost their productivity. Additionally, I modified the documentation for optional dependencies, creating informative tables for each optional dependency section. These tables offer clear details about the dependencies, their purpose, and installation instructions.

After completing the tasks related to Nox CI and documentation, I recognized the need for refactoring environment variables and Python installations across multiple Nox sessions. These repetitive occurrences prompted me to consolidate them into a single function to improve code readability and maintainability. By creating this function, I could easily call it within each Nox session, effectively reducing code duplication and streamlining the configuration process.