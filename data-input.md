# Số liệu thật cho 2 sản phẩm

Điền vào chỗ `___`, rồi gửi lại cho Claude. Thứ tự giống hệt interface `Product` trong `src/data/products.ts`.
Thị trường: chỉ Mỹ. **Mọi câu chữ sản phẩm (tên, mô tả, màu, bảo quản, FAQ) viết bằng tiếng Anh Mỹ.**
Đơn vị: giá bằng **USD** (có cent, vd `649.99`). Kích thước nhập bằng **cm**, web tự đổi sang inch (làm tròn LÊN ¼ in). Cân nặng và tải trọng nhập bằng **kg**, web tự đổi sang lb (làm tròn LÊN).
Ảnh sản phẩm là ảnh render; web luôn ghi rõ điều đó. Alt text của ảnh tự động có chữ `Rendering: ` ở đầu, chỉ cần mô tả ảnh.

Khi đã có đủ số liệu, Claude sẽ thay dữ liệu `[SAMPLE]` và đặt `isPlaceholder: false`. Lúc đó `npm run build` mới chạy được.

Ảnh: WebP, cạnh dài tối đa 2000 px, đặt tên kiểu `cabinet-oak-front.webp`, `shelf-walnut-detail.webp`. Mỗi sản phẩm 4–8 ảnh, nếu được thì có ảnh cho từng màu.

---

## 1. Tủ gỗ (slug: `wood-cabinet`)

| # | Field | Đơn vị | Giá trị |
|---|---|---|---|
| 1 | Tên, tiếng Anh (`name`) | | ___ |
| 2 | Mô tả ngắn, 1 câu tiếng Anh (`shortLine`) | | ___ |
| 3 | Giá đề xuất (`priceUsd`) | USD | ___ |
| 4 | Kích thước ngoài: Rộng (`dimensionsCm.width`) | cm (web đổi sang in) | ___ |
| 5 | Kích thước ngoài: Sâu (`dimensionsCm.depth`) | cm (web đổi sang in) | ___ |
| 6 | Kích thước ngoài: Cao (`dimensionsCm.height`) | cm (web đổi sang in) | ___ |
| 7 | Cân nặng (`weightKg`) | kg (web đổi sang lb) | ___ |
| 8 | Tải trọng tối đa mỗi kệ (`maxLoadPerShelfKg`) | kg/kệ (web đổi sang lb) | ___ |
| 9 | Loại gỗ (`woodType`) | | ___ |
| 10 | Hoàn thiện (`finish`) | | ___ |
| 11 | Màu: xem bảng màu bên dưới (`colors`) | | |
| 12 | Số cửa (`doors`) | cửa | ___ |
| 12a | Kiểu cửa, tiếng Anh (`doorStyle`), vd `sliding glass` | | ___ |
| 12b | Số ngăn kéo (`drawers`) | ngăn kéo | ___ |
| 12c | Vách hông nếu khác vật liệu chính, tiếng Anh (`sidePanels`), vd `glass` | | ___ |
| 13 | Số kệ (`shelves`) | kệ | ___ |
| 14 | Số ngăn (`compartments`) | ngăn | ___ |
| 15 | Cách lắp đặt (`setup`): đứng tự do / treo tường | | ___ |
| 16 | Có bộ chống lật? (`antiTipKit`): có / không | | ___ |
| 17 | Bảo quản: xem bên dưới (`care`) | | |
| 18 | FAQ: xem bên dưới (`faq`) | | |
| 19 | Điểm nổi bật: xem bên dưới (`features`) | | |
| 20 | Ảnh mở cửa (`openImage`) | tên file | ___ |
| 21 | Khoảng trống cần phía trước để kéo ngăn kéo ra (`frontClearanceCm`) | cm (web đổi sang in) | ___ |

**Màu** (thêm dòng nếu có nhiều màu):

| Tên màu (tiếng Anh) | Mã màu cho ô chọn (hex, nếu có) | Tên file ảnh của màu này |
|---|---|---|
| ___ | ___ | ___, ___ |
| ___ | ___ | ___, ___ |

**Bảo quản** (3–4 dòng, tiếng Anh):
1. ___
2. ___
3. ___
4. ___

**FAQ** (5–6 câu, tiếng Anh):
1. Q: ___ / A: ___
2. Q: ___ / A: ___
3. Q: ___ / A: ___
4. Q: ___ / A: ___
5. Q: ___ / A: ___
6. Q: ___ / A: ___

**Điểm nổi bật** (4–5 điểm, tiếng Anh; web đánh số 01–05). Chỉ ghi điều đã xác nhận:
1. Title: ___ / Text (1 câu): ___
2. Title: ___ / Text (1 câu): ___
3. Title: ___ / Text (1 câu): ___
4. Title: ___ / Text (1 câu): ___
5. Title: ___ / Text (1 câu): ___ (không bắt buộc)

---

## 2. Kệ gỗ (slug: `wood-shelf`)

| # | Field | Đơn vị | Giá trị |
|---|---|---|---|
| 1 | Tên, tiếng Anh (`name`) | | ___ |
| 2 | Mô tả ngắn, 1 câu tiếng Anh (`shortLine`) | | ___ |
| 3 | Giá đề xuất (`priceUsd`) | USD | ___ |
| 4 | Kích thước ngoài: Rộng (`dimensionsCm.width`) | cm (web đổi sang in) | ___ |
| 5 | Kích thước ngoài: Sâu (`dimensionsCm.depth`) | cm (web đổi sang in) | ___ |
| 6 | Kích thước ngoài: Cao (`dimensionsCm.height`) | cm (web đổi sang in) | ___ |
| 7 | Cân nặng (`weightKg`) | kg (web đổi sang lb) | ___ |
| 8 | Tải trọng tối đa mỗi kệ (`maxLoadPerShelfKg`) | kg/kệ (web đổi sang lb) | ___ |
| 9 | Loại gỗ (`woodType`) | | ___ |
| 10 | Hoàn thiện (`finish`) | | ___ |
| 11 | Màu: xem bảng màu bên dưới (`colors`) | | |
| 12 | Số cửa (`doors`) | cửa | ___ (thường là 0) |
| 12b | Số ngăn kéo (`drawers`) | ngăn kéo | ___ |
| 12d | Hình dáng, tiếng Anh (`shape`), vd `quarter-round corner` (kệ góc: fit checker đo dọc theo từng bức tường) | | ___ |
| 13 | Số kệ (`shelves`) | kệ | ___ |
| 14 | Số ngăn (`compartments`) | ngăn | ___ |
| 15 | Cách lắp đặt (`setup`): đứng tự do / treo tường | | ___ |
| 16 | Có bộ chống lật? (`antiTipKit`): có / không | | ___ |
| 17 | Bảo quản: xem bên dưới (`care`) | | |
| 18 | FAQ: xem bên dưới (`faq`) | | |
| 19 | Điểm nổi bật: xem bên dưới (`features`) | | |

**Màu** (thêm dòng nếu có nhiều màu):

| Tên màu (tiếng Anh) | Mã màu cho ô chọn (hex, nếu có) | Tên file ảnh của màu này |
|---|---|---|
| ___ | ___ | ___, ___ |
| ___ | ___ | ___, ___ |

**Bảo quản** (3–4 dòng, tiếng Anh):
1. ___
2. ___
3. ___
4. ___

**FAQ** (5–6 câu, tiếng Anh):
1. Q: ___ / A: ___
2. Q: ___ / A: ___
3. Q: ___ / A: ___
4. Q: ___ / A: ___
5. Q: ___ / A: ___
6. Q: ___ / A: ___

**Điểm nổi bật** (4–5 điểm, tiếng Anh; web đánh số 01–05). Chỉ ghi điều đã xác nhận:
1. Title: ___ / Text (1 câu): ___
2. Title: ___ / Text (1 câu): ___
3. Title: ___ / Text (1 câu): ___
4. Title: ___ / Text (1 câu): ___
5. Title: ___ / Text (1 câu): ___ (không bắt buộc)
