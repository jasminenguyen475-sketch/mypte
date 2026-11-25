import type { Difficulty, Question } from './types'

function itemId(stem: string, index: number) {
  return `s-${stem}-${String(index + 3).padStart(2, '0')}`
}

function difficultyAt(index: number): Difficulty {
  return index < 4 ? 'foundation' : 'exam'
}

function clip(id: string, transcript: string) {
  return { file: `${id}.mp3`, transcript }
}

interface RepeatItem {
  title: string
  sentence: string
  hint: string
  explanation: string
}

const repeatItems: RepeatItem[] = [
  {
    title: 'A lab notice',
    sentence: 'Please wash your hands before you enter the laboratory.',
    hint: 'Tách hành động ở đầu câu và điều kiện ở cuối câu.',
    explanation: 'Giữ nguyên “your hands” và “before you enter”. Luyện nói liền “enter the laboratory” để tránh ngắt trước danh từ.',
  },
  {
    title: 'Collecting equipment',
    sentence: 'The new microphones are ready to collect from our office.',
    hint: 'Nghe chủ ngữ dài trước, rồi nghe nơi nhận thiết bị.',
    explanation: '“The new microphones” có mạo từ và dạng số nhiều. Nhắc lại “from our office” để giữ đúng người và nơi nói đến.',
  },
  {
    title: 'A campus tour',
    sentence: 'Our guide will meet the group outside the main entrance.',
    hint: 'Nhớ ai làm gì trước khi nhớ thông tin về địa điểm.',
    explanation: 'Cụm “will meet the group” chứa trợ động từ và mạo từ. Đọc liền “outside the main entrance” để cụm địa điểm nghe tự nhiên.',
  },
  {
    title: 'A course reminder',
    sentence: 'You can download the lecture notes after the class finishes.',
    hint: 'Nghe từ chỉ thời điểm nối hai vế và ghi nhớ cụm danh từ ở giữa.',
    explanation: 'Đừng bỏ “can” hoặc “the”. “The class finishes” ở số ít, nên nghe lại âm cuối trong “finishes”.',
  },
  {
    title: 'A project schedule',
    sentence: 'If the fieldwork is delayed, we may have to revise the schedule for the whole project.',
    hint: 'Nhớ điều kiện ở vế đầu, rồi mới nhắc lại việc có thể phải làm.',
    explanation: 'Giữ nguyên “may have to” vì cụm này thể hiện khả năng phải đổi lịch. Nhắc đủ phần cuối “for the whole project” để không làm mất phạm vi của thay đổi.',
  },
  {
    title: 'Using the online catalogue',
    sentence: 'Several of the documents we requested were only available through the university’s online catalogue.',
    hint: 'Nghe cụm “we requested” như một nét mô tả thêm về tài liệu.',
    explanation: 'Chủ ngữ chính là “several of the documents”, vì vậy câu nói “were”. Đừng để cụm “we requested” làm bạn đổi trật tự từ.',
  },
  {
    title: 'A consultation update',
    sentence: 'The department will publish its recommendation after it has reviewed all the responses from the consultation.',
    hint: 'Chia câu ở “after” rồi giữ hai cụm chính ở vế sau.',
    explanation: 'Nghe đủ “it has reviewed” và “all the responses”. “Its recommendation” nói về đề xuất của chính khoa, nên nhắc lại “its” đúng vị trí.',
  },
  {
    title: 'A comparison in a lecture',
    sentence: 'Although the first method took longer, it produced more consistent results across all three samples.',
    hint: 'Giữ “Although” để thể hiện sự đối lập, rồi nhớ cụm so sánh.',
    explanation: 'Vế hai có “more consistent results”, còn “across all three samples” nói kết quả nhất quán ở đâu. Khi nghe lại, kiểm tra có giữ đủ “all three” không.',
  },
]

interface SituationItem {
  title: string
  scenario: string
  hint: string
  model: string
  explanation: string
  checklist: string[]
}

const situationItems: SituationItem[] = [
  {
    title: 'Sharing a classroom desk',
    scenario: 'Your classmate has placed a bag on the last free chair. You want to sit there so you can see the slides. Ask them to move the bag and explain why you need the seat. What would you say?',
    hint: 'Đề nghị trực tiếp bằng một câu ngắn, sau đó giải thích lý do.',
    model: 'Hi, would you mind moving your bag so I can sit here? This is the last free seat, and I can see the slides clearly from here. I can wait while you make some room. Thanks for your help.',
    explanation: 'Bài mẫu nhờ bạn cùng lớp dời túi, giải thích nhu cầu nhìn rõ bài trình chiếu rồi chờ họ sắp xếp. Bạn có thể nói “Would you mind moving your bag?” để đề nghị nhẹ nhàng.',
    checklist: ['Đã nhờ dời túi trực tiếp và lịch sự?', 'Đã giải thích cần nhìn rõ bài trình chiếu?'],
  },
  {
    title: 'Arriving late to a study group',
    scenario: 'You agreed to meet your study group at four. Your bus has broken down, and you expect to arrive twenty minutes late. Call a group member, explain the delay and suggest what they can do while they wait. What would you say?',
    hint: 'Nêu giờ đến mới và đề nghị một việc cụ thể để nhóm bắt đầu.',
    model: 'Hi, I’m sorry, but the bus has broken down and I’ll be about twenty minutes late. I should get there around four twenty. Could you start by comparing your answers to the first page? I’ll join you as soon as I arrive.',
    explanation: 'Bài mẫu kết hợp thời gian dự kiến với một bước nhóm có thể thực hiện ngay. Kiểm tra bạn có nói 4:20, thay vì lặp lại 4:00, và đã đưa ra một đề nghị hữu ích.',
    checklist: ['Đã báo nguyên nhân và giờ đến dự kiến?', 'Đã đề nghị một việc nhóm có thể làm ngay?'],
  },
  {
    title: 'Finding a lost umbrella',
    scenario: 'You left a blue umbrella in a lecture theatre yesterday afternoon. Speak to a member of staff at the information desk. Describe the umbrella, say where you were sitting and ask how to get it back. What would you say?',
    hint: 'Mô tả đồ vật và vị trí trước khi hỏi về cách nhận lại.',
    model: 'Hello, I think I left a blue umbrella in the lecture theatre yesterday afternoon. I was sitting near the aisle in the third row. Has anyone handed it in? If it’s been found, could you tell me where I should go and whether I need to show my student card?',
    explanation: 'Màu sắc và vị trí chỗ ngồi giúp nhân viên tìm đúng đồ vật. Số hàng ghế có thể là chi tiết bạn tự chọn miễn phù hợp. Hãy nhớ kết thúc bằng câu hỏi về cách nhận lại.',
    checklist: ['Đã nêu màu, thời điểm và vị trí?', 'Đã hỏi rõ cách nhận lại ô?'],
  },
  {
    title: 'Swapping a presentation order',
    scenario: 'Your group is presenting second in class, but one member cannot arrive until halfway through the session. Ask another group if they would be willing to present before you. Explain why and offer to help them prepare while they wait. What would you say?',
    hint: 'Xác định bạn cần đổi thứ tự với ai, rồi nói rõ hai bên sẽ làm gì.',
    model: 'Hi, would your group be willing to present before ours today? One of our members can’t arrive until halfway through the session, and we need them for the demonstration. If you’re happy to switch, I can help you set up your slides while we’re waiting. I’ll also check the change with our tutor.',
    explanation: 'Bài mẫu đề nghị nhóm kia lên trước, giải thích lý do cần đợi thành viên và chủ động hỗ trợ chuẩn bị. “If you’re happy to switch” cho người nghe cơ hội từ chối.',
    checklist: ['Đã đề nghị đúng chiều đổi thứ tự?', 'Đã giải thích và đề nghị giúp nhóm kia?'],
  },
  {
    title: 'Requesting a recording alternative',
    scenario: 'Your course requires you to record a short interview by Friday. The person you arranged to interview can now meet only on Monday, and the course instructions allow an alternative with your tutor’s approval. Ask your tutor to approve a phone interview on Thursday with someone else. Explain why that person is suitable. What would you say?',
    hint: 'Giữ đủ bốn chi tiết: hạn thứ Sáu, lịch mới, đề xuất thứ Năm và lý do chọn người thay.',
    model: 'Hello, I wanted to ask about the interview due on Friday. My original interviewee is now only available on Monday. Would you approve a phone interview with another person on Thursday instead? She works in the same role, so she can answer the questions about that field. I can use the same questions and still submit the recording by Friday.',
    explanation: 'Bài mẫu phân biệt lịch thứ Hai của người cũ với phương án gọi người mới vào thứ Năm. Đề nghị xin duyệt phải rõ để giảng viên biết việc mình cần quyết định.',
    checklist: ['Đã xin phê duyệt và giữ đúng thứ Năm, thứ Sáu, thứ Hai?', 'Đã giải thích vì sao người thay phù hợp?'],
  },
  {
    title: 'Resolving a double booking',
    scenario: 'You and another club have booked the same campus room for Saturday afternoon. Your event needs a projector, but theirs has more guests than the other available room can hold. Speak to the other organiser and propose a fair solution. Ask what time their event could finish. What would you say?',
    hint: 'Nêu nhu cầu của cả hai nhóm, rồi đề nghị một cách chia giờ khả thi.',
    model: 'Hi, it looks like both clubs have booked this room for Saturday afternoon. We need the projector, and I understand the smaller room won’t fit your guests. Could we use this room at different times? What time do you think your event could finish? If we can start after you, I’ll check the arrangement with the bookings office.',
    explanation: 'Chia khung giờ giữ được máy chiếu và đủ chỗ cho khách. Câu hỏi về giờ kết thúc giúp làm rõ phương án. Nếu chỉ yêu cầu nhóm kia chuyển phòng, bạn bỏ qua giới hạn về sức chứa.',
    checklist: ['Đã công nhận cả nhu cầu máy chiếu và sức chứa?', 'Đã đề xuất phương án công bằng và hỏi giờ kết thúc?'],
  },
  {
    title: 'Giving a colleague private feedback',
    scenario: 'A teammate keeps sending updates in the group chat after midnight. Two members have said this makes it hard to sleep, but you know the teammate often works late. Speak to them privately. Acknowledge their effort, explain the issue and suggest how they could share updates without disturbing others. What would you say?',
    hint: 'Cảm ơn trước, mô tả ảnh hưởng, rồi đề nghị giải pháp thay vì quy lỗi.',
    model: 'Hi, could we talk about the project chat for a moment? I appreciate you keeping us updated, especially when you’re working late. A couple of people have told me the overnight notifications wake them up. Could you schedule non-urgent messages for the next morning or add updates to our shared document? We can still use the chat for anything urgent.',
    explanation: 'Bài mẫu thừa nhận đóng góp rồi đề cập vấn đề bằng hành vi cụ thể. Việc hẹn giờ gửi tin hoặc dùng tài liệu chung cho phép người đó tiếp tục cập nhật khi làm việc muộn.',
    checklist: ['Đã ghi nhận nỗ lực và nêu ảnh hưởng một cách tế nhị?', 'Đã đưa ra phương án khác cho cập nhật không gấp?'],
  },
  {
    title: 'Flagging an accessible route',
    scenario: 'You volunteer at a university welcome event. The signs send visitors up a staircase, but you have been asked to ensure everyone can reach the registration desk. There is a step-free route through a side entrance that may be locked. Tell the event supervisor what you noticed and ask for two changes before visitors arrive. What would you say?',
    hint: 'Chuyển vấn đề thành hai việc cần làm trước khi khách tới.',
    model: 'Hi, I noticed the signs to registration direct everyone up the stairs. There’s a step-free route through the side entrance, but I’m not sure whether the door is unlocked. Could we check that entrance now and make sure it stays open during registration? Could we also put a sign at the main door pointing visitors to the step-free route?',
    explanation: 'Hai việc khác nhau là bảo đảm lối phụ mở và thêm biển chỉ hướng ở lối chính. Bài mẫu mô tả tình trạng hiện tại, sau đó hỏi trực tiếp người có thể xử lý.',
    checklist: ['Đã giải thích điểm bất tiện của biển hiện có?', 'Đã đề nghị kiểm tra cửa và sửa biển trước khi khách đến?'],
  },
]

interface DiscussionItem {
  title: string
  turns: [1 | 2 | 3, string][]
  hint: string
  model: string
  explanation: string
  checklist: string[]
}

const discussionItems: DiscussionItem[] = [
  {
    title: 'Repairing bikes at a student workshop',
    turns: [
      [1, "I think the bicycle club should offer a free repair workshop. I keep seeing students stop riding when they get a flat tyre because taking a bike to a shop costs more than they expect."],
      [2, "That's a good idea, but we only have a few volunteers. If everyone arrives at once with a different problem, some people could wait all afternoon and still go home without getting help."],
      [3, "What if we start with puncture repairs? We can show the same steps to a group, then let each person try on a spare wheel. We won't need many tools if we focus on one job."],
      [1, "That sounds easier to run, and we can prepare a list of parts and prices for students who need to fix their own bicycles later."],
      [2, "Let's use the booking form to limit each session to eight people. We could have two sessions on one Saturday."],
      [3, "At the end I'd ask people what other skills they want to learn. That could help us choose a topic for the next workshop."],
    ],
    hint: 'Ghi mục đích ban đầu, giới hạn về tình nguyện viên và cách nhóm thu hẹp buổi thử.',
    model: 'The students discussed a free bicycle repair workshop because shop repairs can be too expensive for some students. One speaker was worried that the club did not have enough volunteers to handle many kinds of repairs. The third suggested teaching puncture repairs as a group, using spare wheels for practice. They planned to run two Saturday sessions with eight places each, give participants information about parts and use their feedback to choose another workshop topic.',
    explanation: 'Ý quan trọng là nhóm chuyển từ sửa nhiều vấn đề sang dạy sửa lốp thủng. Khi tóm tắt, nối giới hạn nhân lực với giải pháp giới hạn quy mô và dùng bài tập chung.',
    checklist: ['Đã nêu lý do mở lớp và lo ngại về số tình nguyện viên?', 'Đã giải thích nhóm chọn dạy kỹ năng nào và tổ chức ra sao?'],
  },
  {
    title: 'Choosing beginners’ activities for orientation',
    turns: [
      [1, "Our orientation team needs an activity for students who don't know anyone yet. I thought we could organise a short campus treasure hunt. It would give them something to talk about while they explore."],
      [2, "I like getting people into small groups, but a race might make some new students uncomfortable. It could also be hard for people who don't know the buildings or need more time to move around."],
      [3, "Could we keep the stations and remove the race? Each group could visit three places in any order. At every station, a volunteer could explain what the service there actually does."],
      [1, "Yes, let's include the library desk, student support and the campus café. Groups can collect a stamp at each stop rather than compete for the fastest time."],
      [2, "We should show the shortest accessible route on the map and tell people it's fine to visit one station or all three."],
      [3, "I'll help write the map. Let's have the volunteers ask students at the last station which service they are most likely to use again."],
    ],
    hint: 'Chú ý nhóm giữ lại phần nào của trò chơi và thay đổi phần thi tốc độ như thế nào.',
    model: 'The group wanted an orientation activity that would help new students meet people and explore campus. The first speaker proposed a treasure hunt. The second warned that racing might exclude students unfamiliar with campus or needing more time to get around. The third kept the idea of stations but removed the competition. Students could visit service points in any order, using an accessible route and choosing how many stops to make. Volunteers would explain each service and gather feedback.',
    explanation: 'Nói rõ mục tiêu kết bạn và làm quen dịch vụ trước. Đối chiếu cuộc đua ban đầu với phiên bản linh hoạt, nơi người mới được tự chọn điểm đến và tốc độ.',
    checklist: ['Đã nhắc lý do cuộc đua gây khó khăn?', 'Đã mô tả đúng hoạt động mới và mục đích của tình nguyện viên?'],
  },
  {
    title: 'Deciding how to share seedlings',
    turns: [
      [1, "The botany class has grown more seedlings than it can use. We could give them away at the student centre rather than put them in the compost after the final lesson."],
      [2, "A giveaway could work, but many students live in rooms without gardens. If we put all the plants out together, people might take ones that need more space or direct sunlight than they have."],
      [3, "We could group them by growing conditions. Herbs in small pots can go on one table and plants for outdoor spaces on another. Each group could have a short sign with care instructions."],
      [1, "Good. We could put the bigger plants near the gate so people with bikes or a car don't have to carry them far."],
      [2, "And let's check with the gardening society before the event. They could take anything that hasn't found a home by the end of the day."],
      [3, "I'll ask them. We should count how many plants go from each table, so next semester we know what to grow if we want to do this again."],
    ],
    hint: 'Ghi cách phân loại cây và phương án khi còn dư cuối ngày.',
    model: 'The group discussed giving away surplus seedlings instead of composting them. One speaker worried that students without gardens might take plants unsuitable for their living conditions. Another suggested separate tables for small indoor pots and plants that need outdoor space, with care signs. They also wanted larger plants near the gate and planned to contact the gardening society about any leftovers. Counting plants taken from each table would help them plan a future giveaway.',
    explanation: 'Gắn trở ngại về không gian sống với cách chia bàn. Đừng nhầm câu lạc bộ làm vườn là nơi tổ chức chính. Nhóm chỉ nhờ họ nhận cây còn dư.',
    checklist: ['Đã phân biệt hai nhóm cây và lý do phân bàn?', 'Đã nhắc phương án cây dư và mục đích của việc đếm?'],
  },
  {
    title: 'Supporting students in evening classes',
    turns: [
      [1, "Students in my evening class say it's hard to visit the academic skills office. It closes before most people get to campus. Could a tutor offer a short help session before class one day a week?"],
      [2, "I see the benefit, but plenty of students arrive right at six because they come from work. If all the help is before class, the students with the least free time may still miss it."],
      [3, "We could ask students to send questions online first. The tutor might then make a ten-minute recording answering the most common ones, with a short live session for questions about individual assignments."],
      [1, "That makes sense. Let's ask for one recording on how to read an assignment brief, since that comes up in several subjects."],
      [2, "If the live session is held twice during the trial, I'd offer one before class and one after. That would show which time has more demand."],
      [3, "Good. We can collect anonymous feedback through the course page and use it to decide whether to keep both options."],
    ],
    hint: 'Tìm cách nhóm kết hợp hỗ trợ có thể xem lại và buổi hỏi đáp trực tiếp.',
    model: 'The students discussed how to provide academic support for evening classes after the skills office closes. A tutor session before class was the first proposal, but a second speaker noted that many people arrive directly from work. The third suggested collecting questions online and recording answers to common ones, with live help for individual assignments. The group also wanted to trial one session before class and one after and use anonymous feedback to decide what to continue.',
    explanation: 'Bản ghi xử lý câu hỏi chung. Buổi trực tiếp dành cho câu hỏi riêng và được thử ở hai thời điểm. Nêu sự khác nhau này trước khi thêm chi tiết chủ đề bản ghi.',
    checklist: ['Đã nhắc vì sao giờ trước lớp không phù hợp với tất cả?', 'Đã phân biệt bản ghi và buổi trực tiếp?'],
  },
  {
    title: 'Making an equipment loan scheme fairer',
    turns: [
      [1, "Our media course lends cameras for weekend projects, but bookings open half way through the Friday lecture. The same students get the best equipment every week because they can refresh the page while other people are taking part in class. I'd like to replace that system with a booking window."],
      [2, "Giving people longer to request a camera would help, but what happens when we still get more requests than cameras? Picking randomly each week sounds fair until students fall behind on a project because they have missed out several weeks in a row."],
      [3, "We could give priority to students with an approaching assessment deadline. If two groups have the same deadline, the group that borrowed a camera less recently could go first. We should leave one older camera available for last-minute requests from all students."],
      [1, "How would we check deadlines without asking everyone to send private details? We can use the course timetable for the standard assignments, but people sometimes have their own arrangements with a tutor."],
      [2, "A student with a different date could get a simple yes or no confirmation from the course office. The person running the booking system doesn't need to see why the date is different. I would also publish the priority rules so people can see what we consider before applying."],
      [3, "Let's try it for the next two assessment periods. We could count how often a group misses out more than once, and compare that with the number of cameras that sit unused. If we reserve a camera every week and nobody needs it, we should reconsider the reserve."],
      [1, "Agreed. The aim is to make it easier to borrow a camera at the right time. A better process would help with that even if we're unable to buy more equipment."],
    ],
    hint: 'Nhớ thứ tự ưu tiên, cách xác nhận hạn nộp và hai tiêu chí đánh giá thử nghiệm.',
    model: 'The students wanted to make camera loans fairer because opening bookings during a lecture favoured people who could watch the page. The first speaker proposed a longer booking window. The second pointed out that a lottery could still leave some groups without equipment several weeks in a row. The third suggested prioritising groups by deadline and, when dates were equal, how recently they had borrowed, while keeping one older camera for urgent requests. They considered how to verify exceptions without disclosing why a deadline differed and wanted to publish the rules. They agreed to trial the policy for two assessment periods, checking repeat rejections and unused cameras before deciding whether to retain the reserve.',
    explanation: 'Điểm phân biệt là mở cửa sổ đăng ký chỉ xử lý bất lợi lúc đăng ký. Tiêu chí hạn nộp và lịch sử mượn mới giải quyết thiếu thiết bị. Giữ cả hai ý để mạch ghi chú rõ.',
    checklist: ['Đã giải thích hai bất lợi và cách giải quyết từng bất lợi?', 'Đã nêu thứ tự ưu tiên, quyền riêng tư và tiêu chí thử?'],
  },
  {
    title: 'Measuring the success of a commuter breakfast',
    turns: [
      [1, "Last semester we put on a free breakfast for students who travel a long way to campus. The attendance sheet looked good, so I want to run it every week. People seemed much happier to talk when they could sit down with food before a nine o'clock lecture."],
      [2, "The numbers tell us how many meals we served, but the aim was to help commuters build connections. I talked to several students who took food straight to class. That isn't necessarily a problem, but it doesn't show that anyone who felt isolated actually met someone."],
      [3, "We could design the next trial to look at both things. One table could be for people picking up food quickly. Near the seating area, volunteers could invite students who have time to join a short conversation with people from different courses. We would keep the invitation optional."],
      [1, "I don't want volunteers to make people feel they have to sit down to get a meal. Would we need a different check-in process for people who choose the conversation table?"],
      [2, "We can just count the seats used. If we ask for feedback, let students fill it in anonymously, and ask whether they met someone new. We should also ask first whether they usually have enough time to stay. That tells us whether the timing of the event is part of the issue."],
      [3, "The timetable matters here. The Tuesday breakfast drew a lot of students, but the Thursday event was closer to the train arrival time. We could run the same version of the breakfast on both days for a month and compare the patterns before picking a regular day."],
      [1, "Let's do that. We'll report meals served separately from connections made. We may decide there is a benefit from both, but they answer two different questions."],
    ],
    hint: 'Tách hai mục tiêu: số bữa sáng và cơ hội làm quen. Ghi cách thử cho từng mục tiêu.',
    model: 'The group discussed whether a commuter breakfast helped students build connections. The first speaker supported expanding it based on turnout, while the second argued that meals served did not indicate whether anyone made a new connection. The third proposed a trial with a quick collection point and an optional conversation table. The students agreed people should be able to get breakfast without feeling pressured to stay. They would count seating use, ask anonymously about new connections and time available, and run the same activities on Tuesday and Thursday to compare them. Their report would present food distribution separately from social outcomes.',
    explanation: 'Số suất ăn và số người kết nối là hai kết quả khác nhau. Tóm tắt tốt cần nêu nguyên nhân nhóm thử cùng một cách tổ chức vào hai ngày và cách tránh ép người tham gia.',
    checklist: ['Đã phân biệt số suất ăn với mục tiêu kết nối?', 'Đã nêu hoạt động tự nguyện, phản hồi và cách so sánh hai ngày?'],
  },
  {
    title: 'Choosing a quiet room policy',
    turns: [
      [1, "The faculty has a small room set aside for students who need quiet time between classes. We often see a line outside, even though there are a few empty chairs inside. I think we should let people reserve a place on their phones so they don't spend their break waiting."],
      [2, "Bookings solve the queue only if people know roughly when they need the room. Some of the students who use it arrive without planning because the main building has become noisy. If the room is fully booked, those people may have nowhere to go when they actually need it."],
      [3, "Perhaps we could reserve a few places and leave the rest for people who walk in. A single short booking window could let a student plan around one class break. We should also put a sign near the entrance so people know whether the empty chairs are free."],
      [1, "What about late arrivals? If someone reserves a seat from one until one thirty but doesn't turn up, students outside may think it stays unavailable the whole time. That's one cause of the empty seats we see now."],
      [2, "Let's release a reserved seat after the first five minutes if it is unused. Students wouldn't have to explain why they're using the room. They only need to choose a time or check with the desk when they arrive."],
      [3, "We could test this for three weeks before putting any new technology in place. A staff member can tick how many seats are used and how many walk-ins are turned away at busy times. If waits don't improve, we'll look first at the number of seats set aside, rather than buying a booking system."],
      [1, "I like starting with the desk. Let's post the rules along with the hours. We can avoid the app entirely until we've seen whether the arrangement works."],
    ],
    hint: 'Tìm vì sao chỉ đặt trước sẽ tạo vấn đề mới, rồi ghi quy tắc giữ và nhả chỗ.',
    model: 'The group discussed queues for a faculty quiet room, even when some of its seats looked empty. The first speaker wanted advance reservations, but the second noted that some students need the room unexpectedly. The third proposed keeping walk-in seats alongside short reservations and marking which seats were free. The students decided that unused bookings should be released after five minutes and that no one would need to give a reason for using the room. They planned a three-week trial at the desk, counting seats used and walk-ins turned away. They would adjust the balance of seats before considering an app.',
    explanation: 'Ý cân bằng là giữ chỗ cho người đã lên lịch và người cần vào bất ngờ. Giải thích quy tắc năm phút rồi nêu cách đo nhu cầu trong thử nghiệm.',
    checklist: ['Đã giải thích nhu cầu của hai nhóm người dùng?', 'Đã nhắc quy tắc năm phút, cách thử và điều chưa quyết định?'],
  },
  {
    title: 'Reducing food waste in a teaching kitchen',
    turns: [
      [1, "The teaching kitchen throws out a lot of ingredients after our practical classes. I suggested buying smaller packets for each group. If everyone gets only what the recipe requires, we should have fewer open containers at the end of the day."],
      [2, "That could help with leftovers, but smaller packets often cost more per kilogram and produce more packaging. When we watched the Monday class, two groups opened fresh supplies while there were already open containers on another bench. I wonder if the problem is where we put the shared stock."],
      [3, "Could we keep opened ingredients at a central station, with clear labels and a supervisor? We could still prepare separate portions for ingredients where mixing them creates an allergy concern. The change would make it easier for groups to see what is already available."],
      [1, "I'd want to make sure students can still collect ingredients quickly. If they all line up at one station at the same time, the demonstration could run late. Maybe each group can send one person for its initial ingredients before the instructor does the demonstration."],
      [2, "Before comparing the costs, we need a starting point. We should weigh leftover food over two regular lessons and record how much new stock we opened. If we weigh only what goes into the bin, we might miss food moved to a fridge but never used."],
      [3, "Let's repeat the same recipes after changing the setup. We'll monitor waiting times and record what gets used the next day. We should save receipts so we can compare overall spending as well as the amount of rubbish."],
      [1, "So the recommendation is to test shared storage with safeguards. Smaller packets are an option if we find particular ingredients are still hard to manage."],
    ],
    hint: 'Phân biệt phương án mua gói nhỏ với phương án đặt nguyên liệu đã mở ở chỗ chung.',
    model: 'The students discussed reducing food waste in a teaching kitchen. The first speaker proposed smaller packets to limit leftovers, but the second pointed out their cost and packaging and noted that students opened new supplies when others were already available. The third suggested a supervised shared station, with separate portions where allergy risks required them. The group also considered preventing a queue by sending one person per group to collect ingredients. They agreed to measure waste and stock use before changing the setup, repeat the same recipes afterwards, and compare waiting time, later use of leftovers and cost before deciding whether smaller packets were necessary.',
    explanation: 'Nêu rõ bằng chứng nhóm dùng để đổi hướng, rồi phân biệt đo hiện trạng và đo sau thử. Chi tiết về dị ứng là điều kiện giữ an toàn, không phải mục tiêu chính của kế hoạch.',
    checklist: ['Đã nêu đề xuất đầu tiên và hai nhược điểm?', 'Đã nhắc điều kiện dị ứng, thời gian chờ và các số liệu dùng để so sánh?'],
  },
]

const repeatQuestions: Question[] = repeatItems.map((item, index) => {
  const id = itemId('repeat', index)
  return {
    id,
    type: 'repeat-sentence',
    difficulty: difficultyAt(index),
    title: item.title,
    prompt: 'Listen to the recording and repeat the sentence exactly as you hear it.',
    audio: clip(id, item.sentence),
    hint: item.hint,
    model: item.sentence,
    explanation: item.explanation,
    checklist: ['Đã giữ đúng thứ tự các cụm từ?', 'Đã nhắc lại cả từ ngắn và âm cuối?', 'Câu nói rõ và liền mạch?'],
  }
})

const situationQuestions: Question[] = situationItems.map((item, index) => {
  const id = itemId('situation', index)
  return {
    id,
    type: 'respond-situation',
    difficulty: difficultyAt(index),
    title: item.title,
    prompt: 'Listen to the situation. Say what you would say to the person.',
    audio: clip(id, item.scenario),
    hint: item.hint,
    model: item.model,
    explanation: item.explanation,
    checklist: [...item.checklist, 'Đã nói trực tiếp với người nghe bằng giọng phù hợp?'],
  }
})

const discussionQuestions: Question[] = discussionItems.map((item, index) => {
  const id = itemId('discussion', index)
  const transcript = item.turns.map(([speaker, line]) => `Speaker ${speaker}: ${line}`).join('\n\n')
  return {
    id,
    type: 'group-discussion',
    difficulty: difficultyAt(index),
    title: item.title,
    prompt: 'Listen to three people discussing a topic. Summarize the discussion in your own words.',
    audio: clip(id, transcript),
    hint: item.hint,
    model: item.model,
    explanation: item.explanation,
    checklist: [...item.checklist, 'Đã nối ý các diễn giả và diễn đạt bằng lời của mình?'],
  }
})

interface ReadItem {
  title: string
  passage: string
  hint: string
  explanation: string
}

const readItems: ReadItem[] = [
  {
    title: 'Learning in the campus garden',
    passage: 'The campus garden gives students a quiet place to work outside. On Friday mornings, a volunteer shows new visitors how to plant herbs and water young trees. At the end of each session, the group returns the tools to the shed.',
    hint: 'Ngắt sau cụm chỉ thời gian ở đầu câu thứ hai.',
    explanation: 'Đọc “On Friday mornings” thành một cụm rồi ngắt nhẹ. Giữ “at the end of each session” liền mạch và đọc rõ các âm cuối trong “herbs” và “trees”.',
  },
  {
    title: 'Why some shops display prices per unit',
    passage: 'Some shops show two prices next to each product. One tells you how much the whole packet costs. The other gives the price for a fixed amount, such as one hundred grams. This makes it easier to compare packets of different sizes.',
    hint: 'Nhấn “whole packet” và “fixed amount” để làm rõ sự khác nhau.',
    explanation: 'Câu thứ hai và thứ ba mô tả hai loại giá. Dùng nhịp tương tự ở “One tells you” và “The other gives”, rồi ngắt nhẹ trước ví dụ “such as one hundred grams”.',
  },
  {
    title: 'Observing birds from a distance',
    passage: 'Visitors can watch waterbirds from a low wooden platform beside the lake. The platform keeps people away from the birds’ nests, which are difficult to see among the reeds. Early in the morning, guides are available to explain how to identify the most common species.',
    hint: 'Để ý dấu phẩy trước “which” và cụm chỉ thời gian ở câu cuối.',
    explanation: 'Ngắt nhẹ sau “the birds’ nests” rồi đọc hết phần bổ sung. Giữ “among the reeds” và “the most common species” thành từng cụm, tránh dừng ở giữa.',
  },
  {
    title: 'A change to the workshop timetable',
    passage: 'The design workshop has moved to Tuesday afternoon because the main studio is being painted. Students should bring their sketches and arrive ten minutes early. Anyone who cannot attend can watch a recording and send questions to the tutor by the end of the week.',
    hint: 'Chia câu cuối quanh chủ ngữ dài và hai việc học sinh có thể làm.',
    explanation: 'Nói liền “Anyone who cannot attend” để rõ ai có thể xem lại. Sau đó phân biệt “watch a recording” và “send questions to the tutor”. Đọc trọn phần hạn chót ở cuối.',
  },
  {
    title: 'Mapping urban heat on foot',
    passage: 'Researchers who mapped temperatures along a shopping street found that shade mattered more than the direction of the footpath. However, the measurements were collected on a single afternoon, when wind speeds were unusually low. To test whether the pattern holds, the team will repeat its survey under a wider range of weather conditions.',
    hint: 'Chú ý mệnh đề ở chủ ngữ và chỗ chuyển ý trước giới hạn của nghiên cứu.',
    explanation: 'Đọc “Researchers who mapped temperatures” liền để không làm mất chủ thể. Ngắt ngắn sau “However” và đọc rõ âm cuối của “measurements”, “speeds” và “conditions”.',
  },
  {
    title: 'Making digital collections easier to search',
    passage: 'For decades, visitors searching the town archive relied on handwritten catalogues arranged by family name. Digitising those records made them easier to access, but it also exposed inconsistencies in older place names. Archivists now link alternative spellings to the most common version, so researchers can find relevant documents even when their search terms differ.',
    hint: 'Luyện cụm “handwritten catalogues” và “alternative spellings” trước khi đọc.',
    explanation: 'Ngắt sau “For decades”, rồi nhấn từ “but” để báo hiệu hệ quả ngoài dự kiến. Đọc cụm “even when their search terms differ” chậm vừa đủ để giữ rõ ý điều kiện.',
  },
  {
    title: 'A fee change and its limits',
    passage: 'Removing the entry fee increased weekday visits to the science centre, especially among school groups. Weekend attendance, by comparison, changed very little. The centre’s report suggests that weekends were already close to capacity, although it does not rule out other reasons, such as travel costs or the timing of temporary exhibitions.',
    hint: 'Giữ nhịp phần đối chiếu và câu cuối có nhiều ý phụ.',
    explanation: 'Ngắt hai bên “by comparison” để so sánh rõ ngày thường và cuối tuần. Khi đến câu cuối, đọc “although it does not rule out other reasons” thành một cụm trước khi thêm ví dụ.',
  },
  {
    title: 'Testing a quieter road surface',
    passage: 'When engineers compared two road surfaces, they found the newer design reduced tyre noise on dry days. Its advantage narrowed substantially after rainfall, particularly where traffic moved slowly. Because nearby residents reported a different pattern inside their homes, the study also measured noise indoors before recommending wider use of the new surface.',
    hint: 'Luyện trước “substantially”, “particularly” và cụm nguyên nhân ở câu cuối.',
    explanation: 'Nhấn “dry days” và “after rainfall” để người nghe nhận ra điều kiện khác nhau. Ngắt sau “inside their homes” rồi giữ cụm “before recommending wider use” liền mạch.',
  },
]

const readQuestions: Question[] = readItems.map((item, index) => ({
  id: itemId('read', index),
  type: 'read-aloud',
  difficulty: difficultyAt(index),
  title: item.title,
  prompt: 'Read the text aloud.',
  passage: item.passage,
  hint: item.hint,
  model: item.passage,
  explanation: item.explanation,
  responseSeconds: index < 4 ? 35 : 40,
  checklist: ['Đã đọc đủ từ, kể cả mạo từ và âm cuối?', 'Đã ngắt theo dấu câu hoặc cụm nghĩa?', 'Đã giữ âm lượng và tốc độ ổn định?'],
}))

interface ChartItem {
  title: string
  chartTitle: string
  unit: string
  values: [string, number][]
  hint: string
  model: string
  explanation: string
  checklist: string[]
}

const chartItems: ChartItem[] = [
  {
    title: 'Common items at a repair café',
    chartTitle: 'Items repaired at a community repair café',
    unit: 'items',
    values: [['Lamps', 24], ['Clocks', 15], ['Toys', 21], ['Fans', 12]],
    hint: 'Tìm nhóm cao nhất, thấp nhất và một cặp có số gần nhau.',
    model: 'This chart shows how many items were repaired at a community repair café. Lamps were the most common, at 24, followed by toys at 21. The café repaired 15 clocks and 12 fans. In total, the number of lamps repaired was twice the number of fans.',
    explanation: 'Nêu rõ biểu đồ đếm đồ đã sửa. Đèn đứng đầu, quạt thấp nhất và tỷ lệ là 24 so với 12. Những số này không cho biết quán nhận được bao nhiêu món chưa sửa.',
    checklist: ['Đã nêu biểu đồ đếm đồ được sửa?', 'Đã dùng đúng số cao nhất, thấp nhất hoặc tỷ lệ gấp đôi?'],
  },
  {
    title: 'Weekly workshop attendance',
    chartTitle: 'Attendance at a photography workshop',
    unit: 'people',
    values: [['Week 1', 12], ['Week 2', 16], ['Week 3', 16], ['Week 4', 22], ['Week 5', 18]],
    hint: 'Tả hướng chung rồi nêu tuần giữ nguyên và tuần đạt đỉnh.',
    model: 'The chart shows attendance at a photography workshop over five weeks. It started at 12 people and rose to 16 in the second week. Attendance stayed at 16 for another week, then reached a peak of 22 in week four. It fell to 18 in the final week, still above the starting figure.',
    explanation: 'Điểm chính là cuối kỳ cao hơn điểm bắt đầu dù đã giảm sau tuần bốn. Nêu chính xác hai tuần có cùng số người, thay vì nói lượng tham dự tăng mỗi tuần.',
    checklist: ['Đã nhận ra hai tuần có lượng khách bằng nhau?', 'Đã phân biệt đỉnh và số ở tuần cuối?'],
  },
  {
    title: 'Ways to borrow course materials',
    chartTitle: 'Most-used source for course materials',
    unit: '% of surveyed students',
    values: [['Library app', 42], ['Library desk', 26], ['Classmate', 18], ['Department office', 14]],
    hint: 'Đọc đúng phần trăm và so sánh cách dùng ứng dụng với quầy thư viện.',
    model: 'The chart compares students’ main sources for course materials. The library app was the largest category at 42 percent, ahead of the library desk at 26 percent. Borrowing from classmates stood at 18 percent, and the department office was least common at 14 percent. Together, the two library channels accounted for 68 percent.',
    explanation: 'Biểu đồ là tỷ lệ người được khảo sát, nên nói phần trăm thay vì số người. Có thể gộp app và quầy vì cả hai đều thuộc thư viện.',
    checklist: ['Đã nêu số liệu bằng phần trăm?', 'Đã nhóm đúng hai nguồn từ thư viện?'],
  },
  {
    title: 'Queue lengths at an information desk',
    chartTitle: 'Waiting time at an information desk',
    unit: 'minutes',
    values: [['9:00 am', 4], ['10:00 am', 9], ['11:00 am', 15], ['12:00 pm', 11], ['1:00 pm', 5]],
    hint: 'Theo trục thời gian đến mốc cao nhất rồi mô tả phần giảm.',
    model: 'The chart shows waiting times at an information desk from nine in the morning to one in the afternoon. The wait increased from four minutes to a peak of fifteen minutes at eleven. It then shortened to eleven minutes at noon and five at one o’clock. The earliest reading was the lowest.',
    explanation: 'Các cột đo số phút chờ, không phải số người trong hàng. Nói rõ 11 giờ là thời điểm và 15 phút là thời gian chờ.',
    checklist: ['Đã dùng đúng đơn vị phút?', 'Đã phân biệt mốc giờ với thời gian chờ?'],
  },
  {
    title: 'Electricity use before a lighting upgrade',
    chartTitle: 'Average daily electricity use before and after a lighting upgrade',
    unit: 'kWh per day',
    values: [['Studio · before', 30], ['Studio · after', 22], ['Workshop · before', 38], ['Workshop · after', 27], ['Office · before', 18], ['Office · after', 16]],
    hint: 'So sánh trong từng cặp trước và sau. Xác định nơi giảm nhiều nhất.',
    model: 'The chart compares average daily electricity use in three rooms before and after a lighting upgrade. All three used less afterwards. The workshop fell from 38 to 27 kilowatt hours a day, the largest decrease, although it still used the most electricity. The studio dropped by eight kilowatt hours, and the office fell from 18 to 16, the smallest reduction.',
    explanation: 'Xưởng giảm 11 kWh/ngày, studio giảm 8 và văn phòng giảm 2. “Giảm nhiều nhất” và “dùng ít nhất sau thay đổi” là hai so sánh khác nhau.',
    checklist: ['Đã dùng đúng đơn vị mỗi ngày?', 'Đã phân biệt mức dùng còn lại và mức giảm?'],
  },
  {
    title: 'Bookings and attendance at public talks',
    chartTitle: 'Bookings and confirmed attendance by day',
    unit: 'people',
    values: [['Tuesday · booked', 80], ['Tuesday · attended', 72], ['Wednesday · booked', 100], ['Wednesday · attended', 63], ['Thursday · booked', 90], ['Thursday · attended', 81]],
    hint: 'Tìm ngày có nhiều người đặt nhất và ngày có nhiều người tham dự nhất.',
    model: 'The chart compares bookings and actual attendance at three public talks. Wednesday had the most bookings, at 100, but the fewest attendees, at 63. Thursday was the best attended, with 81 people out of 90 bookings, and Tuesday had 72 attendees out of 80 bookings. The difference between bookings and attendance was much larger on Wednesday than on either other day.',
    explanation: 'Thứ Tư có khoảng cách 37 người, lớn hơn khoảng cách 8 và 9 của hai ngày còn lại. Không cần đoán tại sao một số người không đến vì biểu đồ không có lý do.',
    checklist: ['Đã phân biệt bookings và actual attendance?', 'Đã mô tả đúng sự chênh lệch nổi bật nhất?'],
  },
  {
    title: 'Return rates for work placement surveys',
    chartTitle: 'Survey return rates by programme and collection method',
    unit: '% of surveys returned',
    values: [['Design · email', 46], ['Design · text', 64], ['Nursing · email', 55], ['Nursing · text', 67], ['Business · email', 52], ['Business · text', 60]],
    hint: 'Nêu xu hướng chung theo cách gửi. Dùng “percentage points” cho độ chênh.',
    model: 'The chart shows survey return rates for three programmes, using email or text messages. Text messages had higher return rates in every programme. The biggest difference was in design, where returns rose from 46 percent by email to 64 percent by text, a gap of 18 percentage points. Nursing recorded the highest overall rate at 67 percent by text. Business had the smallest difference between the two methods.',
    explanation: 'Khoảng cách của Design là 18 điểm phần trăm. Nursing cao nhất về tỷ lệ trả lời, nhưng Design có chênh lệch theo cách gửi lớn nhất.',
    checklist: ['Đã nêu cả xu hướng chung và khác biệt giữa các ngành?', 'Đã dùng “percentage points” để nói độ chênh?'],
  },
  {
    title: 'Timetable changes at three stations',
    chartTitle: 'Average evening wait for a train by station',
    unit: 'minutes',
    values: [['Oak · old timetable', 14], ['Oak · new timetable', 9], ['River · old timetable', 10], ['River · new timetable', 11], ['Hill · old timetable', 18], ['Hill · new timetable', 12]],
    hint: 'Tìm hai ga cải thiện và một ngoại lệ. So sánh mức giảm tính bằng phút.',
    model: 'The chart compares average evening waits under the old and new train timetables. Oak and Hill had shorter waits, while River was the exception, increasing from ten to eleven minutes. Hill saw the largest improvement, falling by six minutes from eighteen to twelve, but it still had the longest wait. Oak had the shortest wait under the new timetable, at nine minutes.',
    explanation: 'Hill giảm nhiều nhất nhưng vẫn có thời gian chờ dài nhất. River là ngoại lệ vì chờ thêm một phút. Nhấn hai ý này để tránh mô tả quá đơn giản.',
    checklist: ['Đã nhận ra ga River chờ lâu hơn?', 'Đã phân biệt ga giảm mạnh nhất và ga chờ ngắn nhất sau thay đổi?'],
  },
]

const chartQuestions: Question[] = chartItems.map((item, index) => ({
  id: itemId('image', index),
  type: 'describe-image',
  difficulty: difficultyAt(index),
  title: item.title,
  prompt: 'Look at the chart and describe the main features.',
  chart: {
    title: item.chartTitle,
    unit: item.unit,
    rows: item.values.map(([label, value]) => ({ label, value })),
  },
  hint: item.hint,
  model: item.model,
  explanation: item.explanation,
  checklist: [...item.checklist, 'Đã trình bày có nhịp và nối các ý rõ ràng?'],
}))

export const extraSpeakingQuestions: Question[] = [
  ...readQuestions,
  ...repeatQuestions,
  ...chartQuestions,
  ...situationQuestions,
  ...discussionQuestions,
]
