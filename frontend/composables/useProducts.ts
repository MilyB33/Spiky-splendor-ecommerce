export const useProducts = async () => {
  try {
    const client = useMedusaClient();

    const { products } = await client.products.list();

    return products;
  } catch (error) {
    console.log(error);
  }
};
