BUILD=lib
SRC=src
NPM=npm

build: 
	rm -rf $(BUILD)
	$(NPM) run build
	cp -rf $(SRC)/templates $(BUILD)

install-local: build
	$(NPM) rm -g markdeck && $(NPM) i -g

serve:
	$(NPM) run serve

deploy:
	$(NPM) run build
	$(NPM) publish --access=public
