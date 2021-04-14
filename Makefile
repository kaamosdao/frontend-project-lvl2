setup:
	 npm install
	 sudo npm link
publish:
	npm publish --dry-run
lint:
	npx eslint .