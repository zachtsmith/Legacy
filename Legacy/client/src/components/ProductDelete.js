import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "reactstrap"
import { getProduct } from "../modules/productManager"


export const ProductDelete = () => {
    const { productId } = useParams()
    const [product, setProduct] = useState([])
    const navigate = useNavigate()

    const getProd = () => {
        getProduct(productId).then(prod => setProduct(prod));
    }
    useEffect(
        () => {
            getProd()
        },
        []
    )

    
    return <>
        <h2>Are you sure you want to delete {product.productName} from your list of Products?</h2>
        <Button style={{marginLeft: '3px'}} 
        // className="btn-outline-primary" 
        onClick={() => {
            fetch(`/api/product/delete/${productId}`, {
                method: "DELETE",
            })
                .then(() => {
                    navigate("/product")
                })
        }}>Yes, Delete.</Button> 
        <Button style={{marginLeft: '3px'}}  onClick={() => {
            navigate("/product")
        }}>Cancel</Button>
    </>
}