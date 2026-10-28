# Số liệu thật cho 2 sản phẩm

Điền vào chỗ `___`, rồi gửi lại cho Claude. Thứ tự giống hệt interface `Product` trong `src/data/products.ts`.
Khi đã có đủ số liệu, Claude sẽ thay dữ liệu `[MẪU]` và đặt `isPlaceholder: false`. Lúc đó `npm run build` mới chạy được.

Ảnh: WebP, cạnh dài tối đa 2000 px, đặt tên kiểu `cabinet-oak-front.webp`, `shelf-walnut-detail.webp`. Mỗi sản phẩm 4–8 ảnh, nếu được thì có ảnh cho từng màu.

---

## 1. Tủ gỗ (slug: `tu-go`)

| # | Field | Đơn vị | Giá trị |
|---|---|---|---|
| 1 | Tên (`name`) | | ___ |
| 2 | Mô tả ngắn, 1 câu (`shortLine`) | | ___ |
| 3 | Giá đề xuất (`priceVnd`) | VNĐ | ___ |
| 4 | Kích thước ngoài: Rộng (`dimensionsCm.width`) | cm | ___ |
| 5 | Kích thước ngoài: Sâu (`dimensionsCm.depth`) | cm | ___ |
| 6 | Kích thước ngoài: Cao (`dimensionsCm.height`) | cm | ___ |
| 7 | Cân nặng (`weightKg`) | kg | ___ |
| 8 | Tải trọng tối đa mỗi kệ (`maxLoadPerShelfKg`) | kg/kệ | ___ |
| 9 | Loại gỗ (`woodType`) | | ___ |
| 10 | Hoàn thiện (`finish`) | | ___ |
| 11 | Màu: xem bảng màu bên dưới (`colors`) | | |
| 12 | Số cửa (`doors`) | cửa | ___ |
| 13 | Số kệ (`shelves`) | kệ | ___ |
| 14 | Số ngăn (`compartments`) | ngăn | ___ |
| 15 | Cách lắp đặt (`setup`): đứng tự do / treo tường | | ___ |
| 16 | Có bộ chống lật? (`antiTipKit`): có / không | | ___ |
| 17 | Bảo quản: xem bên dưới (`care`) | | |
| 18 | FAQ: xem bên dưới (`faq`) | | |
| 19 | Ảnh mở cửa (`openImage`) | tên file | ___ |
| 20 | Khoảng trống cần phía trước để mở cửa (`doorClearanceCm`) | cm | ___ |

**Màu** (thêm dòng nếu có nhiều màu):

| Tên màu | Mã màu cho ô chọn (hex, nếu có) | Tên file ảnh của màu này |
|---|---|---|
| ___ | ___ | ___, ___ |
| ___ | ___ | ___, ___ |

**Bảo quản** (3–4 dòng):
1. ___
2. ___
3. ___
4. ___

**FAQ** (5–6 câu):
1. Hỏi: ___ / Đáp: ___
2. Hỏi: ___ / Đáp: ___
3. Hỏi: ___ / Đáp: ___
4. Hỏi: ___ / Đáp: ___
5. Hỏi: ___ / Đáp: ___
6. Hỏi: ___ / Đáp: ___

---

## 2. Kệ gỗ (slug: `ke-go`)

| # | Field | Đơn vị | Giá trị |
|---|---|---|---|
| 1 | Tên (`name`) | | ___ |
| 2 | Mô tả ngắn, 1 câu (`shortLine`) | | ___ |
| 3 | Giá đề xuất (`priceVnd`) | VNĐ | ___ |
| 4 | Kích thước ngoài: Rộng (`dimensionsCm.width`) | cm | ___ |
| 5 | Kích thước ngoài: Sâu (`dimensionsCm.depth`) | cm | ___ |
| 6 | Kích thước ngoài: Cao (`dimensionsCm.height`) | cm | ___ |
| 7 | Cân nặng (`weightKg`) | kg | ___ |
| 8 | Tải trọng tối đa mỗi kệ (`maxLoadPerShelfKg`) | kg/kệ | ___ |
| 9 | Loại gỗ (`woodType`) | | ___ |
| 10 | Hoàn thiện (`finish`) | | ___ |
| 11 | Màu: xem bảng màu bên dưới (`colors`) | | |
| 12 | Số cửa (`doors`) | cửa | ___ (thường là 0) |
| 13 | Số kệ (`shelves`) | kệ | ___ |
| 14 | Số ngăn (`compartments`) | ngăn | ___ |
| 15 | Cách lắp đặt (`setup`): đứng tự do / treo tường | | ___ |
| 16 | Có bộ chống lật? (`antiTipKit`): có / không | | ___ |
| 17 | Bảo quản: xem bên dưới (`care`) | | |
| 18 | FAQ: xem bên dưới (`faq`) | | |

**Màu** (thêm dòng nếu có nhiều màu):

| Tên màu | Mã màu cho ô chọn (hex, nếu có) | Tên file ảnh của màu này |
|---|---|---|
| ___ | ___ | ___, ___ |
| ___ | ___ | ___, ___ |

**Bảo quản** (3–4 dòng):
1. ___
2. ___
3. ___
4. ___

**FAQ** (5–6 câu):
1. Hỏi: ___ / Đáp: ___
2. Hỏi: ___ / Đáp: ___
3. Hỏi: ___ / Đáp: ___
4. Hỏi: ___ / Đáp: ___
5. Hỏi: ___ / Đáp: ___
6. Hỏi: ___ / Đáp: ___
