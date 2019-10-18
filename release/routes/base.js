"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colors = require("colors/safe");
const axios_1 = require("axios");
class default_1 {
    handleError(res, err) {
        console.log(colors.red('Encountered an error, aborting request (500):'));
        console.log(colors.gray(err.stack));
        res.sendStatus(500);
    }
    createMastodonClient() {
        const host = process.env.MASTODON_HOST;
        const authToken = process.env.MASTODON_AUTH_TOKEN;
        const client = axios_1.default.create({});
        client.defaults.baseURL = `${host}/api/v1`;
        client.defaults.headers.common.Authorization = `Bearer ${authToken}`;
        return client;
    }
}
exports.default = default_1;
//# sourceMappingURL=base.js.map