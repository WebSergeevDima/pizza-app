import {useLoaderData} from "react-router";
import {Product as ProductProps} from "../../interfaces/product.inerface.ts";

export default function Product() {
    const data = useLoaderData() as ProductProps;

    console.log('data; ', data)

    return <>{data.name}</>
}