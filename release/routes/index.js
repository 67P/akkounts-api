"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
class IndexRoute extends base_1.default {
    constructor() { super(); }
    static create(router) {
        router.get('/', (req, res) => {
            new IndexRoute().index(req, res);
        });
    }
    index(req, res) {
        res.json({ status: 'OK' });
    }
}
exports.default = IndexRoute;
//# sourceMappingURL=index.js.map