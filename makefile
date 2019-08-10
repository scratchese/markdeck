OUTPUT=lib
SRC=src
NPM=npm

build: 
	rm -rf $(OUTPUT)
	$(NPM) run build-by-makefile
	cp -rf $(SRC)/markdeck $(OUTPUT)

install-local: build
	$(NPM) rm -g markdeck && $(NPM) i -g

serve:
	$(NPM) run serve

deploy: bump build
	$(NPM) publish --access=public
	cd demo
	npm update
	npm run deck-export
	cd ..
	git add .
	git commit -m "deployed and update demo"
	git push origin master

bump:
	git add .
	git commit -m "tend to deploy"
	$(NPM) version patch

.PHONY: build serve deploy bump
