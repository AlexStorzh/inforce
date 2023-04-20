import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
export function ProductPage() {
  const { productId } = useParams();
  const store = useSelector((state) => state.product);
  //Better to get from server on ${productId}
  const product = store.products.find((e) => e._id == productId);
  console.log(product);
  return (
    <div>
      <h1>{productId}</h1>
      <div>Here is name: {product.name} </div>
      <div>Here is imageUrl: {product.imageUrl} </div>
      <div>Here is count: {product.count} </div>
      <div>
        Here is size
        <div>Width : {product.size.width} </div>{" "}
        <div>Heigth : {product.size.height} </div>{" "}
      </div>
      <div>Here is weights: {product.weight}</div>
    </div>
  );
}
