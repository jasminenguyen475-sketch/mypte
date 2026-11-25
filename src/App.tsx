import { useState, type MouseEvent } from 'react'
import {
  ArrowDown, ArrowRight, BookOpen, ChartNoAxesCombined, Check, ChevronRight, Clock3,
  GraduationCap, Headphones, House, Lightbulb, Mic, PenLine, Play, RotateCcw, Target,
} from 'lucide-react'
import { practiceSets, questions, questionsForType, typesForSkill } from './data'
import { personalIntroduction } from './data/personal-introduction'
import { Breadcrumbs } from './Breadcrumbs'
import { difficultyLabels, formats, skillInfo, skills, type QuestionType, type Skill } from './data/types'
import { accuracy, completedCount, getQuestion, useProgress } from './progress'
import { Practice } from './Practice'
import { homeHref, progressHref, questionHref, setsHref, skillHref, typeHref, useRoute } from './routes'

const skillIcons = { speaking: Mic, writing: PenLine, reading: BookOpen, listening: Headphones }
const disclaimer = 'Trang luyện tập độc lập, không liên kết với Pearson. Kết quả luyện tập không phải điểm thi chính thức.'
const suggestedQuestion = questionsForType('read-aloud')[0]
type ProgressStore = ReturnType<typeof useProgress>

function jumpTo(event: MouseEvent<HTMLAnchorElement>, id: string) {
  event.preventDefault()
  const target = document.getElementById(id)
  target?.focus({ preventScroll: true })
  target?.scrollIntoView({ block: 'start' })
}

const weeks = [
  { name: 'Làm quen các dạng bài', detail: 'Đọc hướng dẫn và thử các câu nhập môn ở cả bốn kỹ năng.', label: 'Bắt đầu', href: questionHref(suggestedQuestion.id) },
  { name: 'Luyện đều bốn kỹ năng', detail: 'Đổi kỹ năng mỗi buổi hoặc ghép hai kỹ năng trong một buổi.', label: 'Chọn kỹ năng', href: '#ky-nang' },
  { name: 'Ôn lỗi lặp lại', detail: 'Mở bài đã đánh dấu và chọn một lỗi cụ thể để sửa trước.', label: 'Mở bài cần ôn', href: progressHref },
  { name: 'Làm một nhóm bài ngắn', detail: 'Chọn 3–4 bài ở nhiều kỹ năng và dùng chế độ Luyện có giờ.', label: 'Chọn bộ luyện', href: setsHref },
]

function Home({ store }: { store: ProgressStore }) {
  const { attempts, last } = store.progress
  const done = completedCount(attempts)
  const lastQuestion = last && getQuestion(last.questionId)
  const start = last && lastQuestion ? questionHref(lastQuestion.id, last.mode, last.setId) : questionHref(suggestedQuestion.id)

  return <>
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow"><GraduationCap size={18} aria-hidden="true" /> SỔ TAY TỰ HỌC</p>
        <h1 id="hero-title">Luyện PTE Academic <em>từng bước.</em></h1>
        <p className="hero-description">Bắt đầu với bài vừa sức, luyện bốn kỹ năng và xem mình cần sửa gì sau mỗi lượt.</p>
        <div className="hero-actions">
          <a className="button button-primary" href={start}><Play size={17} aria-hidden="true" /> Tiếp tục luyện</a>
          <a className="button button-secondary" href="#ky-nang" onClick={event => jumpTo(event, 'skills-title')}>Chọn kỹ năng <ArrowDown size={16} aria-hidden="true" /></a>
        </div>
        <p className="hero-context"><Clock3 size={15} aria-hidden="true" /> 15–25 phút mỗi buổi · Học theo nhịp của bạn</p>
      </div>
      <div className="hero-side">
        <div className="goal-card">
          <div className="goal-top"><span className="goal-icon"><Target size={22} aria-hidden="true" /></span><span className="goal-label">MỤC TIÊU CỦA MÌNH</span></div>
          <div className="goal-number">65 <span>overall</span></div>
          <p className="goal-caption">Mục tiêu PTE Academic</p>
          <div className="goal-progress">
            <span className="goal-stats"><span>Bài đã hoàn thành</span><strong>{done}/{questions.length}</strong></span>
            <progress value={done} max={questions.length} aria-label="Số bài đã hoàn thành" />
          </div>
        </div>
        <div className="study-strip"><span className="study-icon"><BookOpen size={17} aria-hidden="true" /></span><span><strong>{lastQuestion ? 'Bài gần nhất' : 'Bài đầu tiên'}</strong><small lang="en">{lastQuestion?.title ?? suggestedQuestion.title}</small></span></div>
      </div>
    </section>

    <section id="ky-nang" className="skills-section" aria-labelledby="skills-title">
      <div className="section-heading">
        <div><h2 id="skills-title" tabIndex={-1}>Bốn kỹ năng</h2><p>Chọn một kỹ năng để bắt đầu.</p></div>
      </div>
      <div className="skill-grid">
        {skills.map(skill => {
          const Icon = skillIcons[skill]
          const { name, description } = skillInfo[skill]
          const count = typesForSkill(skill).length
          return <a className={`skill-card skill-${skill}`} key={skill} href={skillHref(skill)}>
            <div className="skill-meta"><span className="skill-icon"><Icon size={23} aria-hidden="true" /></span><span className="skill-count">{count} dạng bài</span></div>
            <h3 lang="en">{name}</h3>
            <p>{description}</p>
            <span className="skill-arrow">Vào luyện <ArrowRight size={17} aria-hidden="true" /></span>
          </a>
        })}
      </div>
    </section>

    <div className="dashboard-grid">
      <section className="panel" aria-labelledby="plan-title">
        <div className="section-title-row"><div><h2 id="plan-title">Lộ trình 4 tuần</h2><p>Gợi ý 15–25 phút mỗi buổi. Bạn có thể bỏ qua một bước hoặc chọn bài khác.</p></div></div>
        <ol className="week-list">
          {weeks.map((week, index) => <li className="week-row" key={week.name}>
            <span className="week-index">Tuần {index + 1}</span>
            <span className="week-info"><strong>{week.name}</strong><small>{week.detail}</small></span>
            <a className="week-action" href={week.href} onClick={week.href === '#ky-nang' ? event => jumpTo(event, 'skills-title') : undefined}>{week.label} <ChevronRight size={15} aria-hidden="true" /></a>
          </li>)}
        </ol>
      </section>
      <section className="panel progress-mini" aria-labelledby="progress-mini-title">
        <div className="section-title-row"><div><h2 id="progress-mini-title">Tiến độ của mình</h2><p>Bài đã hoàn thành trên thiết bị này.</p></div></div>
        {skills.map(skill => <div className={`progress-line skill-${skill}`} key={skill}>
          <span lang="en">{skillInfo[skill].name}</span><strong>{completedCount(attempts, skill)} / {questions.filter(question => formats[question.type].skill === skill).length}</strong>
        </div>)}
        <a className="text-link" href={progressHref}>Xem tiến độ <ArrowRight size={17} aria-hidden="true" /></a>
      </section>
    </div>
  </>
}

function SkillPage({ skill }: { skill: Skill }) {
  const { name, description } = skillInfo[skill]
  const Icon = skillIcons[skill]
  return <div className={`skill-${skill}`}>
    <Breadcrumbs current={name} />
    <header className="page-intro">
      <span className="skill-icon"><Icon size={24} aria-hidden="true" /></span>
      <h1 lang="en">{name}</h1>
      <p>{description} Chọn một dạng để xem hướng dẫn và làm thử.</p>
    </header>
    {skill === 'speaking' && <section className="panel warmup-panel" aria-labelledby="warmup-title">
      <div>
        <h2 id="warmup-title" lang="en">Personal Introduction</h2>
        <p>Làm quen với micro và đồng hồ trước khi luyện. Phần này không tính điểm.</p>
      </div>
      <a className="button button-secondary" href={questionHref(personalIntroduction.id, 'timed')}>Thử giới thiệu bản thân <ArrowRight size={16} aria-hidden="true" /></a>
    </section>}
    <div className="type-grid">
      {typesForSkill(skill).map(type => <a className="panel type-card" key={type} href={typeHref(type)}>
        <span className="skill-count">{questionsForType(type).length} bài luyện</span>
        <h2 lang="en">{formats[type].label}</h2>
        <p>{formats[type].instruction}</p>
        <span className="skill-arrow">Chọn dạng bài <ArrowRight size={16} aria-hidden="true" /></span>
      </a>)}
    </div>
  </div>
}

function FormatPage({ type, store }: { type: QuestionType; store: ProgressStore }) {
  const format = formats[type]
  const name = skillInfo[format.skill].name
  return <div className={`skill-${format.skill}`}>
    <Breadcrumbs links={[{ label: name, href: skillHref(format.skill) }]} current={format.label} />
    <header className="page-intro">
      <p className="eyebrow" lang="en">{name}</p>
      <h1 lang="en">{format.label}</h1>
      <p>{format.instruction}</p>
    </header>
    <section className="panel format-panel">
      <div className="section-title-row"><div><h2>Chọn bài luyện</h2><p><Clock3 size={16} aria-hidden="true" /> {format.timing}</p></div></div>
      <ul className="item-list">
        {questionsForType(type).map((question, index) => <li key={question.id}>
          <a className="item-link" href={questionHref(question.id)}>
            <span className="item-index">{index + 1}</span>
            <span><strong lang="en">{question.title}</strong><small>{difficultyLabels[question.difficulty]}</small></span>
            {store.progress.attempts.some(attempt => attempt.questionId === question.id) && <span className="result-pill"><Check size={15} aria-hidden="true" /> Đã làm</span>}
            <ChevronRight size={18} aria-hidden="true" />
          </a>
        </li>)}
      </ul>
    </section>
  </div>
}

function ProgressPage({ store }: { store: ProgressStore }) {
  const [confirmation, setConfirmation] = useState(false)
  const [cleared, setCleared] = useState(false)
  const { attempts, review } = store.progress
  const practiceAccuracy = accuracy(attempts)
  const dateFormat = new Intl.DateTimeFormat('vi-VN', { dateStyle: 'short', timeStyle: 'short' })

  return <>
    <Breadcrumbs current="Tiến độ của mình" />
    <header className="page-intro"><p className="eyebrow"><ChartNoAxesCombined size={18} aria-hidden="true" /> TỔNG QUAN</p><h1>Tiến độ của mình</h1><p>Xem kết quả bài đã làm và chọn bài cần ôn.</p></header>
    <div className="stats-grid">
      <div className="panel stat-card"><span>Bài đã hoàn thành</span><strong>{completedCount(attempts)} <small>/ {questions.length}</small></strong><p>Mỗi câu được tính một lần.</p></div>
      <div className="panel stat-card"><span>Độ chính xác khi luyện</span><strong>{practiceAccuracy === null ? '—' : `${practiceAccuracy}%`}</strong><p>Tỷ lệ đơn vị đúng trong các lượt làm có đáp án.</p></div>
      <div className="panel stat-card"><span>Mục tiêu PTE Academic</span><strong>65 <small>overall</small></strong><p>Mục tiêu cá nhân cho kỳ thi.</p></div>
    </div>
    <div className="progress-grid">
      <section className="panel progress-mini"><h2>Theo kỹ năng</h2>
        {skills.map(skill => <div className={`progress-line skill-${skill}`} key={skill}><span lang="en">{skillInfo[skill].name}</span><strong>{completedCount(attempts, skill)} bài</strong></div>)}
      </section>
      <section className="panel"><h2>Bài cần ôn</h2>
        {review.length ? <ul className="item-list">{review.map(id => {
          const question = getQuestion(id)
          return question && <li key={id}><a className="item-link" href={questionHref(id)}><span><strong lang="en">{question.title}</strong><small lang="en">{formats[question.type].label}</small></span><ChevronRight size={17} aria-hidden="true" /></a></li>
        })}</ul> : <p>Những bài trả lời chưa đúng hết hoặc được đánh dấu sẽ hiện ở đây.</p>}
      </section>
    </div>
    <section className="panel history-panel"><h2>Lịch sử gần đây</h2>
      {attempts.length ? <ul className="history-list">{attempts.slice(0, 12).map((attempt, index) => {
        const question = getQuestion(attempt.questionId)
        return question && <li className="history-row" key={`${attempt.at}-${index}`}>
          <a href={questionHref(question.id, attempt.mode)} lang="en">{question.title}</a>
          <span className="history-meta">{dateFormat.format(attempt.at)} · {attempt.mode === 'study' ? 'Học' : 'Luyện có giờ'}</span>
          <span className="result-pill">{attempt.result ? `${attempt.result.correct}/${attempt.result.total} đúng` : 'Tự đánh giá'}</span>
        </li>
      })}</ul> : <p>Chưa có lượt luyện nào. Nộp một bài để xem kết quả ở đây.</p>}
    </section>
    <section className="reset-box" aria-label="Quản lý dữ liệu">
      {cleared && <p role="status">{store.available ? 'Đã xoá tiến độ và bản nháp.' : 'Đã đặt lại dữ liệu trong phiên này. Trình duyệt đang chặn quyền lưu.'}</p>}
      {confirmation ? <div className="panel">
        <h2>Xoá tiến độ và bản nháp?</h2><p>Thao tác này xoá lịch sử, danh sách cần ôn và bản nháp Writing đã lưu cho trang này.</p>
        <div className="exercise-actions"><button className="button button-secondary" onClick={() => setConfirmation(false)} autoFocus>Giữ dữ liệu</button><button className="button button-danger" onClick={() => { store.reset(); setConfirmation(false); setCleared(true) }}>Xác nhận xoá</button></div>
      </div> : <button className="button button-ghost" onClick={() => { setConfirmation(true); setCleared(false) }}><RotateCcw size={16} aria-hidden="true" /> Xoá tiến độ</button>}
    </section>
  </>
}

function SetsPage() {
  return <>
    <Breadcrumbs current="Bộ luyện ngắn" />
    <header className="page-intro"><h1>Bộ luyện ngắn</h1><p>Mỗi bộ gồm một câu ở mỗi kỹ năng. Dành khoảng 15–25 phút để làm và xem lại. Bạn có thể bỏ qua câu nào hoặc chọn bài khác.</p></header>
    <div className="type-grid">{practiceSets.map(set => <section className="panel type-card" key={set.id}>
      <h2>{set.title}</h2>
      <ol className="set-steps">{set.steps.map(question => <li key={question.id}><a className="text-link" lang="en" href={questionHref(question.id, 'timed', set.id)}>{formats[question.type].label}</a></li>)}</ol>
      <a className="button button-primary" href={questionHref(set.steps[0].id, 'timed', set.id)}>Bắt đầu bộ luyện <ArrowRight size={17} aria-hidden="true" /></a>
    </section>)}</div>
  </>
}

export function App() {
  const route = useRoute()
  const store = useProgress()
  const question = route.section === 'bai' && route.id ? getQuestion(route.id) : undefined
  const skill = route.section === 'ky-nang' ? skills.find(item => item === route.id) : undefined
  const type = route.section === 'dang-bai' ? (Object.keys(formats) as QuestionType[]).find(item => item === route.id) : undefined
  const set = practiceSets.find(item => item.id === route.setId && item.steps.some(step => step.id === question?.id))
  const activeSkill = question ? formats[question.type].skill : type ? formats[type].skill : skill
  const home = !route.section || route.section === 'ky-nang' && !route.id

  return <>
    <a className="skip-link" href="#main" onClick={event => jumpTo(event, 'main')}>Đến nội dung chính</a>
    <header className="site-header">
      <div className="shell nav-bar">
        <a href={homeHref} className="brand" aria-label="PTE Từng Bước · Trang chủ">
          <span className="brand-mark"><GraduationCap size={23} aria-hidden="true" /></span><span className="brand-name">PTE <span>Từng Bước</span></span>
        </a>
        <nav className="nav-links" aria-label="Điều hướng chính">
          <a className="nav-link nav-home" href={homeHref} aria-current={home ? 'page' : undefined}><House size={16} aria-hidden="true" /> Trang chủ</a>
          {skills.map(item => <a key={item} className="nav-link" href={skillHref(item)} aria-current={activeSkill === item ? 'page' : undefined} lang="en">{skillInfo[item].name}</a>)}
        </nav>
        <a className="nav-progress" href={progressHref} aria-current={route.section === 'tien-do' ? 'page' : undefined}><ChartNoAxesCombined size={17} aria-hidden="true" /> Tiến độ</a>
      </div>
    </header>
    <main className="site-main shell" tabIndex={-1} id="main">
      {!store.available && <p className="notice" role="status"><Lightbulb size={18} aria-hidden="true" /> Trình duyệt không lưu được dữ liệu. Bạn vẫn có thể làm bài, nhưng tiến độ và bản nháp có thể mất khi tải lại hoặc đóng trang.</p>}
      {home ? <Home store={store} /> : skill ? <SkillPage skill={skill} /> : type ? <FormatPage type={type} store={store} />
        : question ? <Practice key={`${question.id}:${route.mode}:${set?.id ?? ''}`} question={question} mode={route.mode} store={store} set={set} />
          : route.section === 'tien-do' ? <ProgressPage store={store} /> : route.section === 'bo-luyen' ? <SetsPage /> : <div className="page-intro"><h1>Không tìm thấy trang</h1><a className="button button-primary" href={homeHref}>Về trang chủ</a></div>}
    </main>
    <footer className="site-footer"><div className="shell footer-inner"><strong>PTE Từng Bước</strong><p>{disclaimer}</p></div></footer>
  </>
}
