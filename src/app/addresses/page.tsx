import AddressesClient from "@/components/address/AddressesClient";
import { fetchAddresses } from "@/services/addressService";


export default async function AddressesPage() {
  
    /*const response = await fetchAddresses();

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json()*/
  
  return <AddressesClient />;
}