import ProductCard from "../../../components/ProductCard/PropductCard.tsx";
import {MenuListProps} from "./MenuList.props.ts";
import {Product} from "../../../interfaces/product.inerface.ts";

export default function MenuList({products}: MenuListProps) {
    return products.map((product: Product) => (
        <ProductCard
            key={product.id}
            title={product.name}
            description={product.ingredients.join(', ')}
            image={product.image}
            price={product.price}
            rating={product.rating}
            id={product.id}
        />));
}