import type { Question } from './types'

interface Lecture {
  title: string
  transcript: string
  hint: string
  model: string
  explanation: string
  checklist: [string, string]
}

const lectures: Lecture[] = [
  {
    title: 'Captions at a community theatre',
    transcript: 'Let us look at a community theatre that added captions to its weekend performances. The theatre first placed a small screen high above the stage. Audience members could read every line, but they had to look away from the actors. The theatre then tested two smaller screens near the sides of the stage. During the trial, visitors could choose seats with a clear view of a screen. Staff asked them about the position of the text, the writing size and whether the captions appeared at the right time. Visitors said the second design made it easier to follow the story and watch the performance. The lesson is that access depends on how a service fits the experience as well as whether the service is offered.',
    hint: 'Ghi nhanh vị trí màn hình trước và sau khi đổi. Nghe câu cuối để tìm bài học chính.',
    model: 'The lecturer explains how a theatre made its captions easier to use. Its first screen was high above the stage, so people had to look away from the actors. The theatre tested two screens at the sides and asked visitors about readability and timing. The new positions helped visitors follow the story while watching the show. The example shows why the design of an accessible service matters.',
    explanation: 'Nêu mục tiêu giúp khán giả theo dõi buổi diễn, rồi nối vị trí màn hình với trải nghiệm xem. Hai màn hình bên sân khấu là thay đổi được thử, còn cỡ chữ và thời điểm hiện phụ đề là các mục được hỏi.',
    checklist: ['Đã giải thích vì sao màn hình trên cao gây khó cho khán giả?', 'Đã nêu cách thử màn hình bên sân khấu và bài học về khả năng tiếp cận?'],
  },
  {
    title: 'Comparing water on two model slopes',
    transcript: 'Today we are using two trays to study how water carries soil downhill. We filled both trays with the same soil and set them at the same angle. One tray had bare soil and the other was covered with a thin layer of dry leaves. We poured the same amount of water over each tray and collected the water that came out. In our classroom trial, the water from the bare tray looked darker because it contained more loose soil. The leaves softened the impact of falling water and slowed it across the tray. This demonstration helps explain why ground cover can matter after heavy rain. A real hillside also has roots and uneven ground, so we would need a separate study to predict what would happen there.',
    hint: 'Chia ghi chú thành ba phần: giữ giống nhau, thay một yếu tố, rồi quan sát kết quả.',
    model: 'The lecture describes a model of water carrying soil down a slope. The trays had the same soil, angle and amount of water. Only one tray had a layer of leaves. More soil came out of the bare tray because the leaves slowed the water and softened its impact. The lecturer says the model shows why ground cover matters, while a real hillside would require further study.',
    explanation: 'Điểm quan trọng là nhóm chỉ thay lớp lá phủ để so sánh. Phần giải thích về sườn đồi thật cho thấy giới hạn của mô hình, vì điều kiện thực tế có nhiều yếu tố hơn.',
    checklist: ['Đã nêu các điều kiện được giữ giống nhau và yếu tố được thay đổi?', 'Đã nêu kết quả nước đậm hơn và giới hạn khi áp dụng mô hình vào thực tế?'],
  },
  {
    title: 'What makes a borrowing service useful?',
    transcript: 'A neighbourhood tool library wanted to understand why some of its equipment was rarely borrowed. The staff initially counted loans and assumed that tools with few loans should be removed. A short conversation with members gave a different picture. Some people needed a drill only once a year, but borrowing it saved them from buying one. Other people wanted to use unfamiliar equipment and were unsure how to get started. The library kept the rarely used tools and offered a brief demonstration at collection. It then asked borrowers which jobs they were able to finish. The case shows that a borrowing service can create value even when loans are infrequent. Counting completed jobs gave the staff more useful information than looking at loan totals alone.',
    hint: 'Theo dõi sự thay đổi từ chỉ đếm lượt mượn sang hỏi người dùng đã làm được gì.',
    model: 'A tool library counted loans to decide which items to keep. Interviews showed that rarely borrowed tools could still be useful, especially when they saved people from buying equipment. Some members also needed help getting started. The library kept the tools, offered a demonstration and asked borrowers whether they completed their jobs. This gave staff a better measure of the service’s value than loan totals alone.',
    explanation: 'Bài nói nên phân biệt số lần một món đồ được mượn với lợi ích của lần mượn đó. Nhắc cả hai lý do từ người dùng và cách thư viện thay đổi việc đo kết quả.',
    checklist: ['Đã nêu hai điều thư viện phát hiện khi hỏi người mượn?', 'Đã giải thích vì sao việc hoàn thành công việc là một chỉ dấu hữu ích?'],
  },
  {
    title: 'Changing a school canteen queue',
    transcript: 'A school canteen tried a different layout after students complained about waiting for lunch. In the old arrangement, everyone joined one line, even if they only wanted a drink. In the trial, staff put drinks and prepared snacks by a separate counter. They recorded waiting times on the same weekday before and after the change. The shorter line helped students buying a single item, while the main counter still became busy when hot meals were served. Staff decided to keep the separate counter and prepare popular hot meals a little earlier. This example shows why it helps to observe different types of customers. One average waiting time could hide which part of the service was improving and where another change was needed.',
    hint: 'Ghi riêng hai nhóm người mua và kết quả của từng nhóm sau khi thay đổi.',
    model: 'The lecture describes a canteen trial that separated drinks and snacks from hot meals. Staff compared waiting times on the same weekday. Students buying a single item waited less, but the main counter remained busy when hot meals were served. The canteen kept the separate counter and planned to prepare popular meals earlier. The example shows how looking at different customers reveals issues that one average may hide.',
    explanation: 'Nói rõ kết quả khác nhau giữa hai quầy và quyết định của nhân viên. Việc so ngày giống nhau giúp hạn chế tác động của lịch trong tuần, còn kết luận chính là phải xem từng nhóm khách.',
    checklist: ['Đã phân biệt mức cải thiện ở quầy đồ uống và quầy món nóng?', 'Đã nối kết quả với hai quyết định tiếp theo của căng tin?'],
  },
  {
    title: 'Making colours easier to tell apart',
    transcript: 'Imagine that a museum uses coloured arrows to guide visitors through three different exhibitions. The designer originally used red, green and orange because those colours looked clear on a large computer screen. During a trial in the museum, some visitors found the arrows difficult to tell apart, especially in dim rooms. Staff solved the problem by pairing each colour with a different shape and adding the exhibition name to every sign. This meant people could still choose their route if two colours looked similar to them. The museum tested the new signs at several corners, where visitors had to make a decision. The main lesson is to test a design where people actually use it, and to give them more than one way to recognise information.',
    hint: 'Nghe hai cách nhận biết đường được thêm vào. Chú ý nơi bảo tàng thử các biển mới.',
    model: 'The lecturer uses a museum to explain how to make signs clearer. Some visitors could not distinguish the original arrow colours in dim rooms. The museum added a different shape for each route and wrote the exhibition name on each sign. Staff tested the signs at corners where visitors chose their direction. The example shows the value of providing several cues and testing them in the real setting.',
    explanation: 'Cụ thể hoá vấn đề: màu dễ phân biệt trên màn hình nhưng khó phân biệt trong phòng tối. Sau đó nhắc hai dấu hiệu bổ sung và lý do chọn các góc có điểm rẽ để thử.',
    checklist: ['Đã nhắc cả hình dạng và tên triển lãm trên biển mới?', 'Đã giải thích vì sao thử trong bảo tàng cho thông tin hữu ích hơn chỉ nhìn trên màn hình?'],
  },
  {
    title: 'Designing a better survey question',
    transcript: 'Consider a university survey that asks students whether seminars are interesting and easy to attend. Students have to choose one answer on a scale from strongly disagree to strongly agree. There is an obvious problem. A student might enjoy the seminar very much and still be unable to attend because it is scheduled during a work shift. Another student might find the seminar dull but attend every week because it fits their timetable. Both could select the middle of the scale, for entirely different reasons. The research team can separate the question into two items, one about how engaging the seminar is and one about practical barriers to attendance. For the second item, the team could ask about times, location and transport. Reviewing these answers separately helps the university decide what action to take. A problem with the material calls for different changes from a transport or timetable problem. Even the revised survey should be tested with a small group first. Researchers can ask students to explain how they understood each item, then revise terms that are being read in several ways.',
    hint: 'Ghi một ví dụ cho thấy hai người có thể chọn cùng mức điểm vì lý do khác nhau.',
    model: 'The lecturer explains why a survey should separate two questions about seminars. Students may enjoy a seminar but struggle to attend, while others may attend easily without finding it engaging. One rating cannot distinguish these cases. Asking separately about interest and attendance barriers would help the university decide whether to change teaching or practical arrangements. The lecturer also recommends checking how a small group interprets the revised questions before using the survey more widely.',
    explanation: 'Hai câu hỏi tách biệt giúp chọn hai nhóm giải pháp khác nhau. Bước thử trước với nhóm nhỏ kiểm tra cách người tham gia hiểu câu, không dùng để kết luận về toàn bộ sinh viên.',
    checklist: ['Đã giải thích vì sao lựa chọn ở giữa thang đo có thể che hai lý do khác nhau?', 'Đã nhắc cách tách câu hỏi, ý nghĩa đối với quyết định và mục đích thử trước?'],
  },
  {
    title: 'Testing two recipes without an order effect',
    transcript: 'Suppose a group of food science students wants to compare two versions of a biscuit. Version A uses the existing recipe and version B has a stronger spice flavour. If every participant tastes A before B, the order could influence the result. The stronger flavour might be more noticeable because the first sample was mild. In another comparison, a first sample might make people less sensitive to the one that follows. The students therefore divide participants into two groups. One group tastes A first and the other group tastes B first. They also give participants water between samples and label the plates with numbers so that the recipe names do not suggest a preference. When they analyse the responses, they look for any differences between the two tasting orders before combining the results. That step matters because changing order reduces a possible bias, but does not guarantee that the order effect has gone away. A result that appears in both orders gives the team more reason to believe the recipes themselves explain the difference in ratings.',
    hint: 'Theo dõi hai biện pháp khác nhau: đảo thứ tự nếm và che tên công thức.',
    model: 'The lecture explains how students can compare biscuit recipes without confusing recipe preference with tasting order. Participants are split so one group starts with each recipe. Water is provided between samples, and numbered plates hide recipe names. The researchers check ratings from both tasting orders before combining them. If the same preference appears in both groups, it is more likely to reflect the recipes, though order could still affect some ratings.',
    explanation: 'Nên nhắc cả thiết kế thử lẫn cách kiểm tra kết quả. Đảo thứ tự giúp giảm nhiễu do thứ tự, còn việc kết quả xuất hiện ở cả hai nhóm giúp lời giải thích về công thức đáng tin hơn.',
    checklist: ['Đã mô tả hai nhóm nếm theo thứ tự ngược nhau và vì sao dùng số trên đĩa?', 'Đã nêu cách đối chiếu hai nhóm trước khi gộp kết quả?'],
  },
  {
    title: 'Combining maps from different decades',
    transcript: 'A history team wants to show how a town expanded over fifty years. At first, that seems easy. Put the early map beneath a later map and compare the streets and the edge of the built area. But the maps were drawn at different scales. The older map also leaves out some footpaths, while the newer one includes them. If the team treats every visible difference as a change on the ground, it may confuse a change in mapping practice with a change in the town. To align the maps, the team uses features that appear in both, such as the stone bridge and the railway station. It then checks uncertain differences against photographs and planning records. The presentation uses a solid line for changes supported by several sources and a dotted line for those that remain uncertain. Even the dates need care. A map published in one year may have been surveyed several years earlier. The value of the comparison is that it shows where evidence agrees, and gives readers enough information to judge the less certain areas for themselves.',
    hint: 'Ghi ba việc khác nhau: căn bản đồ, kiểm tra nguồn khác và thể hiện chỗ chưa chắc chắn.',
    model: 'The lecture describes how historians compare maps to track town growth. Differences in scale and the details included can make apparent changes misleading. The team aligns maps using shared landmarks, then checks uncertain changes against photographs and records. Solid and dotted lines distinguish well-supported changes from uncertain ones. The lecturer also notes that publication and survey dates may differ. Together, these steps let readers see how strong the evidence is for each change.',
    explanation: 'Phân biệt sự thay đổi thật ở thị trấn với việc người vẽ bản đồ chọn thể hiện chi tiết khác nhau. Chỉ ra vì sao cần nguồn đối chiếu và cách đường nét giúp người đọc thấy mức chắc chắn.',
    checklist: ['Đã nêu ít nhất hai nguồn khác biệt có thể làm việc so sánh sai lệch?', 'Đã mô tả các mốc chung, nguồn bổ sung và cách trình bày thông tin chưa chắc chắn?'],
  },
  {
    title: 'Measuring the wait for public transport',
    transcript: 'A transport office used to report the percentage of buses that arrived within five minutes of the timetable. That number is easy to describe, and it does tell us something about scheduling. It can still miss how long people actually wait. Imagine a busy morning route where one bus is delayed, followed shortly by the next scheduled bus. Some passengers face a long gap, while the second bus may be recorded as on time. A route with few passengers could also carry the same weight in a city average as a route used by thousands. The office considered adding a second measure based on waiting times at selected busy stops. For frequent routes, it compared observed gaps between buses and took account of how many people were affected. It kept the scheduled arrival measure for less frequent routes, where people were more likely to plan around a specific departure. Collecting waiting data costs more, so it started with a sample of stops. The broader point is that the choice of measure depends on whether the question is about adherence to a timetable or about the passenger experience.',
    hint: 'Phân biệt xe đến đúng lịch và thời gian người đi thực sự chờ. Nghe lý do giữ cả hai cách đo.',
    model: 'The lecture compares bus punctuality with the time passengers actually wait. Two buses can arrive close together after a long gap, leaving many passengers waiting even when the second bus is recorded as on time. The office added waiting estimates at busy stops and considered how many people were affected. It kept timetable measures for less frequent routes. The choice of measure depends on whether the goal is to assess scheduling or passenger experience.',
    explanation: 'Ví dụ hai xe đến gần nhau giải thích hạn chế của số liệu đúng giờ. Sau đó trình bày cách đo cho tuyến thường xuyên và lý do giữ cách đo cũ cho tuyến ít chuyến.',
    checklist: ['Đã giải thích ví dụ khoảng trống dài dù xe thứ hai đúng giờ?', 'Đã nối hai cách đo với hai mục đích và tần suất chạy khác nhau?'],
  },
  {
    title: 'Priorities for a film archive',
    transcript: 'A small film archive receives a grant to make its collection available online. Its initial plan is to digitise the films with the highest public demand. This seems reasonable until conservators point out that some rarely requested reels are in poor condition. If the archive waits until their popularity rises, the footage may no longer be readable. The archive identifies two separate priorities. The first is preservation. Staff make digital copies of unstable material while it can still be recovered and keep those copies in a format suited to long term storage. The second is access. Staff select films for public release according to audience interest, available descriptions and permission from the rights holders. A film can be copied for preservation without being immediately published online. With a limited budget, the archive schedules fragile reels for early copying and prepares a smaller group of popular films for release. The team sets aside time to check permission and add enough information for viewers to understand each film. The example shows how treating preservation and access as different goals changes the order of the work and reduces the risk of losing material in the meantime.',
    hint: 'Chia ghi chú làm hai cột: lưu giữ và cho công chúng xem. Nghe xem nhóm ưu tiên gì ở mỗi cột.',
    model: 'The lecturer explains why a film archive separates preservation from public access. Popular films were first in line, but some little-used reels could become unreadable while waiting. The archive copies fragile films first for storage. It prepares a smaller group for public release based on interest, available descriptions and rights permissions. A copy can therefore be preserved before it is made public. This approach protects endangered material while still improving access.',
    explanation: 'Kể lại lý do kế hoạch ban đầu bỏ sót các cuộn phim dễ hỏng. Nêu rõ tiêu chí sao lưu và tiêu chí đưa lên mạng để làm nổi bật hai quyết định khác nhau.',
    checklist: ['Đã phân biệt bản sao lưu giữ với bản công bố trên mạng?', 'Đã nhắc tình trạng cuộn phim, quyền sử dụng và lý do thay đổi thứ tự công việc?'],
  },
]

export const retellLectureQuestions: Question[] = lectures.map((lecture, index) => {
  const id = `s-retell-${String(index + 1).padStart(2, '0')}`
  return {
    id,
    type: 'retell-lecture',
    difficulty: index < 5 ? 'foundation' : 'exam',
    title: lecture.title,
    prompt: 'Listen to the lecture. Then retell what you heard in your own words.',
    audio: { file: `${id}.mp3`, transcript: lecture.transcript },
    hint: lecture.hint,
    model: lecture.model,
    explanation: lecture.explanation,
    checklist: [...lecture.checklist, 'Đã kể lại bằng lời của mình trong thời gian cho phép?'],
  }
})
