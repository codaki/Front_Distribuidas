export interface Product {
    prod_id: number;
    prod_name: string;
    prod_unit_price: number | null;
    prod_in_stock: number | null;
    cat_id: number;
}
