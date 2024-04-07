package models

import play.api.libs.json.Json
import play.api.libs.json.OFormat

case class Product(id: Option[Long], name: String, description: String, price: Double)

object Product {
  implicit val productFormat: OFormat[Product] = Json.format[Product]
}