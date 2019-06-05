source-files := $(shell find src -name "*.js" -not -name "*.test.js")
test-files := $(shell find src -name "*.test.js")

lk-test.cjs.js lk-test.esm.js: $(source-files) yarn.lock
	rm -rf dist
	node_modules/.bin/rollup -c