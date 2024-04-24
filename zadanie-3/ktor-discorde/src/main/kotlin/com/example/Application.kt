package com.example

import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable
import kotlinx.serialization.SerializationException
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import io.github.cdimascio.dotenv.Dotenv;
import io.ktor.client.statement.*

@Serializable
data class MessageContent(val content: String)

suspend fun main() {
    val dotenv: Dotenv = Dotenv.load()
    val webhookUrl = dotenv.get("DISCORD_WEBHOOK_URL");

    val client = HttpClient(CIO){
        install(ContentNegotiation) {
            json(Json{
                prettyPrint = true
                isLenient = true
            })
        }
    }

    embeddedServer(Netty, port = 8080, host = "0.0.0.0") {
        routing {
            get("/") {
                call.respondText("Kotlin Ktor Server is running")
            }

            post("/send-message") {
                val receivedText = call.receiveText()
                println("Received raw request body: $receivedText")

                val messageContent = try {
                    Json.decodeFromString<MessageContent>(receivedText)
                } catch (e: SerializationException) {
                    return@post call.respondText(
                        "Invalid request body: ${e.localizedMessage}",
                        status = HttpStatusCode.BadRequest,
                        contentType = ContentType.Text.Plain
                    )
                }

                try {
                    val response  = client.post(webhookUrl) {
                        contentType(ContentType.Application.Json)
                        setBody(Json.encodeToString(MessageContent(messageContent.content)))
                    }
                    if (response.status == HttpStatusCode.NoContent) {
                        call.respondText("Message sent successfully: ${response.status}", status = HttpStatusCode.OK)
                    } else {
                        val errorBody = response.bodyAsText()
                        println("Error sending message: ${response.status}, Body: $errorBody")
                    }
                } catch (e: Exception) {
                    call.respondText("Failed to send message: ${e.localizedMessage}", status = HttpStatusCode.InternalServerError)
                }
            }
        }
    }.start(wait = true)
}
