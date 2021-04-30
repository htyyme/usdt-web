rm -rf index.zip
rm -rf index
npm run build
zip -r index.zip index/
