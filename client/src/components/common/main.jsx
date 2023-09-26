import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MainButton from '../tools/main_button'
import { API_ENDPOINTS } from '../contexts/constants'
import { Link } from 'react-router-dom'
function Main() {
  const [product, setProduct] = useState(null)
  console.log(product)

  const fetchProducts = () => {
    axios
      .get(API_ENDPOINTS.PRODUCT)
      .then(response => {
        setProduct(response.data)
      })
      .catch(error => {
        console.error('Error fetching data: ', error)
      })
  }

  useEffect(() => {
    fetchProducts()
  }, [])
  // 如果資料還沒被取得，顯示載入訊息
  if (!product) return <div>Loading...</div>

  return (
    <div>
      <div className="top2 top2-b10px">
        <div className="mt-3">
          <div className="titlefont ">
            <span className="titlefont-blue">商品管理</span> / 商品列表
          </div>
        </div>
      </div>
      <div className="top2 top2-b10px mt-4">
        <div className="col-12 gray1 titlefont-blue titlefont ">商品搜尋</div>
        <div className="col-12 titlefont">
          名稱: <input type="text" className="me-3 top2-b10px" />
          <button className="butt1"> 搜尋</button>
        </div>
      </div>
      <div className="top2 top2-r10px mt-4">
        <div className="row text-center">
          <div className="col-2 titlefont">編號</div>
          <div className="col-2 titlefont">商品名稱</div>
          <div className="col-2 titlefont">商品圖片</div>
          <div className="col-2 titlefont">商品價格</div>
          <div className="col-2 titlefont">數量</div>
          <div className="col-2 titlefont">狀態</div>
        </div>
      </div>
      <div className="top2 top2-bgray">
        {product.map((prodItem, index) => (
          <div key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
            <div className="row text-center d-flex align-items-center">
              <div className="col-2 titlefont">{index + 1}</div>
              <div className="col-2 titlefont">
                {prodItem.prod_name}
                <br />
                {prodItem.spec_name}
              </div>
              <img
                src={`/public${API_ENDPOINTS.LOCALHOST}/${prodItem.img_src}`}
                className="col-2 titlefont"
                alt=""
              />
              <div className="col-2 titlefont">{'NT$ ' + prodItem.price.toLocaleString()}</div>
              <div className="col-2 titlefont">{prodItem.stock.toLocaleString()}</div>
              <div className="col-2 titlefont">
                <Link
                  to={`/products/edit/${prodItem.prod_id}/${prodItem.spec_id}`}
                  className="btn btn-success m-1"
                >
                  修改
                </Link>
                <div className="btn btn-primary delData1">
                  <MainButton
                    productId={prodItem.prod_id}
                    specId={prodItem.spec_id}
                    fetchProducts={fetchProducts}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Main
