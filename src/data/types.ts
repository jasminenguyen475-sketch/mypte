export type Skill = 'speaking' | 'writing' | 'reading' | 'listening'
export type Difficulty = 'foundation' | 'exam'
export type Mode = 'study' | 'timed'

export type QuestionType =
  | 'read-aloud' | 'repeat-sentence' | 'describe-image' | 'respond-situation' | 'group-discussion'
  | 'written-summary' | 'essay'
  | 'reading-dropdown' | 'reading-drag' | 'reorder' | 'choice-single' | 'choice-multiple'
  | 'dictation' | 'listening-blanks' | 'incorrect-words' | 'spoken-summary'

export interface Question {
  id: string
  type: QuestionType
  difficulty: Difficulty
  title: string
  prompt: string
  passage?: string
  hint: string
  explanation: string
  model?: string
  outline?: string[]
  checklist?: string[]
  audio?: { file: string; transcript: string }
  chart?: { title: string; unit: string; rows: { label: string; value: number }[] }
  parts?: string[]
  options?: string[]
  gapOptions?: string[][]
  answers?: string[]
  correct?: number[]
  clues?: string[]
  responseSeconds?: number
}

interface Format {
  skill: Skill
  label: string
  instruction: string
  timing: string
  seconds: number
  preparation?: number
}

export const formats: Record<QuestionType, Format> = {
  'read-aloud': {
    skill: 'speaking', label: 'Read Aloud',
    instruction: 'Đọc thành tiếng toàn bộ đoạn văn. Nhìn dấu câu để chia đoạn thành các cụm dễ đọc.',
    timing: 'Chuẩn bị 35 giây (trong khoảng 30–40 giây của Pearson) · Nói 35–40 giây gợi ý tuỳ bài',
    preparation: 35, seconds: 35,
  },
  'repeat-sentence': {
    skill: 'speaking', label: 'Repeat Sentence',
    instruction: 'Nghe câu tiếng Anh rồi lặp lại những gì bạn nghe được, theo đúng thứ tự.',
    timing: 'Nói 15 giây ngay sau audio',
    preparation: 0, seconds: 15,
  },
  'describe-image': {
    skill: 'speaking', label: 'Describe Image',
    instruction: 'Quan sát hình, nêu nội dung chính rồi dùng các chi tiết nổi bật để mô tả.',
    timing: 'Chuẩn bị 25 giây · Nói 40 giây',
    preparation: 25, seconds: 40,
  },
  'respond-situation': {
    skill: 'speaking', label: 'Respond to a Situation',
    instruction: 'Nghe tình huống và nói trực tiếp với người trong đề. Trong thi thật, Pearson còn hiển thị tình huống thành văn bản. Ở chế độ có giờ trên trang này, phần văn bản xuất hiện khi xem lại.',
    timing: 'Sau audio: chuẩn bị 10 giây · Nói 40 giây',
    preparation: 10, seconds: 40,
  },
  'group-discussion': {
    skill: 'speaking', label: 'Summarize Group Discussion',
    instruction: 'Nghe ba người thảo luận. Tóm tắt chủ đề, ý kiến quan trọng của từng người và điểm họ đồng ý hoặc khác nhau.',
    timing: 'Sau audio: chuẩn bị 10 giây · Nói 2 phút',
    preparation: 10, seconds: 120,
  },
  'written-summary': {
    skill: 'writing', label: 'Summarize Written Text',
    instruction: 'Tóm tắt ý chính của đoạn văn bằng một câu tiếng Anh từ 5 đến 75 từ.',
    timing: '10 phút · Thời gian theo Pearson', seconds: 600,
  },
  essay: {
    skill: 'writing', label: 'Write Essay',
    instruction: 'Viết bài luận 200–300 từ. Nêu quan điểm, phát triển lý do và dùng ví dụ liên quan đến đề.',
    timing: '20 phút · Thời gian theo Pearson', seconds: 1200,
  },
  'reading-dropdown': {
    skill: 'reading', label: 'Fill in the Blanks (Dropdown)',
    instruction: 'Chọn một từ cho mỗi chỗ trống. Đọc cả câu để xét ngữ pháp, cụm từ và ý nghĩa.',
    timing: '2 phút gợi ý · Pearson tính giờ chung cho Reading', seconds: 120,
  },
  'reading-drag': {
    skill: 'reading', label: 'Fill in the Blanks (Drag and Drop)',
    instruction: 'Dùng menu ở mỗi chỗ trống để lấy từ trong ngân hàng từ. Mỗi từ chỉ dùng một lần và có từ dư.',
    timing: '2 phút gợi ý · Pearson tính giờ chung cho Reading', seconds: 120,
  },
  reorder: {
    skill: 'reading', label: 'Reorder Paragraph',
    instruction: 'Dùng nút Lên và Xuống để xếp các đoạn theo thứ tự hợp lý. Tìm câu mở đầu rồi nối những câu có liên hệ.',
    timing: '2 phút gợi ý · Pearson tính giờ chung cho Reading', seconds: 120,
  },
  'choice-single': {
    skill: 'reading', label: 'Multiple Choice, Single Answer',
    instruction: 'Đọc đoạn văn và chọn một đáp án có bằng chứng rõ nhất.',
    timing: '2 phút gợi ý · Pearson tính giờ chung cho Reading', seconds: 120,
  },
  'choice-multiple': {
    skill: 'reading', label: 'Multiple Choice, Multiple Answers',
    instruction: 'Chọn tất cả đáp án có bằng chứng trong bài. Kiểm tra từng lựa chọn vì chọn sai làm giảm kết quả luyện.',
    timing: '2 phút gợi ý · Pearson tính giờ chung cho Reading', seconds: 120,
  },
  dictation: {
    skill: 'listening', label: 'Write from Dictation',
    instruction: 'Nghe và gõ lại nguyên câu. Ưu tiên đúng thứ tự, từ ngắn và chính tả.',
    timing: '1 phút gợi ý, tính từ lúc bắt đầu audio', seconds: 60,
  },
  'listening-blanks': {
    skill: 'listening', label: 'Fill in the Blanks (Type In)',
    instruction: 'Xem chỗ trống, nghe đoạn ghi âm rồi gõ đúng từ bị thiếu.',
    timing: '2 phút gợi ý, tính từ lúc bắt đầu audio', seconds: 120,
  },
  'incorrect-words': {
    skill: 'listening', label: 'Highlight Incorrect Words',
    instruction: 'Vừa nghe vừa theo dõi đoạn văn hiển thị. Chọn những từ khác với từ trong audio.',
    timing: '2 phút gợi ý, tính từ lúc bắt đầu audio', seconds: 120,
  },
  'spoken-summary': {
    skill: 'listening', label: 'Summarize Spoken Text',
    instruction: 'Nghe và viết một đoạn tóm tắt 50–70 từ. Ghi nhanh chủ đề và các ý quan trọng trong lúc nghe.',
    timing: '10 phút cho cả nghe và viết · Thời gian theo Pearson', seconds: 600,
  },
}

export const skills: Skill[] = ['speaking', 'writing', 'reading', 'listening']
export const difficultyLabels: Record<Difficulty, string> = { foundation: 'Nhập môn', exam: 'Gần dạng thi' }

export const skillInfo: Record<Skill, { name: string; description: string; later?: string[] }> = {
  speaking: {
    name: 'Speaking', description: 'Đọc thành tiếng, nghe nhắc lại và trình bày ý mạch lạc.',
    later: ['Retell Lecture', 'Answer Short Question'],
  },
  writing: { name: 'Writing', description: 'Tóm tắt đoạn văn và viết bài luận bằng tiếng Anh.' },
  reading: { name: 'Reading', description: 'Tìm manh mối, điền từ và nối các ý theo trật tự.' },
  listening: {
    name: 'Listening', description: 'Nghe bắt từ khoá, chép chính tả và tóm tắt ý chính.',
    later: ['Multiple Choice, Multiple Answers', 'Highlight Correct Summary', 'Multiple Choice, Single Answer', 'Select Missing Word'],
  },
}
