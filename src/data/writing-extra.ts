import type { Question } from './types'

export const extraWritingQuestions: Question[] = [
  {
    id: 'writing-summary-03',
    type: 'written-summary',
    difficulty: 'foundation',
    title: 'Borrowing Tools from the Library',
    prompt: 'Read the passage and summarise its main points in one sentence.',
    passage: 'A public library noticed that many residents needed tools for small repairs but used them only once or twice a year. It started lending basic items such as screwdrivers, tape measures and spanners. Members could borrow a kit for one week and return it like a book. When the service opened, some kits came back incomplete because people had packed the tools into the wrong boxes. Staff introduced a short checklist and added a picture showing where each item belonged. Borrowers began checking the kits before returning them, so missing tools became less common. The service gave residents a cheaper way to make occasional repairs and reduced the number of tools that households needed to buy.',
    hint: 'Tìm lý do thư viện mở dịch vụ và hai lợi ích ở câu cuối. Dùng vấn đề trả thiếu dụng cụ để hiểu bối cảnh.',
    explanation: 'Bài mẫu nêu dịch vụ và nối nguyên nhân với hai lợi ích. Nếu bài của bạn chỉ nói về ảnh trên hộp, hãy quay lại mục đích chính là giúp người dân sửa đồ mà không phải mua dụng cụ ít dùng.',
    model: 'A public library began lending tool kits so residents could make occasional repairs more cheaply and buy fewer items they would seldom use.',
    outline: ['Dịch vụ: thư viện cho mượn bộ dụng cụ.', 'Đối tượng: người chỉ thỉnh thoảng cần sửa đồ.', 'Lợi ích: tiết kiệm tiền và giảm số dụng cụ phải mua.'],
    checklist: ['Mình viết một câu từ 5 đến 75 từ.', 'Mình giữ dịch vụ và hai lợi ích chính.', 'Chi tiết về bộ dụng cụ hoặc cách trả chỉ xuất hiện nếu thật sự cần.'],
  },
  {
    id: 'writing-summary-04',
    type: 'written-summary',
    difficulty: 'foundation',
    title: 'A New Route to the Market',
    prompt: 'Read the passage and summarise its main points in one sentence.',
    passage: 'A suburb had a popular Saturday market, but it was difficult to reach without a car. The nearest bus stopped on the opposite side of a busy road, far from the market entrance. For six weeks, the local council moved the stop closer and added a marked crossing. The market organisers placed a small sign at the bus stop explaining which way to walk. More shoppers then arrived by bus, particularly older people who had previously depended on lifts. Stallholders also reported fewer complaints about the lack of car spaces. After the trial, the council kept both changes and asked other districts to review access to their weekend markets.',
    hint: 'Tách phần trước và sau khi thử nghiệm. Những thay đổi nào của hội đồng có tác động rõ nhất?',
    explanation: 'Bài mẫu gộp hai thay đổi của hội đồng và nêu kết quả có bằng chứng là nhiều người đến bằng xe buýt. Nếu dùng “all shoppers”, hãy sửa thành cách diễn đạt chỉ sự gia tăng vì đoạn đọc không nói mọi người đổi phương tiện.',
    model: 'Moving a bus stop closer to the Saturday market and adding a marked crossing made the market easier to reach by bus, particularly for older shoppers.',
    outline: ['Rào cản: khó đến chợ nếu không có ô tô.', 'Biện pháp: chuyển trạm và thêm vạch qua đường.', 'Kết quả: thuận tiện hơn, nhất là với người lớn tuổi.'],
    checklist: ['Mình viết một câu từ 5 đến 75 từ.', 'Mình giữ cả hai thay đổi quan trọng.', 'Mình nêu kết quả mà không suy rộng hơn đoạn đọc.'],
  },
  {
    id: 'writing-summary-05',
    type: 'written-summary',
    difficulty: 'foundation',
    title: 'Giving Students Time to Think',
    prompt: 'Read the passage and summarise its main points in one sentence.',
    passage: 'In a history class, the teacher usually asked a question and chose the first student to raise a hand. A few confident students answered most questions, while others said little even when they understood the material. The teacher changed the routine by giving everyone thirty seconds to write one idea before asking for volunteers. During that time, students could look back at their notes and decide what to say. More students offered answers, including several who rarely spoke in class. The teacher found that the brief preparation period helped students join discussions because they could organise their thoughts before speaking.',
    hint: 'Đoạn đọc có một thay đổi trong cách đặt câu hỏi và một kết quả về người tham gia. Hãy nối chúng.',
    explanation: 'Bài mẫu giữ trình tự cho thời gian chuẩn bị, sau đó nhiều người tham gia hơn vì đã sắp xếp được ý. Nếu viết rằng việc chờ giúp hiểu bài hơn, hãy đổi thành kết quả có trong đoạn đọc là tham gia thảo luận nhiều hơn.',
    model: 'By giving students time to write down an idea before answering, the teacher helped them organise their thoughts and encouraged more of them to join class discussions.',
    outline: ['Biện pháp: cho cả lớp viết nhanh một ý trước khi trả lời.', 'Cơ chế: sinh viên có thời gian sắp xếp suy nghĩ.', 'Kết quả: nhiều người tham gia phát biểu hơn.'],
    checklist: ['Mình viết một câu từ 5 đến 75 từ.', 'Mình giải thích vì sao việc cho thêm thời gian có ích.', 'Mình tránh thêm kết luận về điểm số hoặc khả năng hiểu bài.'],
  },
  {
    id: 'writing-summary-06',
    type: 'written-summary',
    difficulty: 'foundation',
    title: 'Sharing Leftover Bread',
    prompt: 'Read the passage and summarise its main points in one sentence.',
    passage: 'Two bakeries in a regional town used to throw away bread that had not sold by closing time. A community centre offered to collect the bread while it was still fresh and give it to families the next morning. Volunteers packed it into labelled paper bags, and the bakeries called the centre when there was nothing to collect. The organisers initially offered only whole loaves, but several people explained that smaller portions were easier for them to use. The centre began offering both sizes. The arrangement reduced the bakeries’ waste and allowed the centre to distribute fresh food in quantities that families could use.',
    hint: 'Nhìn vào việc gì xảy ra lúc cửa hàng đóng cửa và mục đích việc chia hai cỡ túi.',
    explanation: 'Bài mẫu giữ cả lợi ích giảm đồ bỏ đi và lợi ích cho gia đình. Khi sửa, hãy giữ việc chia khẩu phần nếu muốn làm rõ nhu cầu của người nhận, nhưng có thể bỏ chi tiết túi giấy.',
    model: 'A community centre collects unsold bread from local bakeries and offers it in suitable portions, reducing food waste while providing fresh bread to families.',
    outline: ['Chủ thể: trung tâm cộng đồng và các tiệm bánh.', 'Cách làm: thu bánh còn tươi và chia theo nhu cầu.', 'Hai kết quả: giảm lãng phí và cung cấp thực phẩm.'],
    checklist: ['Mình viết một câu từ 5 đến 75 từ.', 'Mình giữ hai kết quả chính thay vì kể từng bước thu gom.', 'Điều mình viết đúng với việc bánh được thu trước khi hỏng.'],
  },
  {
    id: 'writing-summary-07',
    type: 'written-summary',
    difficulty: 'exam',
    title: 'Measuring Demand for a Park',
    prompt: 'Read the passage and summarise its main points in one sentence.',
    passage: 'To decide whether a small park needed more seating, a council counted the people who passed through its eastern gate over two weeks. The result appeared to show little demand on weekdays, so the initial plan allocated most new benches to the side closest to the weekend market. A community group asked how the count had been made. Its members pointed out that many residents entered from the western footpath, which connects directly to a retirement village, and that the counter did not distinguish between people crossing the park and people staying to rest. The council repeated the study at both entrances and observed where visitors paused at different times of day. It also asked nearby residents which areas they avoided and why. The new evidence showed that many weekday visitors stayed near the western side but left quickly when the limited shaded seats were full. The project team moved some of the planned benches to that area and included a short path linking them to the entrance. The council concluded that entrance counts can give an initial estimate of foot traffic, but planning facilities requires information about how people use the space and who the original measurement failed to capture.',
    hint: 'Phân biệt lượng người đi qua cổng với cách họ dùng công viên. Tìm bài học phương pháp ở câu cuối.',
    explanation: 'Bài mẫu nêu vì sao số đếm ban đầu chưa đủ và phương pháp nào cải thiện quyết định về ghế. Nếu bản tóm tắt chỉ kể việc đổi vị trí ghế, hãy bổ sung giới hạn của việc đếm ở một cổng và vai trò của quan sát thực tế.',
    model: 'A council improved its seating plan by supplementing a single entrance count with observations and resident feedback, revealing weekday demand for shaded benches that the original measure of foot traffic had missed.',
    outline: ['Số đếm ban đầu: chỉ ở một cổng, không cho biết mục đích sử dụng.', 'Bổ sung: đếm ở hai lối, quan sát và hỏi cư dân.', 'Giá trị: phát hiện nhu cầu bị bỏ sót và điều chỉnh chỗ đặt ghế.'],
    checklist: ['Mình viết một câu từ 5 đến 75 từ.', 'Mình nêu rõ giới hạn của cách đo ban đầu.', 'Mình nối dữ liệu bổ sung với quyết định về ghế.'],
  },
  {
    id: 'writing-summary-08',
    type: 'written-summary',
    difficulty: 'exam',
    title: 'A Registry for Clinical Research',
    prompt: 'Read the passage and summarise its main points in one sentence.',
    passage: 'When researchers test a new treatment, they may measure several outcomes, including symptoms, recovery time and unexpected side effects. If the study report mentions only the most encouraging result, readers cannot easily tell whether it was the original goal of the trial or one of many measurements examined afterwards. A public research registry can reduce this problem. It allows investigators to record their main questions and planned measurements before recruiting participants. Readers can then compare the final report with the original plan and notice if important outcomes are missing or if the purpose of a measurement has changed. Registration does not mean researchers must ignore unexpected findings. A pattern discovered during the study may be worth reporting, provided the team clearly distinguishes it from a result the study had been designed to test. Nor does the act of registering make a weak research design reliable. The quality of the measurements and the way the study was carried out still matter. A useful registry therefore improves transparency by making the plan and any later changes visible, while leaving readers responsible for judging what the report can support.',
    hint: 'Tập trung vào lý do phải ghi kế hoạch trước khi thử nghiệm và cách người đọc dùng thông tin đó sau này.',
    explanation: 'Bài mẫu chọn ý trung tâm là minh bạch và nêu cơ chế so sánh kế hoạch với báo cáo. Nếu viết rằng đăng ký bảo đảm kết quả đáng tin, hãy sửa ngay vì đoạn đọc phân biệt minh bạch với chất lượng nghiên cứu.',
    model: 'Public trial registries improve transparency by recording planned research questions and measurements in advance, allowing readers to distinguish original aims from later discoveries and judge the findings in light of any changes.',
    outline: ['Vấn đề: báo cáo có thể chỉ chọn kết quả tích cực.', 'Cơ chế: lưu công khai mục tiêu và phép đo trước khi nghiên cứu.', 'Lợi ích: thấy được thay đổi và đánh giá kết quả trong đúng bối cảnh.'],
    checklist: ['Mình viết một câu từ 5 đến 75 từ.', 'Mình giải thích được cách hồ sơ công khai tăng tính minh bạch.', 'Mình tránh coi việc đăng ký là bằng chứng rằng nghiên cứu có chất lượng cao.'],
  },
  {
    id: 'writing-summary-09',
    type: 'written-summary',
    difficulty: 'exam',
    title: 'Preserving Local Voices',
    prompt: 'Read the passage and summarise its main points in one sentence.',
    passage: 'A small museum began recording interviews with people who had worked at a factory that closed decades earlier. The volunteers initially asked everyone the same questions about job titles and dates because those details were easy to catalogue. However, the recordings gave almost no sense of how the workplace had changed during its final years. A volunteer suggested asking former workers to describe a memorable day and inviting them to bring an object or photograph to the interview. This approach encouraged people to talk about routines, disagreements and changes in their own words. It also revealed that workers remembered some events differently depending on which part of the factory they worked in. The museum retained those differences and compared the accounts with surviving records where possible. It asked participants to review recordings before making them available and let them restrict material they did not wish to share. The project team concluded that oral history can recover experiences missing from written records, but its value depends on giving narrators room to shape their stories, preserving different perspectives and respecting decisions about access.',
    hint: 'Tìm điều các câu hỏi mở thu được mà bảng hỏi ban đầu bỏ qua, rồi xem bảo tàng xử lý các ký ức khác nhau thế nào.',
    explanation: 'Bài mẫu gộp giá trị lưu lại trải nghiệm với các điều kiện về cách phỏng vấn và chia sẻ. Nếu thiếu ý người tham gia được quyết định nội dung nào công khai, hãy bổ sung vì đó là một phần kết luận của đoạn đọc.',
    model: 'Oral history can preserve experiences absent from written records when interviewers let participants shape their accounts, retain differing perspectives and respect participants’ choices about what can be shared.',
    outline: ['Giá trị: lưu trải nghiệm cá nhân thiếu trong hồ sơ.', 'Cách phỏng vấn: để người kể chọn cách kể.', 'Cách lưu: giữ khác biệt và tôn trọng quyền chọn nội dung chia sẻ.'],
    checklist: ['Mình viết một câu từ 5 đến 75 từ.', 'Mình giữ được cả giá trị và các điều kiện để cách làm đó có ích.', 'Mình tránh biến ký ức cá nhân thành dữ kiện chắc chắn.'],
  },
  {
    id: 'writing-summary-10',
    type: 'written-summary',
    difficulty: 'exam',
    title: 'Testing a New Bus Timetable',
    prompt: 'Read the passage and summarise its main points in one sentence.',
    passage: 'A transport agency wanted to know whether running buses at even intervals would improve reliability. On one route, three buses were scheduled within twenty minutes, followed by a long gap. The agency spread the same number of departures across the hour. In its first report, the proportion of buses leaving on time rose, and the agency called the trial a success. Passenger surveys showed a more complicated result. Many people travelling short distances welcomed the shorter waits. At the outer end of the route, however, some passengers now missed a connecting train because buses no longer arrived just before it left. Those passengers experienced longer journeys even though the buses themselves were more punctual. The agency kept evenly spaced departures for most of the route and adjusted two early morning services to meet the main train connection. It also began monitoring total journey times, using transfer information and passenger reports alongside its records of bus departures. The trial showed that a timetable should be assessed from the perspective of a complete journey, since a change that improves the reliability of one service may make the wider trip less predictable for people who rely on connections.',
    hint: 'So sánh chỉ số xe buýt đúng giờ với thời gian của cả hành trình. Nhóm nào bị ảnh hưởng khác?',
    explanation: 'Bài mẫu giữ nghịch lý của thử nghiệm: chặng xe buýt cải thiện nhưng có người nối chuyến đi lâu hơn. Nếu chỉ viết rằng giãn đều chuyến giảm thời gian chờ, hãy nối thêm việc lỡ tàu và bài học đo cả hành trình.',
    model: 'Although spreading bus departures evenly improved punctuality and reduced some waits, it disrupted train transfers for other passengers, showing why timetable changes should be assessed across whole journeys.',
    outline: ['Thay đổi: giãn đều chuyến xe buýt.', 'Kết quả trái chiều: đúng giờ hơn nhưng một số khách lỡ tàu.', 'Bài học: cần đánh giá cả hành trình và điểm nối chuyến.'],
    checklist: ['Mình viết một câu từ 5 đến 75 từ.', 'Mình giữ được cả kết quả tốt và vấn đề nối chuyến.', 'Mình kết nối ví dụ với bài học về cách đánh giá.'],
  },
  {
    id: 'writing-essay-03',
    type: 'essay',
    difficulty: 'foundation',
    title: 'More Water Refill Points',
    prompt: 'Some universities want to add more drinking water refill points on campus. Do you think this is a good use of university funds? Give reasons and examples to support your view.',
    hint: 'Nêu quan điểm rồi chọn hai lý do khác nhau. Nghĩ đến vị trí đặt trạm và cách dùng thực tế.',
    explanation: 'Bài mẫu nối lợi ích môi trường với thói quen hằng ngày, rồi giải thích riêng lợi ích về chi phí cho sinh viên. Khi sửa, hãy ưu tiên ví dụ cho thấy đặt trạm ở đâu và vì sao sinh viên sẽ thật sự dùng.',
    model: `Universities should install more drinking water refill points in busy parts of their campuses. Students and staff would then have a practical reason to carry reusable bottles, and drinking water would be easier to obtain during a long day of classes.

First, convenient refill points could reduce demand for single-use bottles. A student may intend to carry water from home but run out after spending several hours in the library. If the closest refill point is in a separate building, the student may buy another bottle instead. A clearly marked point near the library entrance would make refilling the easier choice. The university could start with a small number of busy locations and check usage before adding more.

Second, providing free drinking water can help students manage everyday costs. One bottle may seem inexpensive, but buying one repeatedly over a semester adds to the cost of attending classes. Refill points would be particularly useful in study areas that stay open after shops close. The university would still need to pay for cleaning and repairs. Including those costs in its plan would make the service more reliable and give staff a way to respond when a machine stops working.

Overall, refill points would be a sensible investment if they are placed where students already spend time and maintained properly. Starting with the busiest locations would help the university see where additional facilities are needed.`,
    outline: ['Mở bài: ủng hộ đầu tư ở vị trí đông người.', 'Thân bài 1: tiếp nước thuận tiện khuyến khích dùng bình cá nhân.', 'Thân bài 2: nước miễn phí giảm chi hằng ngày, cần tính cả bảo trì.', 'Kết bài: khẳng định quan điểm và cách thử ở quy mô nhỏ.'],
    checklist: ['Bài có 200–300 từ.', 'Mình nêu rõ đây có phải cách dùng ngân sách hợp lý không.', 'Hai đoạn thân bài giải thích hai lý do khác nhau.', 'Ví dụ và kết bài đều liên quan trực tiếp đến quan điểm.'],
  },
  {
    id: 'writing-essay-04',
    type: 'essay',
    difficulty: 'foundation',
    title: 'Studying With Classmates',
    prompt: 'Some students prefer to study with classmates, while others prefer to study alone. Discuss one benefit of each approach and explain which you prefer.',
    hint: 'Dành một đoạn cho mỗi cách học. Dùng cùng một tình huống học tập để cho thấy khác biệt.',
    explanation: 'Bài mẫu trả lời đủ lợi ích của hai cách và nêu khi nào cách mình chọn có ích nhất. Khi sửa, hãy để mỗi ví dụ chứng minh một lợi ích cụ thể và chốt phương pháp bạn ưu tiên.',
    model: `Studying alone and studying with classmates can both help students prepare for assessments. I prefer to begin on my own because I can work at a suitable pace, although I find a short group session useful once I have tried the material myself.

The main advantage of studying alone is that students can spend more time on the areas they find difficult. For example, when preparing for a statistics test, I might understand how to calculate an average but need extra practice interpreting a graph. On my own, I can do three graph questions in a row and review each mistake before moving on. In a group, classmates may already understand that topic and want to move to the next chapter. Setting my own pace helps me see which areas still need attention.

Working with classmates is useful because people can explain the same idea in different ways. If I still do not understand how to read a graph after checking the textbook, another student might show me a simple example using travel times. I can then explain the same example back to check whether I understand it. To make this work, everyone should arrive with a question or example rather than expect one student to teach the whole group.

For most assessments, I would choose individual study first and use a short group meeting for problems I cannot resolve alone. That sequence gives me time to identify my own needs before asking for help.`,
    outline: ['Mở bài: chọn học một mình trước, có thể học nhóm sau.', 'Thân bài 1: chủ động dành thêm thời gian cho phần khó.', 'Thân bài 2: nghe cách giải thích khác và tự diễn đạt lại.', 'Kết bài: cho biết thứ tự áp dụng hai phương pháp và lý do.'],
    checklist: ['Bài có 200–300 từ.', 'Mình phân tích một lợi ích của mỗi cách học.', 'Mình giải thích rõ cách học ưu tiên và thời điểm áp dụng.', 'Ví dụ minh hoạ đúng lợi ích vừa nêu.'],
  },
  {
    id: 'writing-essay-05',
    type: 'essay',
    difficulty: 'foundation',
    title: 'A Free Weekend Bus Service',
    prompt: 'A town plans to make its local buses free on weekends. What are the main advantages and disadvantages of this idea? Explain whether the town should go ahead with the plan.',
    hint: 'Tách lợi ích với hạn chế. Khi kết luận, cân nhắc điều kiện để thị trấn biết kế hoạch có hiệu quả.',
    explanation: 'Bài mẫu tách chi phí triển khai khỏi lợi ích tiếp cận dịch vụ, rồi đề xuất thử nghiệm có chỉ số theo dõi. Khi sửa, kiểm tra xem kết luận có trả lời trực tiếp thị trấn nên làm gì.',
    model: `Free weekend buses could make it easier for residents to reach shops, sporting grounds and other local facilities. The town should test the plan on its main routes before deciding whether to fund it permanently.

One advantage is that people who do not drive would have a cheaper way to make short trips. For example, a family with two children might currently avoid the weekend market because paying four fares makes the trip expensive. Free travel could also encourage some drivers to leave their cars at home, especially if their destination is on a frequent bus route. Local businesses would benefit if more residents could get to the shopping area easily.

The main disadvantage is the cost. The council would lose fare revenue and might need extra buses if the service attracted large crowds. If the money came from reducing existing services, people who depend on weekday buses could lose out. A free fare on an infrequent route may make little difference anyway, since passengers still need a bus that runs when they want to travel.

A three-month trial on routes that already connect busy destinations would give the town better evidence. The council should record how many new passengers use the buses, whether they previously drove and what it costs to serve them. I would continue the plan only if the trial shows that it improves access at a cost the town can sustain.`,
    outline: ['Mở bài: ủng hộ thử nghiệm trước khi cam kết.', 'Thân bài 1: cải thiện tiếp cận, có khả năng giảm một số chuyến ô tô.', 'Thân bài 2: mất doanh thu và có thể tăng chi phí vận hành.', 'Kết bài: xác định dữ liệu cần xem để quyết định tiếp tục.'],
    checklist: ['Bài có 200–300 từ.', 'Mình nêu lợi ích và bất lợi chính.', 'Mình trả lời liệu thị trấn nên thực hiện kế hoạch hay không.', 'Ví dụ không giả định miễn phí sẽ tự động làm người đi ô tô đổi phương tiện.'],
  },
  {
    id: 'writing-essay-06',
    type: 'essay',
    difficulty: 'foundation',
    title: 'Phone Use During Class',
    prompt: 'Some teachers ask students to put away their phones during lessons. To what extent do you agree with this practice? Support your answer with reasons and examples.',
    hint: 'Bạn có thể đồng ý phần lớn và nêu ngoại lệ. Nói cụ thể khi nào việc dùng điện thoại phục vụ bài học.',
    explanation: 'Bài mẫu nêu mức độ đồng ý ngay từ đầu rồi làm rõ giá trị và giới hạn của quy định. Nếu bài đang mâu thuẫn giữa “cấm mọi lúc” và “cho dùng khi học”, hãy sửa câu luận điểm để thể hiện rõ ngoại lệ.',
    model: `I generally agree that students should put their phones away during lessons. A clear rule helps students concentrate, although teachers should allow phones when they have a direct learning purpose or meet an individual need.

Putting phones away can reduce interruptions. Even if students only intend to check the time, they may see a message and spend several minutes thinking about it. In a language class, losing track of a short conversation might make it difficult to complete the next activity. A shared rule also helps the teacher because the class knows when it is appropriate to use a device. Students can still check messages during a scheduled break.

There are useful exceptions. A teacher may ask students to photograph a diagram so they can explain it at home, or to use a dictionary to check a word during independent work. Some students also rely on a phone for an accessibility tool, such as reading text aloud. Teachers can allow these uses for a specific activity or arrange an individual exception. Explaining the purpose of each exception would make the rule easier to apply fairly.

Overall, phones should stay out of sight during most lessons, particularly when students need to follow a discussion or work together. When a phone helps someone carry out the task, the teacher should make that purpose clear and allow it for that part of the lesson.`,
    outline: ['Mở bài: nhìn chung đồng ý, với ngoại lệ khi thiết bị có mục đích rõ.', 'Thân bài 1: giảm mất tập trung và tạo quy tắc chung.', 'Thân bài 2: ví dụ ngoại lệ phục vụ học tập hoặc tiếp cận.', 'Kết bài: nói rõ quy tắc chính áp dụng ra sao.'],
    checklist: ['Bài có 200–300 từ.', 'Mình nêu mức độ đồng ý rõ ràng.', 'Ví dụ về ngoại lệ hỗ trợ quan điểm thay vì làm nó mâu thuẫn.', 'Kết bài nhất quán với luận điểm mở bài.'],
  },
  {
    id: 'writing-essay-07',
    type: 'essay',
    difficulty: 'exam',
    title: 'Feedback or More Assessments',
    prompt: 'Some universities aim to improve learning by increasing the number of graded assessments, while others give students fewer graded tasks and more opportunities to revise their work. Discuss both approaches and explain which should be prioritised.',
    hint: 'So sánh hai cách theo một tiêu chí, chẳng hạn chất lượng thông tin phản hồi hoặc khả năng sửa lỗi.',
    explanation: 'Bài mẫu thừa nhận kiểm tra thường xuyên giúp nhận ra lỗ hổng, rồi giải thích vì sao cơ hội áp dụng phản hồi được ưu tiên. Khi sửa, hãy phân biệt phát hiện vấn đề với việc thật sự sửa vấn đề và nối so sánh vào quyết định của bạn.',
    model: `Universities can encourage students to work consistently through frequent graded tasks or use fewer marks and give students more chances to revise. Both approaches can help students identify gaps, but I would prioritise revision because it makes feedback part of the learning process.

Frequent assessment can encourage students to keep up with a subject. A weekly quiz in an introductory mathematics course could show that a student understands equations but has difficulty reading graphs. It also gives the lecturer an opportunity to revisit a difficult concept before the final test. However, a class with several short deadlines may reward quick completion and leave little time to act on feedback. In that situation, a grade indicates a problem without helping the student resolve it.

Revision gives students the opportunity to test how well they understand the advice they receive. In a writing course, a tutor might explain that an essay uses examples without showing how they support its argument. A second draft requires the student to explain those connections. The tutor can then check whether the change improved the work. The main difficulty is staff time, so the course could use structured peer feedback on early drafts and reserve individual comments for the most important issues.

I would use short practice quizzes to check understanding and prioritise revision in larger assessments. This gives students regular information about their progress while ensuring that they have time to use feedback before their final work is graded.`,
    outline: ['Mở bài: chọn ưu tiên sửa bài dựa trên phản hồi.', 'Thân bài 1: bài chấm điểm thường xuyên phát hiện lỗ hổng, dễ thiếu thời gian sửa.', 'Thân bài 2: bản nháp thứ hai cho thấy sinh viên đã hiểu và dùng góp ý thế nào.', 'Kết bài: kết hợp kiểm tra ngắn với ưu tiên sửa bài lớn.'],
    checklist: ['Bài có 200–300 từ.', 'Mình phân tích được cả hai phương án.', 'Mình giải thích rõ tiêu chí cho lựa chọn ưu tiên.', 'Đề xuất trong kết bài dựa trên hai phần phân tích.'],
  },
  {
    id: 'writing-essay-08',
    type: 'essay',
    difficulty: 'exam',
    title: 'Sharing Local Air Quality Data',
    prompt: 'Some councils publish live air quality data collected by low-cost sensors. Discuss the benefits and risks of sharing this information, and explain how councils should present it to residents.',
    hint: 'Suy nghĩ về cả tốc độ tiếp cận và độ tin cậy. Đề xuất cách hiển thị giúp người đọc hiểu giới hạn của dữ liệu.',
    explanation: 'Bài mẫu chỉ ra một quyết định mà số liệu có thể hỗ trợ và một cách người xem có thể đọc sai số liệu. Khi sửa, hãy để đề xuất hiển thị gắn trực tiếp với rủi ro vừa nêu, chẳng hạn ghi rõ vị trí cảm biến và giải thích một lần đo cao.',
    model: `Live air quality data can help residents understand how conditions change across their town. Councils should share readings from low-cost sensors, provided the display explains what those measurements can support and directs readers to official advice when necessary.

A network of affordable sensors can show patterns that a single monitoring station may miss. Residents might notice that readings near a main road tend to rise during the morning rush, and community groups could ask the council to investigate whether school entrances face the same pattern. Publishing this information also allows residents to see where the sensors are located and suggest areas that might need further monitoring.

The risk is that a precise-looking number can be mistaken for a reliable reading for an entire neighbourhood. A sensor might be affected by nearby dust or humidity, and two locations may produce different values for reasons that are difficult to separate. A resident who sees one high reading may overestimate what it means for their own street. Councils should show the location and time of each measurement, indicate when a reading is unusual or uncertain and include a link to the relevant official advisory service. A graph over several days could give residents useful context for a sudden change.

Sharing sensor data is worthwhile when residents can understand its limits. A simple display with short explanations would make the information more useful for local questions while reducing the chance that people draw a broad conclusion from a single reading.`,
    outline: ['Mở bài: ủng hộ công bố dữ liệu kèm hướng dẫn hiểu.', 'Thân bài 1: mạng cảm biến có thể cho thấy biến động tại từng khu vực.', 'Thân bài 2: rủi ro suy rộng từ một số đo và cách hiển thị bối cảnh.', 'Kết bài: nhắc lại cách công bố hiệu quả.'],
    checklist: ['Bài có 200–300 từ.', 'Mình giải thích lợi ích và rủi ro riêng biệt.', 'Mình đưa ra đề xuất cụ thể về cách trình bày.', 'Mình tránh kết luận rằng một cảm biến đại diện cho cả khu vực.'],
  },
  {
    id: 'writing-essay-09',
    type: 'essay',
    difficulty: 'exam',
    title: 'Keeping Independent Shops in Town Centres',
    prompt: 'In some towns, independent shops are closing as rents rise. What problems can this create for local communities, and what measures could councils or property owners take?',
    hint: 'Giải thích cơ chế tạo ra vấn đề rồi nối từng biện pháp với nguyên nhân nó giải quyết.',
    explanation: 'Bài mẫu tránh coi mọi cửa hàng độc lập là giống nhau, đưa vấn đề về những dịch vụ ít được thay thế. Khi sửa, hãy chắc rằng mỗi biện pháp có chủ thể rõ và xử lý rào cản cụ thể như chi phí cố định hoặc thời hạn hợp đồng.',
    model: `When commercial rents rise, independent shops with narrow margins may leave a town centre. This can reduce the range of everyday services and leave premises empty. Councils and property owners can respond by making it easier for viable businesses to test a location and remain there while they build a customer base.

Closures matter when the next tenant does not provide a service that local residents use. For example, a shoe repair shop may earn less per square metre than a larger retailer, yet it allows people to maintain shoes rather than replace them. Residents without a car may need to travel further to find that service once the shop closes. Empty units can also reduce foot traffic for neighbouring businesses, although this depends on how quickly landlords find tenants and what kinds of shops move in.

Property owners could offer shorter trial leases that become longer agreements if a business attracts enough customers. This would reduce the risk of committing to a large fixed cost before demand is clear. A council could help several small traders share a stall or unit to test demand at lower cost. Eligibility could focus on services missing from the area and require traders to show how they could operate after the trial. That would make the scheme useful for testing businesses rather than paying indefinitely for rent they cannot cover.

Keeping a range of services in the town centre requires attention to what residents use and what businesses can afford. Trial leases and shared spaces would help match those needs without promising that every existing shop can stay.`,
    outline: ['Mở bài: nhận diện chi phí thuê cao và hậu quả đối với dịch vụ.', 'Thân bài 1: phân tích vì sao một số dịch vụ khó được thay thế.', 'Thân bài 2: đề xuất hợp đồng thử và không gian dùng chung.', 'Kết bài: kết nối nhu cầu địa phương với khả năng tồn tại của cửa hàng.'],
    checklist: ['Bài có 200–300 từ.', 'Mình trả lời cả câu hỏi về vấn đề lẫn biện pháp.', 'Mỗi biện pháp có người thực hiện và mục đích cụ thể.', 'Lập luận không khái quát quá mức từ một ví dụ.'],
  },
  {
    id: 'writing-essay-10',
    type: 'essay',
    difficulty: 'exam',
    title: 'Funding Urban Tree Cover',
    prompt: 'A council plans to increase tree cover but can initially fund planting in only a few streets. Should it prioritise the hottest streets or those where young trees are most likely to survive? Discuss both priorities and justify your recommendation.',
    hint: 'Cân nhắc lợi ích cần đạt và điều kiện để cây sống. Nêu quy tắc chọn đường khi ngân sách hạn chế.',
    explanation: 'Bài mẫu cân nhắc nhu cầu giảm nóng và xác suất cây sống, sau đó đưa ra tiêu chí kết hợp. Khi sửa, tránh chỉ chọn một phía mà bỏ qua chi phí để biến kế hoạch thành tán cây thực tế.',
    model: `When a council has limited money for tree planting, the first sites it chooses should address heat while giving new trees a reasonable chance of establishing. I would start with the hottest streets where the council can improve growing conditions within its budget.

Prioritising the hottest streets would direct shade towards residents who need it most. For example, a route between a housing estate and a bus stop may have little shade in the afternoon, making everyday trips less comfortable during summer. Planting along that route would eventually create a cooler place to walk. The benefits will take time, however, and a tree planted in compacted soil without enough water may fail before it produces much shade.

Choosing sites with favourable growing conditions would give the council more surviving trees for its initial spending. A wide verge with deep soil and an existing watering schedule might support several trees at modest cost. Yet such locations could already have gardens or existing shade. If the council selected them solely for the survival rate, the programme might increase overall tree cover while doing little for the people most exposed to heat.

The council should identify hot streets with regular pedestrian use, then estimate the cost of preparing and maintaining each site for several years. Some streets may only require larger planting pits and a watering plan. Those sites should go first. Where trees remain impractical, the council can plan for other shade measures. This approach directs investment towards heat relief and makes it more likely that planted trees will deliver the intended benefit.`,
    outline: ['Mở bài: ưu tiên đường nóng, có điều kiện tạo môi trường cây sống.', 'Thân bài 1: phân tích giá trị giảm nóng và rủi ro cây chết.', 'Thân bài 2: đánh giá hiệu quả trồng ở nơi thuận lợi và giới hạn về đối tượng hưởng lợi.', 'Kết bài: nêu quy tắc cân nhắc nhiệt độ, lượt đi bộ và chi phí duy trì.'],
    checklist: ['Bài có 200–300 từ.', 'Mình giải thích lợi ích và giới hạn của cả hai ưu tiên.', 'Đề xuất có tiêu chí cụ thể trong giới hạn ngân sách.', 'Ví dụ phục vụ lập luận và kết bài nhất quán với mở bài.'],
  },
]
