
FROM golang:1.18 AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o main .
FROM ubuntu:latest
WORKDIR /root/
COPY --from=builder /app/main .
RUN chmod +x /root/main
COPY --from=builder /app/.env .
COPY --from=builder /app/myapp.db .
EXPOSE 8000
CMD ["./main"]