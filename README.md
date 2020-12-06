# GitHub Badge app
## Install
```
docker build -t drzamich/github-badge .
```
## Run
Interactive mode
```
docker run -it -p 3000:3000 drzamich/github-badge
```

Detached mode
```
docker run -d -p 3000:3000 drzamich/github-badge
```
## Test
```
docker run -it drzamich/github-badge test:ci
```
