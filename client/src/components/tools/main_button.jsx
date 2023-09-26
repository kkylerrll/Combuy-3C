import React, { useState} from 'react';
import axios from 'axios'; 
import { API_ENDPOINTS } from '../contexts/constants';
function MainButton({ productId, specId,fetchProducts }) {
    const [showModal, setShowModal] = useState(false);
    const [isUnpublished] = useState(false);

    const handleUnpublish = async () => {
        console.log(productId);

        try {
            await axios.put(`${API_ENDPOINTS.DOWN}/${productId}/${specId}`, { publish: 0 });
            alert('商品已下架');
            fetchProducts(); // 刷新商品列表
        } catch (error) {
            console.error("Error in handleUnpublish:", error);
            alert('下架失敗，請再試一次');
        }
        setShowModal(false);
    }


    if (isUnpublished) {
        return null; // 如果商品已經下架，不再顯示這個元件
    }

    return (
        <>
            <div className="delData1" onClick={() => setShowModal(true)}>下架</div>

            {showModal && (
                <div style={{
                    
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px',width:'20%',height:'20%' }}>
                        <p style={{color:'black'}}>是否將商品下架？</p>
                        <button onClick={() => handleUnpublish(productId)} className='m-1'>確定下架</button>
                        <button onClick={() => setShowModal(false)}className='m-1'>取消</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default MainButton;
