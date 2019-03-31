const zemil = require('../lib/index');

const temp = Array.from({ length: 36 }, (_, i) => i.toString(36).toLowerCase());
const twoSymbolsCombs = [temp.slice(10), temp].reduce((a, b) =>
    a.reduce((r, v) => r.concat(b.map(w => v + w)), [])
);

console.log(twoSymbolsCombs.length);
const keys = twoSymbolsCombs.slice(880, 935);
// https://github.com/join
const fullUri = key => `https://github.com/signup_check/username`;

zemil({ keys, uriCreator: fullUri, delay: 2100 });
