const express = require('express');
const router = express.Router();

router.get('/products/:prod_id', async (req, res) => {
    const prodId = req.params.prod_id;

    try {
        // 從資料庫中獲取產品資訊
        const productResults = await dbQuery('SELECT * FROM product WHERE prod_id = ?', [prodId]);
        const imagesResults = await dbQuery('SELECT * FROM product_images_test WHERE prod_id = ?', [prodId]);
        const sellspecResults = await dbQuery('SELECT * FROM sellspec WHERE prod_id = ?', [prodId]);

        // 整合資訊並返回
        const responseData = {
            product: productResults[0],  // 取出第一筆記錄，因為ID是唯一的
            images: imagesResults,
            sellspec: sellspecResults
        };

        res.json(responseData);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: '內部伺服器錯誤' });
    }
});

module.exports = router;
