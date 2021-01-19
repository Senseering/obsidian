cat logo/logo.svg | node src/index.js immut -d

cat logo/logo.svg  | node src/index.js audit -d ac37ffed065a8205b8cc534bd6e43a342ec62f5dc45566658a9f157f3e77c301

sha512sum logo/logo.svg | cut -d " " -f 1 | node src/index.js immut

sha512sum logo/logo.svg | cut -d " " -f 1 | node src/index.js audit 5fb06032729a56ada783dfda31ad9abd8b5cdc3a4d0bddfc8e079b173e5a840d