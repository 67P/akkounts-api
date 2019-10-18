"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const index_1 = require("./routes/index");
const username_lookup_1 = require("./routes/accounts/mastodon/username_lookup");
const invoices_1 = require("./routes/accounts/mastodon/invoices");
const registrations_1 = require("./routes/accounts/mastodon/registrations");
const btcpay_hook_1 = require("./routes/accounts/mastodon/btcpay_hook");
require('dotenv').config();
class API {
    constructor() {
        this.express = express();
        this.config();
        this.routes();
    }
    config() {
        this.express.use(express.json());
        this.express.use(cors());
        this.express.set('etag', false);
    }
    routes() {
        const router = express.Router();
        index_1.default.create(router);
        username_lookup_1.default.create(router);
        invoices_1.default.create(router);
        registrations_1.default.create(router);
        btcpay_hook_1.default.create(router);
        this.express.use('/', router);
    }
}
exports.default = new API().express;
//# sourceMappingURL=api.js.map