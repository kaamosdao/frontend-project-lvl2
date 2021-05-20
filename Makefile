install:
	npm install
setup:
	 npm install
	 sudo npm link
publish:
	npm publish --dry-run
lint:
	npx eslint .
test:
	npm test
test-coverage:
	npm test -- --coverage --coverageProvider=v8
test-watch:
	npx -n '--experimental-vm-modules' jest --watch
	