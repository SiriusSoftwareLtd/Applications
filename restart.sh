# pull from github
git pull
# make sure libs are up-to-date
pnpm install --frozen-lockfile 
# build App
npm run build
# restart the service in pm2 so updates
pm2 restart "Jobs"
