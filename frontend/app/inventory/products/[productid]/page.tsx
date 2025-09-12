import { useParams } from "next/navigation";

const ProductPage = () => {
      const params = useParams();
      const selectedProductId = params.productid as string;
  return (
    <div>ProductPage</div>
  )
}

export default ProductPage