import type { Question } from './types'

interface ShortQuestionItem {
  title: string
  question: string
  answer: string
  hint: string
  explanation: string
}

const items: ShortQuestionItem[] = [
  {
    title: 'A reference book',
    question: 'What do you call a book that lists words and explains what they mean?',
    answer: 'A dictionary',
    hint: 'Nghe hai việc cuốn sách làm rồi gọi tên cuốn sách bằng một danh từ.',
    explanation: '“A dictionary” liệt kê các từ và giải thích nghĩa của chúng. Chỉ nói “dictionary” cũng đủ cho bài luyện này.',
  },
  {
    title: 'A part of a plant',
    question: 'Which part of a plant is usually underground and helps it take in water?',
    answer: 'The roots',
    hint: 'Nghe cả vị trí lẫn chức năng của bộ phận được hỏi.',
    explanation: '“Roots” là rễ cây. Từ “underground” cho biết bộ phận thường nằm dưới đất, còn “take in water” chỉ việc hút nước.',
  },
  {
    title: 'A measuring tool',
    question: 'What instrument do you use to find out how hot or cold something is?',
    answer: 'A thermometer',
    hint: 'Xác định đại lượng cần đo rồi tìm tên dụng cụ.',
    explanation: '“A thermometer” đo nhiệt độ. “How hot or cold” là manh mối về đại lượng được đo.',
  },
  {
    title: 'A familiar shape',
    question: 'How many sides does a triangle have, even if its sides are different lengths?',
    answer: 'Three',
    hint: 'Nghe tên hình và chú ý câu hỏi bắt đầu bằng “how many”.',
    explanation: 'Hình tam giác luôn có ba cạnh dù độ dài các cạnh khác nhau. Bạn có thể nói “three” hoặc “three sides”.',
  },
  {
    title: 'A daily routine',
    question: 'What do we call the first meal of the day, usually eaten in the morning?',
    answer: 'Breakfast',
    hint: 'Xác định câu hỏi đang hỏi tên bữa ăn hay hỏi thời gian.',
    explanation: '“Breakfast” là tên bữa ăn đầu tiên trong ngày. “In the morning” bổ sung ngữ cảnh cho bữa ăn được hỏi.',
  },
  {
    title: 'Types of animals',
    question: 'What do we call an animal that eats both plants and other animals?',
    answer: 'An omnivore',
    hint: 'Chú ý cấu trúc “both ... and ...” để xác định đủ hai nhóm thức ăn.',
    explanation: '“An omnivore” chỉ động vật ăn cả thực vật lẫn động vật. “Herbivore” chỉ động vật ăn thực vật và “carnivore” chỉ động vật ăn thịt.',
  },
  {
    title: 'A process in science',
    question: 'What do we call the process where liquid water at the surface changes into water vapour?',
    answer: 'Evaporation',
    hint: 'Giữ đúng chiều thay đổi từ trạng thái ban đầu sang trạng thái cuối.',
    explanation: '“Evaporation” là quá trình bay hơi. Câu hỏi mô tả nước ở bề mặt chuyển từ thể lỏng thành hơi nước. Chiều ngược lại là “condensation”.',
  },
  {
    title: 'Measurements in science',
    question: 'What is the name of the instrument used to measure the pressure of the air around us?',
    answer: 'A barometer',
    hint: 'Nghe kỹ từ chỉ đại lượng đo được ở nửa sau câu hỏi.',
    explanation: '“A barometer” đo áp suất khí quyển. Manh mối là “the pressure of the air”.',
  },
  {
    title: 'A person with a routine',
    question: 'What do we call someone who regularly travels between their home and workplace, often by train or bus?',
    answer: 'A commuter',
    hint: 'Câu hỏi cần một danh từ chỉ người. Để ý hai điểm đến và tần suất di chuyển.',
    explanation: '“A commuter” chỉ người thường xuyên đi lại giữa nơi ở và nơi làm việc. Tàu và xe buýt chỉ là ví dụ về phương tiện họ có thể dùng.',
  },
  {
    title: 'Organising information',
    question: 'If you arrange a series of events from oldest to newest, what kind of order are you using?',
    answer: 'Chronological order',
    hint: 'Tìm từ diễn tả tiêu chí sắp xếp được đưa ra trong vế “if”.',
    explanation: '“Chronological order” là thứ tự thời gian. Trong câu hỏi, các sự kiện được sắp từ lâu nhất đến gần đây nhất.',
  },
]

export const shortQuestionQuestions: Question[] = items.map((item, index) => {
  const id = `s-short-${String(index + 1).padStart(2, '0')}`
  return {
    id,
    type: 'answer-short-question',
    difficulty: index < 5 ? 'foundation' : 'exam',
    title: item.title,
    prompt: 'Listen to the question, then answer with one word or a few words.',
    audio: { file: `${id}.mp3`, transcript: item.question },
    model: item.answer,
    hint: item.hint,
    explanation: item.explanation,
  }
})
