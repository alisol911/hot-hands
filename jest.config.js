module.exports = {
    "roots": [
        "<rootDir>/client"
    ],
    "transform": {
        "^.+\\.(ts|tsx)$": "ts-jest",
        "^.+\\.(css|less|scss|styl)$": "<rootDir>/client/framework/transforms/css.js",
        "^.+\\.(svg)$": "<rootDir>/client/framework/transforms/img.js"
    },
    "moduleNameMapper": {
        "^image![a-zA-Z0-9$_-]+$": "GlobalImageStub",
        "^[./a-zA-Z0-9$_-]+\\.png$": "RelativeImageStub"
    },
    "setupFilesAfterEnv": [
        "<rootDir>/client/framework/setup/enzyme.ts",
        "<rootDir>/client/framework/setup/fetch.ts"
    ],
    "automock": false,
    "testRegex": "(/(__tests__|__spec__)/.*|\\.(test|spec))\\.(ts|tsx)$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "json",
        "node"
    ],
    "snapshotSerializers": ["enzyme-to-json/serializer"],
    "globals": {
        "window": true
    }
}
