import type { Difficulty, Question } from './types'

interface ListeningChoice {
  title: string
  transcript: string
  options: [string, string, string, string]
  answerIndex: number
  hint: string
  clues: [string, string, string, string]
}

function highlightSummary(number: number, difficulty: Difficulty, item: ListeningChoice): Question {
  const id = `l-summary-choice-${String(number).padStart(2, '0')}`
  return {
    id,
    type: 'highlight-correct-summary',
    difficulty,
    title: item.title,
    prompt: 'Listen to the recording. Select the paragraph that best summarises what you hear.',
    audio: { file: `${id}.mp3`, transcript: item.transcript },
    options: item.options,
    correct: [item.answerIndex],
    hint: item.hint,
    explanation: item.clues[item.answerIndex],
    clues: item.clues.map((clue, index) => index === item.answerIndex ? '' : clue),
  }
}

function missingWord(number: number, difficulty: Difficulty, item: ListeningChoice): Question {
  const id = `l-missing-word-${String(number).padStart(2, '0')}`
  return {
    id,
    type: 'select-missing-word',
    difficulty,
    title: item.title,
    prompt: 'The final word or phrase has been replaced by a beep. Select the option that best completes the recording.',
    audio: { file: `${id}.mp3`, transcript: `${item.transcript} [${item.options[item.answerIndex]}].` },
    options: item.options,
    correct: [item.answerIndex],
    hint: item.hint,
    explanation: item.clues[item.answerIndex],
    clues: item.clues.map((clue, index) => index === item.answerIndex ? '' : clue),
  }
}

export const listeningSummaryMissingQuestions: Question[] = [
  highlightSummary(1, 'foundation', {
    title: 'A repair desk at the library',
    transcript: 'The library opened a repair desk on Saturday mornings. The volunteers expected visitors to ask mainly about phones, but many people brought lamps, kettles and bags with broken zips. The volunteers show people how to check faults and try simple repairs themselves. When an electrical job needs specialist work, the desk tells the visitor where to get professional help. The library has found that these short visits make people more confident about looking after everyday objects. It measures success by what visitors learn, even when they leave with something that still needs repair.',
    options: [
      'The library runs a professional repair service for phones and other electrical goods. Its main aim is to send every visitor home with a working item.',
      'The library offers a place to learn simple repairs on everyday items. Volunteers guide visitors, refer specialist jobs elsewhere and value the skills people gain.',
      'The desk is designed to prevent visitors from repairing objects themselves. It mainly helps people find professionals who can do the work for them.',
      'The library created the repair desk after finding that few people knew where to buy phones and kettles. It now helps visitors compare replacement products.',
    ],
    answerIndex: 1,
    hint: 'Nghe câu kết để biết thư viện dùng tiêu chí nào để đánh giá thành công.',
    clues: [
      'Người nói cho biết trường hợp cần chuyên môn sẽ được giới thiệu ra ngoài. Thư viện ưu tiên việc học, kể cả khi đồ vật chưa sửa xong.',
      'Đoạn ghi âm nói về sửa đồ thông dụng, hỗ trợ học cách sửa và giới thiệu dịch vụ chuyên môn khi cần. Câu kết nhấn mạnh người dùng học được gì.',
      'Tình nguyện viên hướng dẫn người đến tự thử sửa những lỗi đơn giản.',
      'Điện thoại và ấm đun nước chỉ là ví dụ về đồ được mang tới. Mua đồ mới không phải mục đích của bàn sửa.',
    ],
  }),
  highlightSummary(2, 'foundation', {
    title: 'Planting near an apartment',
    transcript: 'Residents of an apartment block wanted to grow vegetables outside their building. They first planned to use the narrow garden by the entrance, but it received little sunlight for most of the year. A neighbour suggested growing herbs there and moving the vegetable boxes to a sunny corner near the laundry. The group tested both areas before spending money on permanent planters. They also made small signs that explain when to water each plant. Doing a short trial helped them find a practical place for each kind of plant and share the work more fairly.',
    options: [
      'Residents plan to replace the shaded garden with a laundry. They used their planting trial to show that neither part of the site can grow food.',
      'Residents kept all their vegetable boxes beside the entrance and installed permanent planters before deciding how to look after them.',
      'The apartment committee asked one neighbour to maintain all the plants. Signs were used to show visitors which vegetables they were allowed to take.',
      'Residents tested two areas before buying permanent planters. They matched plants to the light available and used signs to help share care of the garden.',
    ],
    answerIndex: 3,
    hint: 'Ghi hai quyết định về vị trí trồng và một thay đổi về cách chăm sóc.',
    clues: [
      'Khu giặt đồ là mốc vị trí của góc có nắng. Người dân không định thay khu vườn bằng phòng giặt.',
      'Rau được chuyển đến góc có nắng. Nhóm thử cả hai khu vực trước khi mua chậu cố định.',
      'Biển hướng dẫn thời điểm tưới cây giúp nhiều người chia sẻ việc chăm sóc.',
      'Nhóm thử hai nơi, dùng khu râm cho rau thơm, khu nắng cho rau và ghi hướng dẫn tưới để chia việc.',
    ],
  }),
  highlightSummary(3, 'foundation', {
    title: 'Numbers on the bus stop sign',
    transcript: 'A transport team changed the signs at several bus stops. Previously, a sign showed the route number, but someone taking the bus for the first time could not always tell which direction it went. The new design keeps the number and adds the final destination in large print. A small map shows where to change buses. The team asked new passengers to choose a stop using the old sign or the new one. More people chose correctly with the new design. Several said the destination name was the quickest clue. The team will now check if the maps are still easy to read when the stops are crowded.',
    options: [
      'A transport team added destination names and small maps to bus stop signs. New passengers found the correct stops more often in a trial, and the team plans another check in crowded conditions.',
      'A transport team changed bus routes so passengers would have fewer transfers. It found that removing maps let people choose stops more quickly.',
      'The new signs use maps in place of route numbers. The project tested the design with regular passengers during busy travel periods.',
      'A transport team tested how many people could read bus stop signs from inside a bus. It plans to increase the frequency of services based on those results.',
    ],
    answerIndex: 0,
    hint: 'Phân biệt mục đích đổi biển với lịch chạy xe. Để ý điều đã thử và điều sẽ thử.',
    clues: [
      'Biển mới giữ số tuyến, thêm điểm cuối và bản đồ. Người mới chọn đúng thường xuyên hơn, còn việc kiểm tra khi đông người là bước tiếp theo.',
      'Nhóm chỉnh biển chỉ dẫn. Đoạn ghi âm không nói họ đổi tuyến hoặc giảm số lần chuyển xe.',
      'Biển giữ số tuyến. Nhóm đã hỏi hành khách mới, còn điều kiện đông đúc sẽ được kiểm tra sau.',
      'Thử nghiệm yêu cầu người mới chọn điểm đón. Tần suất xe chạy không phải nội dung được đánh giá.',
    ],
  }),
  highlightSummary(4, 'foundation', {
    title: 'A quiet hour at the pool',
    transcript: 'Staff at a swimming pool wanted to make swimming easier for people who find noisy spaces tiring. During one hour each week, they turn off the music, reduce the number of announcements and leave one lane free for slower swimmers. Bookings are open to anyone who prefers this quieter setting. The staff asked visitors which changes helped most. Some mentioned the sound, but several said that knowing exactly what to expect was just as important. The pool now publishes the quiet hour schedule online, and it explains what will happen if a lesson has to use the quiet lane.',
    options: [
      'The pool set up an exclusive training period for swimmers who need a faster lane. It adjusted staffing and asked participants whether lessons should last longer.',
      'The pool reduced noise all week and removed the online schedule. Visitors said the main benefit was having more time for their swimming lessons.',
      'The pool offers a weekly session with less noise and space for slower swimmers. Visitor feedback showed that clear information about the session also mattered.',
      'The pool changed its announcements so staff could explain lane rules more often. It asks visitors to check online before every class because lanes cannot be reserved.',
    ],
    answerIndex: 2,
    hint: 'Nghe phần sau phản hồi của khách để nhận ra lợi ích thứ hai.',
    clues: [
      'Buổi này dành cho bất cứ ai muốn không gian yên tĩnh, và làn riêng phục vụ người bơi chậm.',
      'Chương trình diễn ra một giờ mỗi tuần. Hồ bơi đăng lịch lên mạng.',
      'Tắt nhạc và bớt thông báo giúp giảm ồn. Nhiều khách còn nói họ cần biết điều gì sẽ diễn ra, nên hồ bơi đăng lịch và quy định làn bơi.',
      'Hồ bơi giảm thông báo, dành một làn cho người bơi chậm và thông báo trước về trường hợp ngoại lệ.',
    ],
  }),
  highlightSummary(5, 'foundation', {
    title: 'Sorting surplus bread',
    transcript: 'A bakery started sending its unsold bread to a community kitchen. At first the drivers collected whatever was available, which meant the kitchen sometimes received too much of the same bread. The bakery and kitchen then agreed on a simple weekly list. On Monday the kitchen names what it can use and how much space it has. The bakery records the loaves before pickup and freezes any suitable extras for another day. Since the change, the kitchen has been able to plan meals in advance. The bakery also spends less time handling donations because the drivers know which boxes to collect.',
    options: [
      'The bakery stopped donating unsold bread and started giving money to the kitchen. The change helped the kitchen make better use of its freezer.',
      'The bakery and kitchen agreed to share their weekly needs and available space. Matching donations to those needs made meal planning and collection easier.',
      'The kitchen began collecting a larger variety of bread without telling the bakery what it needed. It solved shortages by accepting as much bread as the drivers could carry.',
      'The bakery planned different meals for the kitchen every week. Donations became easier because the drivers planned menus and brought the ingredients to the bakery.',
    ],
    answerIndex: 1,
    hint: 'Ghi lại vấn đề trước khi dùng danh sách và hai kết quả sau khi đổi cách làm.',
    clues: [
      'Tiệm bánh vẫn quyên góp bánh. Bánh dư phù hợp có thể được đông lạnh để dùng hôm khác.',
      'Bếp báo nhu cầu và chỗ chứa trước, rồi tiệm chuẩn bị đúng các thùng. Bếp dễ lên thực đơn và tài xế dễ lấy hàng hơn.',
      'Danh sách giúp bếp báo trước những gì có thể dùng và sức chứa. Việc lấy mọi thứ có sẵn là cách cũ.',
      'Bếp tự lên thực đơn. Tiệm bánh ghi số bánh và tài xế lấy các thùng đã định.',
    ],
  }),
  highlightSummary(6, 'exam', {
    title: 'Assessing a delivery trial',
    transcript: 'A city trial measured whether shifting shop deliveries away from the morning peak would reduce congestion. Early counts suggested a considerable improvement on the busiest road. However, the researchers had placed their counters only on that road. When they later added two parallel streets, they found that some vans had simply moved to a nearby route and returned to their original schedule. Total traffic across the area still fell, but by much less than the initial figures implied. The council will continue the trial with monitoring across the whole district. Its transport team argues that a useful measure must show whether a policy solves a problem throughout the area, or merely shifts it somewhere harder to see.',
    options: [
      'Moving deliveries away from the morning peak eliminated most van traffic throughout the district. The council therefore plans to end the trial and make its timetable permanent.',
      'Extra monitoring found that the delivery plan caused total traffic to rise. The council will replace road counters with reports from businesses receiving deliveries.',
      'The busiest road was the only one with reliable traffic data. The council plans to monitor it more often because disruption on the smaller streets was unrelated to the trial.',
      'A delivery trial initially looked more effective than it was because the first counts covered one road. Wider monitoring showed a smaller overall reduction and will continue.',
    ],
    answerIndex: 3,
    hint: 'So sánh kết quả ở một tuyến đường với kết quả khi đo trên cả khu vực.',
    clues: [
      'Một phần xe chỉ đổi tuyến, nên mức giảm toàn khu vực nhỏ hơn kết quả ban đầu. Hội đồng vẫn tiếp tục thử nghiệm.',
      'Tổng lưu lượng vẫn giảm. Hội đồng sẽ mở rộng đo đạc chứ không đổi sang thu báo cáo kinh doanh.',
      'Việc xe chuyển sang đường song song giải thích chênh lệch giữa kết quả ban đầu và kết quả toàn khu vực.',
      'Chỉ đếm trên một đường làm hiệu quả có vẻ lớn. Khi mở rộng đo, số liệu vẫn giảm nhưng giảm ít hơn.',
    ],
  }),
  highlightSummary(7, 'exam', {
    title: 'A trial of refill stations',
    transcript: 'A university installed water refill stations to reduce the number of disposable bottles sold on campus. Sales dropped sharply near the first station, which was placed beside a sports hall. The project team initially assumed that the same result would follow at every location. However, a second station in a remote corridor went largely unused, even though it dispensed exactly the same water. Interviews revealed that many students did not know it was there and would not leave their usual route to look for it. The team now plans to place new stations along busy paths, add signs in buildings and monitor bottle sales across the campus. The first result was promising, but location and visibility will influence whether the approach works at a larger scale.',
    options: [
      'Refill stations reduced bottle sales at one visible location, but a less accessible station was rarely used. The university will improve placement and signage and monitor wider results.',
      'All refill stations were popular because the water was identical. The university will increase its supply of disposable bottles until it can introduce new water filters.',
      'The project team found that adding directional signs alone was enough to cut disposable bottle sales across campus. It therefore regards placement as less important.',
      'Students avoided the first refill station because they distrusted the drinking water. A second station was more successful because it was farther from crowded routes.',
    ],
    answerIndex: 0,
    hint: 'Nghe điểm khác nhau giữa hai trạm và điều nhóm dự định thử tiếp.',
    clues: [
      'Kết quả tại nhà thể thao tốt, còn trạm ở hành lang xa ít người dùng. Nhóm sẽ chọn đường đông, gắn biển và theo dõi số bán toàn trường.',
      'Hai trạm dùng cùng nước nhưng mức sử dụng khác nhau. Nhóm muốn giảm bán chai dùng một lần.',
      'Biển chỉ dẫn mới là kế hoạch. Người nói cũng nhấn mạnh vị trí ảnh hưởng đến kết quả.',
      'Trạm gần nhà thể thao có kết quả tốt hơn. Phỏng vấn cho thấy nhiều sinh viên không biết trạm thứ hai ở đâu.',
    ],
  }),
  highlightSummary(8, 'exam', {
    title: 'An oral history collection',
    transcript: 'An oral history team wanted to record how a district changed after the local railway closed. The first interviews were with shop owners and former railway staff. Their accounts were detailed, but they often focused on the same years and the same streets. The team invited people from different parts of the district to listen to short extracts and identify which stories were absent. After that, it added interviews with farm workers, new residents and people who had left the district but still visited family. The researchers kept conflicting accounts when speakers remembered events differently, and labelled each story with its source and approximate date. They wanted the collection to show how experience varied, rather than make all memories fit one version of events.',
    options: [
      'The team replaced interviews with rail staff because it could not confirm their dates. It asked residents to vote on the most reliable memories and published only the winners.',
      'The researchers collected memories mainly from newcomers as part of a railway reopening campaign. They combined the interviews into one version to avoid confusing visitors.',
      'An oral history team broadened its pool of interviewees after hearing whose stories were missing. It kept conflicting memories with source details to reflect different experiences.',
      'A railway archive examined property records from a single street. It identified one account that explained the district and excluded those that described different years.',
    ],
    answerIndex: 2,
    hint: 'Theo dõi lý do họ mời thêm người và cách họ xử lý hai ký ức trái nhau.',
    clues: [
      'Nhóm mời thêm người, giữ các chuyện trái nhau và ghi nguồn. Không có bước bỏ phiếu chọn ký ức đúng.',
      'Bộ sưu tập kể về thay đổi sau khi đường sắt đóng. Nhóm giữ nhiều ký ức riêng biệt.',
      'Các cuộc phỏng vấn đầu hẹp về thời gian và địa bàn. Nhóm bổ sung người kể và ghi nguồn cho các câu chuyện khác nhau.',
      'Nguồn chính là phỏng vấn nhiều nhóm người trong khu vực, kể cả người đã chuyển đi.',
    ],
  }),
  highlightSummary(9, 'exam', {
    title: 'Lighting the reserve path',
    transcript: 'The council considered installing brighter lighting along a path that crossed a small nature reserve. In a survey, some residents said extra light would make the route feel safer on winter evenings. Ecologists warned that strong light could disturb animals that move along the creek at night. An evening inspection revealed a practical alternative: most people reporting poor visibility were describing two short sections near the road, not the darker stretch beside the water. The council will test low, shielded lights at those points and keep the creek section unlit. After winter it will review comments from walkers and observations from ecologists before deciding whether the project should become permanent.',
    options: [
      'The council decided to light the entire path because residents consistently reported danger beside the creek. It will wait until the installation is permanent before studying wildlife.',
      'A trial will target two points near the road with shielded lights while leaving the creek dark. The council will review whether this meets walkers’ needs and protects wildlife.',
      'Ecologists identified the two roadside points as the most sensitive part of the reserve. The council will light the creek first and direct fewer walkers towards the road.',
      'The council cancelled new lighting everywhere after concluding that visibility was not a concern. It will assess the results using wildlife observations alone.',
    ],
    answerIndex: 1,
    hint: 'Xác định nơi sẽ có đèn và hai nhóm ý kiến cần đánh giá sau mùa đông.',
    clues: [
      'Những đoạn thường được phản ánh nằm gần đường. Chỉ hai điểm sẽ có đèn thử nghiệm.',
      'Giải pháp tập trung vào hai điểm khó nhìn, tránh rọi sáng khu vực suối và kiểm tra cả trải nghiệm người đi bộ lẫn tác động lên động vật.',
      'Lo ngại về động vật tập trung ở khu vực suối, nên đoạn đó giữ tối.',
      'Hội đồng thử đèn ở hai điểm. Đánh giá sẽ dùng cả phản hồi người đi bộ và quan sát của nhà sinh thái.',
    ],
  }),
  highlightSummary(10, 'exam', {
    title: 'Measuring learning in a workshop',
    transcript: 'A technical college offered a workshop in checking equipment instructions. The trainer used a short quiz at the end, and most students passed. Three weeks later, during practical classes, several of the same students could spot unfamiliar terms but still overlooked important warnings in longer instructions. The college realised that recognising a term in a quiz was easier than finding and applying a warning while completing a real task. It kept the quiz as a quick check of vocabulary, but added a separate activity in which students had to choose the correct steps using unfamiliar instructions. The trainers plan to repeat this activity later in the semester to see which skills students retain over time.',
    options: [
      'A technical college replaced practical sessions with a vocabulary quiz. Strong quiz scores indicated that students could already apply warnings to unfamiliar equipment.',
      'Students had trouble recognising unfamiliar terms in a quiz, so the trainers removed those terms from the equipment instructions and asked for fewer written tasks.',
      'The college plans to rely on written quiz results from the end of each semester. It found that the more realistic activity was less useful because students finished at different speeds.',
      'Quiz scores did not show whether students could apply warnings during real tasks. The college kept the vocabulary check and added a practical assessment to repeat later.',
    ],
    answerIndex: 3,
    hint: 'Tách mục đích kiểm tra từ vựng, khả năng áp dụng và khả năng ghi nhớ sau một thời gian.',
    clues: [
      'Điểm quiz tốt chưa chứng minh người học biết áp dụng cảnh báo. Trường bổ sung bài thực hành.',
      'Sinh viên nhận ra từ khó nhưng bỏ sót cảnh báo trong hướng dẫn dài. Từ mới không bị bỏ đi.',
      'Nhà trường giữ quiz để kiểm tra từ vựng nhanh và sẽ lặp lại hoạt động thực hành để theo dõi kỹ năng.',
      'Quiz đo khả năng nhận biết từ vựng, còn bài mới đo cách dùng hướng dẫn trong tình huống thực tế. Trường sẽ thử lại sau để theo dõi khả năng ghi nhớ.',
    ],
  }),
  missingWord(1, 'foundation', {
    title: 'Moving the seedlings',
    transcript: 'Our school garden starts plants in small pots indoors. When the weather gets warmer, it can be tempting to move them all outside on the same morning. But even a healthy young plant can lose water quickly in direct sun. For a few days, we put the pots outside for a short time in a covered area, then bring them indoors again. We increase the outdoor time each day. The place we use first is bright but protected, so the seedlings start in',
    options: ['cold storage', 'partial shade', 'a sealed box', 'direct sunlight'],
    answerIndex: 1,
    hint: 'Nghe cụm cuối mô tả ánh sáng và sự che chắn.',
    clues: [
      'Nhiệt độ ấm hơn là lúc bắt đầu chuyển cây ra ngoài. Đoạn không nói đưa cây vào kho lạnh.',
      'Khu vực đầu tiên có mái che, vẫn sáng nhưng không có nắng trực tiếp. “Partial shade” nghĩa là bóng râm một phần.',
      'Cây được đặt ngoài trời trong một khoảng ngắn ở chỗ có che chắn. Không có hộp kín.',
      'Người nói vừa nhắc nắng trực tiếp làm cây con mất nước nhanh.',
    ],
  }),
  missingWord(2, 'foundation', {
    title: 'Bicycles at the train station',
    transcript: 'A train station added a row of bicycle racks under a new roof. At first the project team counted bicycles once a week in the afternoon. They saw many empty spaces and assumed the racks were not needed. A staff member then checked just after the first morning trains. The racks were nearly full. Most riders took their bicycles home before the afternoon count. To find out how much space was needed, the team changed its survey to capture use at the',
    options: ['end of the week', 'bicycle workshop', 'old station entrance', 'busiest time'],
    answerIndex: 3,
    hint: 'Chú ý vì sao số đếm buổi chiều chưa phản ánh đúng nhu cầu.',
    clues: [
      'Vấn đề là đếm sai giờ trong ngày, chứ không phải đếm sai ngày trong tuần.',
      'Nhóm đang đo mức sử dụng giá để xe ở ga. Không có chỗ sửa xe trong đoạn.',
      'Người nói so sánh cùng một dãy giá để xe ở hai thời điểm.',
      'Buổi sáng gần kín chỗ, trong khi nhiều xe đã về trước khi đếm buổi chiều. Nhóm cần đo vào giờ đông nhất.',
    ],
  }),
  missingWord(3, 'foundation', {
    title: 'Tests in the museum store',
    transcript: 'Small museums often store paper objects such as maps and old letters. Volunteers at one museum saw a stain on two maps after a wet winter. The room did not feel cold, but readings taken during several weeks showed that moisture in the air was high, especially near the floor. The volunteers raised the boxes on shelves and brought in a device that collects water from the air. The new device helped the team reduce',
    options: ['the humidity', 'the room temperature', 'the number of maps', 'the shelf height'],
    answerIndex: 0,
    hint: 'Nghe tên vấn đề được phát hiện và chức năng của thiết bị mới.',
    clues: [
      'Các bản đồ bị ố khi hơi ẩm cao. Máy thu nước từ không khí giúp giảm độ ẩm.',
      'Đoạn nói phòng không lạnh. Mục đích của thiết bị là hút ẩm, không phải thay đổi nhiệt độ.',
      'Nhóm đưa hộp lên giá và xử lý không khí. Họ không bỏ bớt bản đồ.',
      'Tình nguyện viên đã nâng hộp lên khỏi sàn. Thiết bị hút ẩm không làm giá thấp xuống.',
    ],
  }),
  missingWord(4, 'foundation', {
    title: 'Measuring cold water',
    transcript: 'During a classroom experiment, groups measured how quickly ice melted in cups of water. One group used a small cup, and another used a much larger one. Although they started the timer together, their results were hard to compare because the larger cup held more water. The teacher asked them to choose cups of the same size and pour the water up to a marked line before adding the ice. In the new trial, each cup would therefore contain the same',
    options: ['type of glass', 'amount of melted ice', 'volume of water', 'reading on the timer'],
    answerIndex: 2,
    hint: 'Nhớ yếu tố làm hai nhóm khó so sánh và điều vạch trên cốc giúp kiểm soát.',
    clues: [
      'Chất liệu làm cốc không phải yếu tố gây khác biệt trong đoạn.',
      'Lượng băng tan là kết quả cần đo, nên không thể quy định kết quả giống nhau trước khi thử.',
      'Cốc cùng kích thước và rót tới cùng một vạch giúp các nhóm dùng cùng thể tích nước.',
      'Hai nhóm vốn đã bấm giờ cùng lúc. Câu cuối nói về lượng chất bên trong từng cốc.',
    ],
  }),
  missingWord(5, 'foundation', {
    title: 'Borrowing kitchen equipment',
    transcript: 'A community kitchen lends out mixers and other equipment. At the start of each class, the organiser used to tell everyone what was in each cupboard. By the end of the session, people had often forgotten where an item belonged. They left tools on the bench, and the next group spent time putting them away. The organiser put a photo on every shelf, showing the items normally kept there. The photos help each group return borrowed equipment to',
    options: ['a repair workshop', 'its correct shelf', 'the main reception desk', 'the person who bought it'],
    answerIndex: 1,
    hint: 'Nghe xem những bức ảnh được đặt ở đâu và cho thấy điều gì.',
    clues: [
      'Dụng cụ bị đặt sai chỗ sau lớp. Đoạn không nói chúng hỏng cần sửa.',
      'Mỗi giá có ảnh dụng cụ mình phải chứa, nên người mượn tìm được đúng vị trí để trả.',
      'Bếp dùng ảnh trong tủ và quanh các giá, chứ không yêu cầu trả đồ ở quầy lễ tân.',
      'Người mượn cần tìm vị trí của dụng cụ, không cần biết ai đã mua.',
    ],
  }),
  missingWord(6, 'exam', {
    title: 'Planning a walking survey',
    transcript: 'Researchers wanted to find out whether a new walking map made it easier for visitors to explore a coastal town. They planned to ask people in the square at midday, when it was easy to find volunteers. A colleague pointed out that this would mostly reach people who had already located the town centre. Anyone who became lost at the edge of town might never arrive at the survey point. The team added interview locations at the bus station and beside paths leading in from the coast. It also spread interviews across the day. These changes would give the team a better chance of hearing from',
    options: ['the people who drew the map', 'residents who never walk into town', 'visitors employed by the council', 'visitors with different experiences'],
    answerIndex: 3,
    hint: 'Xác định nhóm người dễ bị bỏ sót nếu chỉ khảo sát ở quảng trường.',
    clues: [
      'Nghiên cứu đánh giá trải nghiệm của người dùng bản đồ, không chủ yếu hỏi tác giả bản đồ.',
      'Nghiên cứu tập trung vào khách ghé thăm. Những người sống ở đây không phải nhóm được bổ sung.',
      'Việc mở thêm điểm phỏng vấn theo đường vào thị trấn liên quan đến trải nghiệm tìm đường, không liên quan đến công việc của khách.',
      'Phỏng vấn ở nhiều nơi và thời điểm giúp nhóm nghe cả khách đã tìm được trung tâm lẫn khách gặp khó khăn trên đường.',
    ],
  }),
  missingWord(7, 'exam', {
    title: 'Tides and a footbridge',
    transcript: 'A coastal town planned a replacement footbridge over a shallow channel. The first plan placed the deck low above the water to make access easy, and the drawings looked sensible when compared with photographs taken on calm summer days. An engineer asked the team to look at tidal records and inspect the channel after heavy winter rain. The two conditions could happen together, making the water rise much higher than the photographs suggested. The builders adjusted the deck height and added a longer ramp to keep the bridge accessible. Their revised design considers normal use and also allows for',
    options: ['temporary high water levels', 'smaller pedestrian numbers', 'a shorter construction period', 'a change in the summer opening hours'],
    answerIndex: 0,
    hint: 'Nghe điều có thể xảy ra khi triều và mưa lớn trùng thời điểm.',
    clues: [
      'Khi triều cao gặp mưa lớn, nước có thể dâng cao hơn mức trong ảnh mùa hè. Nhóm nâng mặt cầu để tính đến tình trạng này.',
      'Mặt cầu được nâng vì nước có thể dâng. Đoạn ghi âm không đề cập dự báo lượng người đi bộ.',
      'Độ cao mặt cầu và độ dài đường dốc được đổi để thích ứng với mực nước và bảo đảm lối đi.',
      'Ảnh mùa hè chỉ là bằng chứng ban đầu. Giờ mở cửa không phải lý do thay đổi thiết kế.',
    ],
  }),
  missingWord(8, 'exam', {
    title: 'Interviews about hybrid lessons',
    transcript: 'At the end of a term, a training centre asked adult learners what they thought of attending some lessons online. Many said they valued the flexibility, especially when their work shifts changed. But attendance records showed that participation went down when lesson recordings were the only material offered. In follow up interviews, people said they often put off watching until they knew someone would discuss the material with them. The centre retained short recordings and introduced a weekly meeting where learners could compare answers and ask questions. The aim was to preserve flexibility while encouraging',
    options: ['isolation between learners', 'longer work shifts', 'regular interaction', 'separate course fees'],
    answerIndex: 2,
    hint: 'Xem buổi gặp hằng tuần bổ sung điều gì mà video quay sẵn không có.',
    clues: [
      'Buổi gặp cho người học trao đổi và hỏi nhau, giúp giảm việc học cô lập.',
      'Đổi ca là lý do người học cần linh hoạt. Trung tâm không tìm cách kéo dài ca làm của họ.',
      'Buổi gặp tạo cơ hội thảo luận đều đặn, trong khi video ngắn vẫn cho phép người học sắp lịch linh hoạt.',
      'Đoạn nói về hình thức tham gia. Không có nội dung liên quan đến học phí.',
    ],
  }),
  missingWord(9, 'exam', {
    title: 'Sharing a field notebook',
    transcript: 'A wildlife group asked volunteers to record the birds they saw beside a river. After a few weeks, the entries looked difficult to compare. Some people wrote down each bird as it passed, while others entered one record for the whole flock. The coordinator decided to keep the old notes but mark any entries where the method was unclear. For future visits, everyone would count individuals for the same length of time from the same observation points. The change would make the new results more consistent and also help researchers avoid confusing a difference in the number of birds with a difference in',
    options: ['local nesting conditions', 'how the birds were counted', 'the depth of the river', 'the species living near the path'],
    answerIndex: 1,
    hint: 'Phân biệt thay đổi số chim thật với sự khác nhau do người quan sát làm gì.',
    clues: [
      'Không có so sánh điều kiện làm tổ. Vấn đề là tình nguyện viên dùng cách ghi số khác nhau.',
      'Một người ghi từng cá thể trong khi người khác ghi cả đàn thành một mục. Quy trình chung giảm chênh lệch do cách đếm.',
      'Đoạn nói về số chim dọc sông. Độ sâu của nước không liên quan đến sai lệch trong cách ghi.',
      'Đoạn không nói nhóm thay đổi loài muốn quan sát. Họ thống nhất thời lượng, địa điểm và đơn vị đếm.',
    ],
  }),
  missingWord(10, 'exam', {
    title: 'Reviewing campus maps',
    transcript: 'A college reviewed a printed map used by students on their first day. Buildings were colour coded, and most students could identify the correct building. Even so, some arrived late to their rooms. Walking the routes with new students revealed that stairways and doors shown on the map did not have matching signs. Students reached the right corridor but then could not tell where they needed to turn. The college kept the colour system and added the same letters to the map and to the signs at each junction. The change aimed to create a stronger connection between the map and',
    options: ['the subjects students chose', 'the process of paying course fees', 'the college timetable', 'the signs students see in person'],
    answerIndex: 3,
    hint: 'Nghe nơi hai bộ chữ giống nhau được đặt và mục đích của sự thống nhất này.',
    clues: [
      'Sinh viên đã biết tòa nhà cần đến. Việc chọn môn không làm họ đi sai ở hành lang.',
      'Các chữ cái mới dùng để định hướng tại ngã rẽ, không phải để hướng dẫn đóng học phí.',
      'Đến muộn là kết quả của việc khó tìm đường. Trường chỉnh biển và bản đồ, không thay thời khóa biểu.',
      'Những chữ cái giống nhau xuất hiện trên bản đồ và trên biển chỉ dẫn thực tế. Người học có thể đối chiếu ngay khi đến chỗ rẽ.',
    ],
  }),
]
