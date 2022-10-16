NODE_BIN = ./node_modules/.bin

install:
	npm install --force

dev:
	${NODE_BIN}/webpack --mode=development

prod:
	${NODE_BIN}/webpack --mode=production