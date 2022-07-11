import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import SideBar from "./Sidebar";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct
} from "../../Actions/productAction";
import { Link,} from "react-router-dom";
import './ProductList.css'
import { DELETE_PRODUCT_RESET } from "../../Constants/productConstant";
import { useNavigate } from 'react-router';


const ProductList = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert("Product Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    dispatch(getAdminProduct());
  }, [dispatch,error,deleteError,isDeleted]);

  return (
    <Fragment>
      <div className='adminproductlistedit'>

      <div className='table_overflow'>
        <table id='table'>

          <thead> {/* The Head of The Table  */}
            <tr>
              <th className='editTable editProductId'>Product ID</th>
              <th className='editTable editName'>Name</th>
              <th className='editTable editStock'>Stock</th>
              <th className='editTable editCategory'>Category</th>
              <th className='editTable editPrice'>Price</th>
              <th className='editTable adminActions'>Actions</th>
            </tr>

          </thead>{/* End of The Head  */}

          <tbody> {/* The Body of The Table  */}

            {products &&
              products.map((item) => (
                <tr className='tr'>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>{item.stock}</td>
                  <td>{item.category}</td>
                  <td>{item.price}</td>
                  <td className='actiondiv'>
                    <button><Link to={`/admin/product/${item._id}`}>
                      Edit <i className=" editicon fa-solid fa-pencil" />
                    </Link></button>

                     <button onClick={()=>{ dispatch(deleteProduct(item._id))}}
                                        >Delete <i className="deleteicon fa-solid fa-trash-can" /></button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        </div>
      </div>
    </Fragment>
  )

}



export default ProductList
