SHELL = /bin/sh
-include ./.proj.env
export

APPS_PATH := $(realpath ${APPS_DIR})
LIBRARIES_PATH := $(realpath $(LIBRARIES_DIR))
INFRASTRUCTURE_PATH := $(realpath $(INFRASTRUCTURE_DIR))
PACKAGE_MANAGER := "yarn@$(shell yarn -v)"
TEMPLATES_PATH = $(realpath $(TEMPLATES_DIR))

ifeq '$(findstring ;,$(PATH))' ';'
    UNAME := windows
else
    UNAME := linux
endif

#--init: Initialize project. Create directories, prepare yarn, make package.json, push first commit to repo.
init:
	mkdir -p "$(APPS_PATH)"
	mkdir -p "$(LIBRARIES_PATH)"
	rm -rf ./.git
	corepack enable
	corepack prepare yarn@stable --activate
	yarn init -2
	yarn set version stable
	yarn plugin import interactive-tools
	yarn plugin import typescript
	yarn plugin import workspace-tools
	yarn plugin import version
	yarn plugin import https://raw.githubusercontent.com/tophat/yarn-plugin-licenses/master/bundles/@yarnpkg/plugin-licenses-audit.js
	mv ./package.json.template ./package.json
	sed -i "s/NAME/$(subst /,\/,$(WORKSPACE_NAME))/g" ./package.json
	sed -i "s/DESCRIPTION/$(subst /,\/,$(PROJECT_DESCRIPTION))/g"  ./package.json
	sed -i "s/AUTHOR/$(subst /,\/,$(PROJECT_AUTHOR))/g"  ./package.json
	sed -i "s/APPS_PATH/$(subst /,\/,$(APPS_DIR))/g"  ./package.json
	sed -i "s/LIBS_PATH/$(subst /,\/,$(LIBRARIES_DIR))/g"  ./package.json
	echo '# $(WORKSPACE_NAME)' > README.md
	yarn install
	git add .
	git commit -m "start"
	git remote add origin $(PROJECT_REPO)
	git push --set-upstream origin master

#--install: Install packages in root
install:
	yarn install

#--clean_all: Run clean on all apps and libraries
#--build_all: Run build on all apps and libraries
#--test_all: Run test on all apps and libraries
clean_all build_all test_all:
	yarn workspaces run $(subst _all,,$@)

#--build: Install, build all with clean
build: install clean_all build_all
	@echo build complete

#--update.dep: Advance dependency version
update.dep:
ifndef D
	$(error 'Package name(s) needed')
endif
	yarn upgrade $(D)

#--docker.<CONFIG_NAME>.start: Start specified docker compose config
docker.%.start: CONFIG_NAME = $(word 2, $(subst ., ,$@))
docker.%.start:
	docker compose -f $(INFRASTRUCTURE_PATH)/docker-compose/docker-compose.$(CONFIG_NAME)-$(UNAME).yaml --env-file $(INFRASTRUCTURE_PATH)/env/.env.$(CONFIG_NAME) -p $(WORKSPACE_NAME)-$(CONFIG_NAME) up --build -d

#--docker.<CONFIG_NAME>.stop: Stop specified docker compose config
docker.%.stop: CONFIG_NAME = $(word 2, $(subst ., ,$@))
docker.%.stop:
	docker compose -f $(INFRASTRUCTURE_PATH)/docker-compose/docker-compose.$(CONFIG_NAME)-$(UNAME).yaml --env-file $(INFRASTRUCTURE_PATH)/env/.env.$(CONFIG_NAME) -p $(WORKSPACE_NAME)-$(CONFIG_NAME) down

#--docker.<CONFIG_NAME>.<IMAGE_NAME>.run: Run command specified docker compose config
docker.%.%.run: CONFIG_NAME = $(word 2, $(subst ., ,$@))
docker.%.%.run: IMAGE_NAME = $(word 3, $(subst ., ,$@))
docker.%.%.run:
ifndef command
	$(error 'Need command to run')
endif
	docker compose -f $(INFRASTRUCTURE_PATH)/docker-compose/docker-compose.$(CONFIG_NAME)-$(UNAME).yaml --env-file $(INFRASTRUCTURE_PATH)/env/.env.$(CONFIG_NAME) -p $(WORKSPACE_NAME)-$(CONFIG_NAME) run $(IMAGE_NAME) $(command)


#--docker.start: Start production docker compose config
docker.start: docker.prod.start

#--docker.stop: Stop production docker compose config
docker.stop: docker.prod.stop

#--service.<SERVICE_NAME>.clean: Clean dist dir
#--service.<SERVICE_NAME>.build: Build app or library
#--service.<SERVICE_NAME>.test: Test code of app or library
#--service.<SERVICE_NAME>.start: Start service
#--service.<SERVICE_NAME>.install: Install dependencies
service.%.clean service.%.build service.%.test service.%.start service.%.install: ACTION = $(word 3, $(subst ., ,$@))
service.%.clean service.%.build service.%.test service.%.start service.%.install: SERVICE_NAME = $(word 2, $(subst ., ,$@))
service.%.clean service.%.build service.%.test service.%.start service.%.install:
	yarn workspace @$(WORKSPACE_NAME)/$(SERVICE_NAME) $(ACTION)

#--service.<SERVICE_NAME>.add.dep D="<LIST_OF_DEPS>" DD="<LIST_OF_DEV_DEPS>" PD="<LIST_OF_PEER_DEPS>" OD="<LIST_OF_OPTIONAL_DEPS>": Add npm dependencies to app or library
service.%.add.dep: SERVICE_NAME = $(word 2, $(subst ., ,$@))
service.%.add.dep:
ifdef D
	yarn workspace @$(WORKSPACE_NAME)/$(SERVICE_NAME) add $(D)
endif
ifdef DD
	yarn workspace @$(WORKSPACE_NAME)/$(SERVICE_NAME) add -D $(DD)
endif
ifdef PD
	yarn workspace @$(WORKSPACE_NAME)/$(SERVICE_NAME) add -P $(PD)
endif
ifdef OD
	yarn workspace @$(WORKSPACE_NAME)/$(SERVICE_NAME) add -O $(OD)
endif


#--service.<SERVICE_NAME>.remove.dep D="<LIST_OF_DEPS>": Remove npm dependencies from app or library;
service.%.remove.dep: SERVICE_NAME = $(word 2, $(subst ., ,$@))
service.%.remove.dep:
ifndef D
	$(error 'Need package(s) name(s)')
endif
	yarn workspace @$(WORKSPACE_NAME)/$(SERVICE_NAME) remove $(D)

#--service.<SERVICE_NAME>.run command="<COMMAND>": Run custom command in app or library
service.%.run: SERVICE_NAME = $(word 2, $(subst ., ,$@))
service.%.run:
ifndef command
	$(error 'Need command to run')
endif
	yarn workspace @$(WORKSPACE_NAME)/$(SERVICE_NAME) $(command)

#--app.<APP_NAME>.create: Create app
app.%.create: SERVICE_NAME = $(word 2, $(subst ., ,$@))
app.%.create: PACKAGE_PATH = $(APPS_PATH)/$(SERVICE_NAME)
app.%.create: PACKAGE_NAME = @$(WORKSPACE_NAME)/$(SERVICE_NAME)
app.%.create:
	mkdir -p "$(PACKAGE_PATH)/src"
	cp -f $(TEMPLATES_PATH)/.gitignore.template $(PACKAGE_PATH)/.gitignore
	cp -f $(TEMPLATES_PATH)/.dockerignore.template $(PACKAGE_PATH)/.dockerignore
	cp -f $(TEMPLATES_PATH)/Dockerfile.template $(PACKAGE_PATH)/Dockerfile
	cp -f $(TEMPLATES_PATH)/.lintstagedrc.json.template $(PACKAGE_PATH)/.lintstagedrc.json
	cp -f $(TEMPLATES_PATH)/.prettierrc.template $(PACKAGE_PATH)/.prettierrc
	cp -f $(TEMPLATES_PATH)/README.md.template $(PACKAGE_PATH)/README.md
	sed -i "s/PACKAGE_NAME/$(subst /,\/,$(PACKAGE_NAME))/g" $(PACKAGE_PATH)/README.md
	cp -f $(TEMPLATES_PATH)/package.json.template $(PACKAGE_PATH)/package.json
	sed -i "s/PACKAGE_NAME/$(subst /,\/,$(PACKAGE_NAME))/g" $(PACKAGE_PATH)/package.json
	sed -i "s/PACKAGE_MANAGER/$(subst /,\/,$(PACKAGE_MANAGER))/g"  $(PACKAGE_PATH)/package.json

#--app.<APP_NAME>.remove: Remove app
app.%.remove: SERVICE_NAME = $(word 2, $(subst ., ,$@))
app.%.remove: PACKAGE_PATH = $(APPS_PATH)/$(SERVICE_NAME)
app.%.remove:
ifneq ($(shell test -f "$(PACKAGE_PATH)/package.json" && echo 1), 1)
	rm -rf "$(PACKAGE_PATH)"
else
	$(warning 'App not found')
endif

#--library.<LIBRARY_NAME>.create: Create library
library.%.create: LIBRARY_NAME = $(word 2, $(subst ., ,$@))
library.%.create: PACKAGE_PATH = $(LIBRARIES_PATH)/$(LIBRARY_NAME)
library.%.create: PACKAGE_NAME = @$(WORKSPACE_NAME)/$(LIBRARY_NAME)
library.%.create:
	mkdir -p "$(PACKAGE_PATH)/src"
	cp -f $(TEMPLATES_PATH)/.gitignore.template $(PACKAGE_PATH)/.gitignore
	cp -f $(TEMPLATES_PATH)/.lintstagedrc.json.template $(PACKAGE_PATH)/.lintstagedrc.json
	cp -f $(TEMPLATES_PATH)/.prettierrc.template $(PACKAGE_PATH)/.prettierrc
	cp -f $(TEMPLATES_PATH)/README.md.template $(PACKAGE_PATH)/README.md
	sed -i "s/PACKAGE_NAME/$(subst /,\/,$(PACKAGE_NAME))/g" $(PACKAGE_PATH)/README.md
	cp -f $(TEMPLATES_PATH)/package.json.template $(PACKAGE_PATH)/package.json
	sed -i "s/PACKAGE_NAME/$(subst /,\/,$(PACKAGE_NAME))/g" $(PACKAGE_PATH)/package.json
	sed -i "s/PACKAGE_MANAGER/$(subst /,\/,$(PACKAGE_MANAGER))/g"  $(PACKAGE_PATH)/package.json

#--library.<LIBRARY_NAME>.remove: Remove library
library.%.remove: SERVICE_NAME = $(word 2, $(subst ., ,$@))
library.%.remove: PACKAGE_PATH = $(LIBRARIES_PATH)/$(SERVICE_NAME)
library.%.remove:
ifneq ($(shell test -f "$(PACKAGE_PATH)/package.json" && echo 1), 1)
	rm -rf "$(PACKAGE_PATH)"
else
	$(warning 'Library not found')
endif

.DEFAULT_GOAL := help
.PHONY: test test_all no_targets__ help

help:
	@grep -E '^#--.*$$' $(MAKEFILE_LIST) \
	| sed -n 's/.*#--\(.*\)/\1/p' \
	| column -t  -s ':'
