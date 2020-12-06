# GitHub Badge app
Simple app displaying GitHub user details.
## See live @ [drzamich.github.io/github-badge](https://drzamich.github.io/github-badge/).
## Features
* Display user details: avatar, name, bio and 3 most-starred repos.
* Fully responsive.
* Full screen-reader support.
* Complete CI workflow: test + lint + build + deploy defined in a single YAML file thanks to [GitHub Actions](https://docs.github.com/en/free-pro-team@latest/actions).
## Technologies used
* React + TypeScript (bootstrapped with [CRA](https://create-react-app.dev/))
* [styled-components](https://styled-components.com/)
* Docker




## Run locally
Using docker to run the app locally is the recommended approach, as it does not matter if you have Node v12 installed on Ubuntu running on an AMD processor or a Windows machine with Node v15 on an Intel. When using Docker you can be sure that you won't run into any config or compatibility issues.
### Install
```
docker build -t drzamich/github-badge .
```
### Run
#### Interactive mode
```
docker run -it -p 3000:3000 drzamich/github-badge
```

#### Detached mode
```
docker run -d -p 3000:3000 drzamich/github-badge
```
### Test
```
docker run -it drzamich/github-badge test:ci
```

### Lint
```
docker run -it drzamich/github-badge eslint
```

### Build
```
docker run -v ${PWD}/build:/usr/src/app/build -it drzamich/github-badge build
```
