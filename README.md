# LUBYCON FRONTEND Development
git - https://Dart_@bitbucket.org/Dart_/lubycon-web-app-front.git

## Cloning

**1. use bash shell or window command**
```
#!git

git clone https://Dart_@bitbucket.org/Dart_/lubycon-web-app-front-git
```
**2. or use source tree**


## Installation
if you have problem about permission denied, you have to use 'sudo' command.

**1. global install node.js**

```

1. www.nodejs.org
2. select LTS version
```


**2. global install bower**(component or plugin manage tool)

```

npm install -g bower

if you have permission denied...
sudo npm install -g bower
```



**3. gloabal install gulp**(build tool)

```

npm install -g gulp-cli

if you have permission denied...
sudo npm install -g gulp-cli
```


## Setting
**----- Use terminal or cmd(window) -----**

**1. check your location**

```

linux, unix : pwd
win : chdir
```

**2. change directory to your local repasitory**

```

example...

cd application/mamp-5.5.28-0/apache2/htdocs/lubycon-web-app-front
```

**3. install local npm and bower**

- npm and bower will install pakages in pakage.json and bower.json to your local directory.


```

npm install
...
bower install
```



## 실행

**running virtual server**

```

gulp serve
```

**build**

```

gulp build
```


## Credit

**Evan Moon lubycon.co**
**2016.07.31**