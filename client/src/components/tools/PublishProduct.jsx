import React, { useState } from 'react';
import axios from 'axios'; 
import { API_ENDPOINTS } from '../contexts/constants';


function PublishProduct({ productId,specId, fetchProducts }) { 
    const [showModal, setShowModal] = useState(false);
    
    const handlePublish = async (prod_id,spec_id) => {

        
        try {
            const response = await axios.put(`${API_ENDPOINTS.DOWN}/${productId}/${spec_id}`, { publish: 1 });
            if (response.status === 200) {
                alert('商品已上架');
                fetchProducts(); // 刷新商品列表
            } else {
                throw new Error('Server responded with a non-200 status code');
            }
        } catch (error) {
            console.error("在handlePublish中出現錯誤:", error);
            alert('上架失敗，請再試一次');
        }
        setShowModal(false);
    }


    return (
        <>
            <div className="publishProduct" onClick={() => setShowModal(true)}>上架</div>

            {showModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
                        <p>是否將商品上架？</p>
                        <button onClick={() => handlePublish(productId,specId)}>確定上架</button>
                        <button onClick={() => setShowModal(false)}>取消</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default PublishProduct;
