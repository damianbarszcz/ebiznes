package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import play.api.libs.json.Json
import scala.concurrent.{ExecutionContext, Future}
import play.api.libs.json.Writes
import play.api.libs.json._
import models.Product
import resources.ProductData

class ProductController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

  // Metoda do wyświetlania wszystkich produktów
  def getAllProducts(): Action[AnyContent] = Action.async { implicit request: Request[AnyContent] =>
    val products = resources.ProductData.products
    Future.successful(Ok(Json.toJson(products)))
  }

  // Metoda do wyświetlania produktu o podanym ID
  def getProduct(id: Long): Action[AnyContent] = Action.async { implicit request: Request[AnyContent] =>
    val productOpt = resources.ProductData.products.find(_.id.contains(id))
    productOpt match {
      case Some(product) => Future.successful(Ok(Json.toJson(product)))
      case None => Future.successful(NotFound)
    }
  }

  // Metoda do dodawania nowego produktu
  def createProduct(): Action[JsValue] = Action.async(parse.json) { implicit request =>
    request.body.validate[Product] match {
      case JsSuccess(product, _) =>
        val updatedProducts = ProductData.products :+ product

        Future.successful(Created(Json.toJson(updatedProducts)))

      case JsError(errors) =>
        Future.successful(BadRequest(Json.obj("message" -> "Invalid product data")))
    }
  }

  // Metoda do aktualizacji produktu o podanym ID
  def updateProduct(id: Long): Action[JsValue] = Action.async(parse.json) { implicit request =>
    request.body.validate[Product] match {
      case JsSuccess(updatedProduct, _) =>
        val productIndex = ProductData.products.indexWhere(_.id.contains(id))

        if (productIndex != -1) {
          val updatedProducts = ProductData.products.updated(productIndex, updatedProduct)
          Future.successful(Ok(Json.toJson(updatedProducts)))

        } else {
          Future.successful(NotFound)
        }

      case JsError(errors) =>
        Future.successful(BadRequest(Json.obj("message" -> "Invalid product data")))
    }
  }

  // Metoda do usuwania produktu o podanym ID
  def deleteProduct(id: Long): Action[AnyContent] = Action.async { implicit request =>
    val productIndex = ProductData.products.indexWhere(_.id.contains(id))

    if (productIndex != -1) {
      val updatedProducts = ProductData.products.patch(productIndex, Nil, 1)

      Future.successful(Ok(Json.toJson(updatedProducts)))
    } else {
      Future.successful(NotFound)
    }
  }
}