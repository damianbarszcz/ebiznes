package resources

import play.api.libs.json.Json
import play.api.libs.json.Format
import models.Product

object ProductData {
  import Product._

  val products: List[Product] = List(
    Product(Some(1), "Product 1", "Description of Product 1", 10.0),
    Product(Some(2), "Product 2", "Description of Product 2", 20.0),
    Product(Some(3), "Product 3", "Description of Product 3", 30.0),
    Product(Some(4), "Product 4", "Description of Product 4", 40.0),
    Product(Some(5), "Product 5", "Description of Product 5", 50.0)
  )
}