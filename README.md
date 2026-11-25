# PTE Từng Bước

Website tự học PTE Academic với bốn khu luyện Speaking, Writing, Reading và Listening. Bắt đầu bằng các bài nền tảng, rồi chuyển sang bài gần dạng thi khi đã quen với thao tác và cách xem lại lỗi. Ngân hàng có 220 câu tự viết, chia đều thành 10 câu cho mỗi dạng bài trong PTE Academic. Speaking có bảy dạng bài trả lời bằng lời nói và thêm một bài Personal Introduction để làm quen, không tính vào tiến độ. Lộ trình bốn tuần có thể điều chỉnh theo lịch học. Mỗi buổi có thể luyện 15–25 phút.

Ở tuần 4, chọn **Bộ nhập môn** hoặc **Bộ gần dạng thi**. Mỗi bộ có một câu mỗi kỹ năng và mặc định mở ở chế độ Luyện có giờ. Bạn có thể bỏ qua từng câu, đổi chế độ hoặc tiếp tục từ trang chủ.

Trang luyện tập độc lập, không liên kết với Pearson. Kết quả luyện tập không phải điểm thi chính thức. Mục tiêu overall 65 và độ chính xác khi luyện được hiển thị riêng.

## Mở bản xem thử

Cần Node.js 22.12+ và npm. Trong thư mục dự án, chạy các lệnh dưới đây và mở địa chỉ Local mà Vite hiện trong terminal.

```bash
npm ci
npm run dev
```

Để kiểm tra bản build tĩnh, chạy hai lệnh sau và mở địa chỉ Local mà `preview` cung cấp.

```bash
npm run build
npm run preview
```

Nếu muốn xem bố cục trên điện thoại, kết nối hai thiết bị cùng một mạng Wi-Fi, chạy `npm run dev -- --host 0.0.0.0` và mở địa chỉ Network trên điện thoại. Quyền ghi âm cần `localhost` hoặc HTTPS. Khi dùng địa chỉ Network dạng HTTP, vẫn có thể chọn tự luyện và nói thành tiếng.

Để chạy kiểm thử tự động bằng Chromium trên máy mới, cài Chromium cho Playwright rồi chạy bộ kiểm thử.

```bash
npx playwright install chromium
npm test
```

## Thêm một câu hỏi

Ngân hàng nằm trong `src/data/`. Hai tệp `oral.ts` và `written.ts` chứa bộ câu gốc. Các tệp `*-extra.ts` mở rộng từng kỹ năng, còn `listening-choices.ts` và `listening-summary-missing.ts` chứa bốn dạng Listening bổ sung. Hai tệp `retell-lecture.ts` và `answer-short-question.ts` chứa các dạng Speaking bổ sung. Các ngân hàng được ghép trong `src/data/index.ts`. Kiểu dữ liệu và kỹ năng tương ứng với mỗi dạng bài nằm ở `src/data/types.ts`. Sao chép một mục cùng dạng rồi sửa ID, độ khó (`foundation` hoặc `exam`), tiêu đề, đề bài, gợi ý và giải thích. Giữ đề, đoạn đọc, mẫu trả lời và transcript bằng tiếng Anh. Viết gợi ý, hướng dẫn và giải thích bằng tiếng Việt.

Ví dụ thêm mục Read Aloud vào `oralQuestions`:

```ts
{
  id: 'ra-community-garden',
  type: 'read-aloud',
  difficulty: 'foundation',
  title: 'A community garden',
  prompt: 'Read the text aloud.',
  passage: 'The community garden opened last spring. Neighbours grow vegetables in small plots and meet on Saturdays to share tools, seeds and advice.',
  model: 'The community garden opened last spring. Neighbours grow vegetables in small plots and meet on Saturdays to share tools, seeds and advice.',
  hint: 'Đọc thành từng cụm, ngắt nhẹ sau dấu chấm.',
  explanation: 'Tập đọc đủ từ trước. Khi đã quen, nhấn vào các từ mang ý chính như garden, vegetables và Saturdays.',
},
```

Với câu có đáp án, điền đúng các trường của dạng bài đang sao chép. Các chỉ số trong `correct` bắt đầu từ `0`. Với câu có âm thanh, lưu tệp MP3 tự tạo ở `public/audio/` rồi điền `audio.file` bằng tên tệp và `audio.transcript` bằng nội dung đọc. Audio trong bản này dùng giọng tổng hợp tiếng Anh, tạo từ kịch bản tự viết và lưu cùng mã nguồn. Với Select Missing Word, bản ghi kết thúc bằng tiếng bíp thay cho đáp án, còn transcript hoàn chỉnh chỉ hiển thị khi xem lại bài.

Sau khi thêm, chạy `npm run build`. Mở câu mới ở cả hai chế độ và kiểm tra đáp án hoặc mẫu sau khi nộp.

## Dữ liệu trên thiết bị

Trình duyệt lưu tiến độ, kết quả bài có đáp án, lịch sử luyện, bài cần ôn và nháp Writing trên thiết bị hiện tại. Dữ liệu nằm trong `localStorage` theo địa chỉ website và hồ sơ trình duyệt. Chế độ riêng tư, chặn lưu trữ hoặc xoá dữ liệu website có thể ảnh hưởng việc giữ tiến độ. Khi lưu trữ bị chặn, bạn vẫn có thể luyện trong phiên đang mở.

Bản ghi âm Speaking chỉ tồn tại tạm thời trong bộ nhớ trình duyệt và được giải phóng khi bấm xoá hoặc rời bài. Website chạy tĩnh bằng React, Vite và TypeScript. Việc luyện tập không cần tài khoản, máy chủ lưu bài hay dịch vụ chấm điểm.

## Bật GitHub Pages khi sẵn sàng

1. Đưa workflow `.github/workflows/pages.yml` vào nhánh mặc định sau khi xem lại mã nguồn.
2. Trong repo, mở **Settings → Pages → Build and deployment** và chọn **GitHub Actions** trong **Source**. Kiểm tra quyền truy cập của site theo gói GitHub của repo trước khi xuất bản. [Tài liệu về nguồn triển khai và quyền truy cập](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
3. Vào **Actions → Triển khai GitHub Pages → Run workflow**, chọn nhánh mặc định và chạy thủ công. Mở URL được báo khi job triển khai hoàn tất.

Workflow lấy đường dẫn website từ cấu hình Pages, áp dụng được cho đường dẫn có tên repo và website ở đường dẫn gốc. Các trang con dùng định tuyến hash (`#/…`), nên khi tải lại, GitHub Pages vẫn phục vụ cùng một trang gốc. Workflow chạy khi bạn chủ động chọn **Run workflow**.

## Đối chiếu với Pearson

Mốc thời gian có nhãn Pearson được đối chiếu với trang mô tả dạng bài. Với dạng dùng đồng hồ chung của cả phần thi hoặc có thời lượng trả lời thay đổi theo câu, thời gian đặt riêng cho mỗi bài được ghi là gợi ý luyện. Trong chế độ luyện có giờ, Respond to a Situation ẩn transcript trước khi nộp theo thiết kế của trang. Trong kỳ thi, Pearson cho thí sinh đọc và nghe tình huống.

- [Speaking & Writing](https://www.pearsonpte.com/pte-academic/test-format/speaking-writing/)
- [Reading](https://www.pearsonpte.com/pte-academic/test-format/reading/)
- [Listening](https://www.pearsonpte.com/pte-academic/test-format/listening/)
