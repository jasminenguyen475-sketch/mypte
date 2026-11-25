import type { Question } from './types'

export const personalIntroduction: Question = {
  id: 's-personal-introduction',
  type: 'personal-introduction',
  difficulty: 'foundation',
  title: 'Personal Introduction',
  prompt: 'Introduce yourself briefly. You may talk about a field you are studying, something you enjoy, or a goal you are working towards.',
  hint: 'Chọn hai ý dễ nói. Ví dụ, bạn đang học điều gì và muốn dùng tiếng Anh ở đâu. Bạn có thể dùng tên hoặc thông tin giả khi luyện.',
  model: 'Hello, my name is Alex. I am studying environmental design, and I enjoy exploring public parks in my city. I am improving my English so that I can explain my project ideas clearly when I work with people from different backgrounds.',
  explanation: 'Mẫu mở đầu bằng lời chào ngắn, rồi chuyển từ việc học sang sở thích và mục tiêu. Bạn có thể dùng những ý khác. Hãy tập bắt đầu đúng lúc, nói rõ và kết thúc trong thời gian trả lời.',
  checklist: [
    'Mình bắt đầu nói khi thời gian trả lời mở.',
    'Mình giới thiệu ngắn và nói rõ ít nhất một ý về bản thân.',
    'Mình kết thúc trong 30 giây.',
  ],
}
