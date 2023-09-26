import React, { useState } from 'react';
function ProductContent({ onUpdateForm }) {

    const [formState, setFormState] = useState({
        spec: '',
        quantity: '',
        price: '',
        description: ''
    });

    const [hasError, setHasError] = useState({
        price: false,
        quantity: false
    });
    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        // 這是新加入的檢查
        if (formState[name] === value) return;

        const currentErrors = { ...hasError };

        if (name === "quantity") {
            const isValidInteger = /^\d+$/.test(value);  // 檢查是否為有效整數
            if (value > "999") {
                value.startsWith("999")
            }
            if (!isValidInteger || value === "" || value.startsWith("0")) {
                currentErrors[name] = true;
            } else {
                currentErrors[name] = false;
            }
        }
        if (name === "price") {
            const isValidNumberWithoutPunctuation = /^\d+$/.test(value);  // 檢查是否為有效數字

            if (!isValidNumberWithoutPunctuation || value === "" || value.startsWith("0")) {
                currentErrors[name] = true;
            } else {
                currentErrors[name] = false;
            }
        }

        setHasError(currentErrors);

        if (!currentErrors[name]) {
            const updatedFormState = { ...formState, [name]: value };
            setFormState(updatedFormState);
            if (onUpdateForm) {
                onUpdateForm(updatedFormState);
            }
        }
    };
    const handleInputBlur = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        const currentErrors = { ...hasError };

        if (name === "quantity") {
            const isValidInteger = /^\d+$/.test(value);  // 檢查是否為有效整數

            if (!isValidInteger || value === "" || value.startsWith("0")) {
                currentErrors[name] = true;
            } else {
                currentErrors[name] = false;
            }

        }
        if (name === "price") {
            const isValidNumberWithoutPunctuation = /^\d+$/.test(value);  // 檢查是否為有效數字

            if (!isValidNumberWithoutPunctuation || value === "" || value.startsWith("0")) {
                currentErrors[name] = true;
            } else {
                currentErrors[name] = false;
            }
        }

        setHasError(currentErrors);
    };

    return (
        <>
            <div className="row mt-5">
                <label className="col-1 align-self-start titlerow">商品描述</label>
                <div className="col">
                    <div className="gray3 incontentText titlerow top2-r10px ps-2 ">描述內容</div>
                    <textarea
                        className="form-control txtara"
                        rows={4}
                        value={formState.description}
                        onChange={handleInputChange}

                        name="description"
                    />
                </div>
            </div>
            <div className="row mt-5">
                <label className="col-1 align-self-start titlerow">商品內容</label>
                <div className="col">
                    <div className="gray3 incontentText titlerow top2-r10px ps-2">庫存與規格</div>
                    <div className="container">
                        <div className="row txtara ">
                            <div className="col-md-4 ">
                                <div className='m-2'>
                                    <label htmlFor="spec">規格</label>
                                    <input
                                        type="text"
                                        name="spec"
                                        id="spec"
                                        value={formState.spec}
                                        onInput={handleInputChange}

                                        className="form-control ms-1 input-right-placeholder "
                                        placeholder="例如:基本款"
                                    />
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className='m-2'>
                                    <label htmlFor="quantity">數量</label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        id="quantity"
                                        className={`form-control ms-1 ${hasError.quantity ? 'error-input' : ''}`}
                                        value={formState.quantity}
                                        onInput={handleInputChange}
                                        onBlur={handleInputBlur}
                                        min={0}
                                        max={999}
                                    />
                                    {hasError.quantity && <div className="text-danger">請輸入數量!</div>}


                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className='m-2'>
                                    <label htmlFor="price">價格</label>
                                    <input
                                        type="text"
                                        name="price"          
                                        id="price"           
                                        className={`form-control ms-1 ${hasError.price ? 'error-input' : ''}`}
                                        value={formState.price}    
                                        onChange={handleInputChange}
                                        onBlur={handleInputBlur}
                                        min={0}
                                    />
                                    {hasError.price && <div className="text-danger">請輸入價格!</div>}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductContent;