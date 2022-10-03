const config = {
    globals: {
        'ts-jest': {
            tsconfig: '../../tsconfig.test.json',
        },
    },
    moduleFileExtensions: ['ts', 'js'],
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: ['./node_modules/'],
    transform: {
        '^.+\\.ts$': ['ts-jest'],
    },
    verbose: false,
    collectCoverageFrom: [
        "src/**/*.ts",
    ],
    coveragePathIgnorePatterns: [
        "<rootDir>/node_modules",
    ],
    coverageReporters: [
        "json",
        "lcov",
        "text",
    ],
    coverageThreshold: {
        global: {
            "branches": 100,
            "functions": 100,
            "lines": 100,
            "statements": 100,
        },
    },
}

module.exports = config
