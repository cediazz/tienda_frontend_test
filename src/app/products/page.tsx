import Products from "@/components/products";

export default async function ProductPage() {
  
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/products`)

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json()
    
    return <Products products={data} />;

}
