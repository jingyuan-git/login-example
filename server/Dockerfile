ARG  GOLANG_VER=1.18.3
ARG  ALPINE_VER=3.15
FROM golang:${GOLANG_VER}-alpine${ALPINE_VER} as go-builder-1.18.3

WORKDIR /build

COPY . /build/.
RUN go env -w GOPROXY="https://goproxy.cn,direct"
RUN cd /build && go build -o http-server main.go

FROM alpine:${ALPINE_VER}

WORKDIR /target

COPY --from=go-builder-1.18.3 /build/conf/app.ini /target/conf/app.ini
COPY --from=go-builder-1.18.3 /build/http-server /target/

EXPOSE  8000
ENTRYPOINT ["/target/http-server"]