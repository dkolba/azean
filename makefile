REVISION ?= latest
GIT_USER_NAME ?= Your Name
GIT_USER_EMAIL ?= your@name.com

IMAGE := azean-dev-server:$(REVISION)
CONTAINER := azean-dev-server

DOCKER_RUN_ARGS := \
	-dit \
	--rm \
	-v "$$(pwd)":/app \
	-v azean-node_modules:/app/node_modules \
	-v azean-gh-config:/home/node/.config \
	-v azean-pi-config:/home/node/.pi \
	-v "$$(pwd)/secrets:/home/node/.ssh:ro" \
	--tmpfs /app/secrets \
	-p 8080:8080\
	--name $(CONTAINER)

DOCKER_EXEC_ARGS := \
	-it \
	-e TERM=xterm-256color

.PHONY: help ssh-keygen build run run-bash gh-login pi shell stop

help: ## Show available commands
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | sort | \
	awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-12s\033[0m %s\n", $$1, $$2}'

ssh-keygen: ## Generate new SSH key-pair
	ssh-keygen -t ed25519 -f secrets/id_ed25519 -C "$(GIT_USER_NAME)"

build: ## Build Docker image
	docker build \
		--no-cache \
		--pull \
		--build-arg GIT_USER_NAME="$(GIT_USER_NAME)" \
		--build-arg GIT_USER_EMAIL="$(GIT_USER_EMAIL)" \
		-t $(IMAGE) \
		-f Dockerfile.agent .

run: ## Start development container
	docker run \
		$(DOCKER_RUN_ARGS) \
		$(IMAGE) \
		sh -c "pnpm ci && pnpm run start -- --host 0.0.0.0 --port 8080"

idle: ## Start development container but don't run the server so the test suite can start a server in dev mode
	docker run \
		$(DOCKER_RUN_ARGS) \
		$(IMAGE) \
		bash

gh-login: ## Authenticate GitHub CLI inside container
	docker exec $(DOCKER_EXEC_ARGS) $(CONTAINER) \
		gh auth login

pi: ## Run pi inside container
	docker exec $(DOCKER_EXEC_ARGS) $(CONTAINER) \
		env PI_AGENT_API_KEY="$$PI_AGENT_API_KEY" pi

shell: ## Open bash shell inside container
	docker exec $(DOCKER_EXEC_ARGS) $(CONTAINER) \
		env PI_AGENT_API_KEY="$$PI_AGENT_API_KEY" bash

stop: ## Stop development container
	docker stop $(CONTAINER)