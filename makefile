source-files := $(shell find src -name "*.js" -not -name "*.test.js")
test-files := $(shell find src -name "*.test.js")

all: dist/lk-test.cjs.js dist/lk-test.esm.js
.PHONY: all

dist/lk-test.cjs.js dist/lk-test.esm.js: $(source-files) yarn.lock
	rm -rf dist
	node_modules/.bin/rollup -c