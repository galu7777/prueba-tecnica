import { Customer } from '@/types';

export async function fetchCustomers(page: number): Promise<Customer[] | null> {
    const apiUrl = `http://localhost:3001/v1/customers/get_all_customer?page=${page}`;
    try {
        const response = await fetch(apiUrl);
        console.log("res: ", response)
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("data: ", data)
        return data as Customer[];
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Propagate the error for better error handling upstream
    }
}
