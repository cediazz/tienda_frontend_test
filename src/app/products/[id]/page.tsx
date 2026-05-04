import ProductDetail from "@/components/productDetail";

export default async function ProductDetailPage(
    {
  params,
}: {
  params: Promise<{ id: string }>
}
) {
    const { id } = await params
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/products/${id}`)

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const product = await response.json()
    
    return (
      <ProductDetail product={product}/>
    )

    
}
