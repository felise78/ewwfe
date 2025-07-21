all: dev

dev:
	@echo "Starting development server..."
	docker-compose up -d

logs:
	docker-compose logs -f

clean:
	docker-compose down
	docker-compose rm -f

.PHONY: all dev logs clean