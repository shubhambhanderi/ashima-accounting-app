yarn run build

cd build
git init .
git add .
git commit -m "build"
git remote add origin https://github.com/dhananiraj/dhananiraj.github.io.git
git push -f origin master