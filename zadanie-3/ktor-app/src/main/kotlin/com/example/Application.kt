package com.example

import com.example.plugins.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun main() {
    val server = embeddedServer(Netty, port = 8080) {
        routing {
            get("/") {
                call.respondText("Hello, World!")
            }
        }
    }
    server.start(wait = true)
}

fun Application.module() {
    configureRouting()
}
