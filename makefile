OUTPUT=lib
SRC=src
NPM=npm
MAKE=make

build: 
	rm -rf $(OUTPUT)
	$(NPM) run build-by-makefile
	cp -rf $(SRC)/markdeck $(OUTPUT)

upgrade: build
	$(NPM) rm -g @amazingandyyy/markdeck
	$(NPM) i -g
	deck --version

serve:
	$(NPM) run serve

deploy: bump build
	$(NPM) publish --access=public
	# $(MAKE) -C demo update
	# git add .
	# git commit -m "deployed and update demo"
	# git push origin master
	$(NPM) i -g @amazingandyyy/markdeck@latest
	deck --version

bump:
	git add .
	git commit -m "tend to deploy"
	$(NPM) version patch

.PHONY: build serve deploy bump
