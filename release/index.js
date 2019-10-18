"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("./api");
const port = process.env.PORT || 3200;
api_1.default.listen(port, (err) => {
    if (err)
        return console.log(err);
    return console.log(`API server is listening on ${port}`);
});
//# sourceMappingURL=index.js.map