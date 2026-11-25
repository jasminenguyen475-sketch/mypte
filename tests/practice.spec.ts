import { expect, test, type Page } from '@playwright/test'

async function openExercise(page: Page, skill: string, format: string) {
  await page.goto('/')
  await page.getByRole('main').getByRole('link', { name: new RegExp(skill) }).click()
  await page.getByRole('main').getByRole('link', { name: new RegExp(format) }).click()
  await page.getByRole('link', { name: /Nhập môn/ }).click()
}

function submit(page: Page) {
  return page.getByRole('button', { name: /Nộp bài|Nộp và xem lại/ })
}

function progress(page: Page) {
  return page.getByRole('banner').getByRole('link', { name: 'Tiến độ' })
}

function feedback(page: Page) {
  return page.getByRole('region', { name: 'Kết quả luyện tập' })
}

test('Speaking can be submitted after microphone permission is denied', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator.mediaDevices, 'getUserMedia', {
      value: () => Promise.reject(new DOMException('Permission denied', 'NotAllowedError')),
    })
  })

  await openExercise(page, 'Speaking', 'Read Aloud')
  await page.getByRole('button', { name: /Ghi âm|Bật mic/ }).click()
  await expect(page.getByRole('alert')).toContainText('Không mở được mic')
  await expect(page.getByText('Hãy nói thành tiếng và tự đánh giá sau khi nộp.')).toBeVisible()
  await submit(page).click()
  await expect(feedback(page).getByRole('heading', { name: 'Câu trả lời tham khảo' })).toBeVisible()
  await expect(feedback(page).getByText('Tự đánh giá')).toBeVisible()
})

test('Speaking playback stays in the current exercise and can be deleted', async ({ page }) => {
  await openExercise(page, 'Speaking', 'Read Aloud')
  const recording = page.locator('audio[aria-label="Nghe lại bản ghi của bạn"]')
  const record = page.getByRole('button', { name: 'Ghi âm', exact: true })
  const stop = page.getByRole('button', { name: 'Dừng ghi' })

  await record.click()
  await expect(stop).toBeVisible()
  await stop.click()
  await expect(recording).toHaveAttribute('src', /^blob:/)
  await page.getByRole('button', { name: 'Xoá bản ghi' }).click()
  await expect(recording).toHaveCount(0)

  await record.click()
  await expect(stop).toBeVisible()
  await stop.click()
  await expect(recording).toHaveAttribute('src', /^blob:/)
  const currentExercise = page.url()
  const objectUrl = await recording.getAttribute('src')
  await progress(page).click()
  await expect(page.getByRole('heading', { name: 'Tiến độ của mình' })).toBeVisible()
  expect(await page.evaluate(async url => url && fetch(url).then(() => true, () => false), objectUrl)).toBe(false)
  await page.goto(currentExercise)
  await expect(recording).toHaveCount(0)
})

test('Speaking preparation moves to an answering countdown', async ({ page }) => {
  await page.clock.install()
  await openExercise(page, 'Speaking', 'Describe Image')
  await page.getByRole('link', { name: 'Luyện có giờ' }).click()
  await page.getByRole('button', { name: /Bắt đầu/ }).click()
  await expect(page.getByText('00:25', { exact: true })).toBeVisible()
  await page.clock.runFor(25_100)
  await expect(page.getByText('00:40', { exact: true })).toBeVisible()
  await page.clock.runFor(40_100)
  await expect(page.getByRole('status').filter({ hasText: 'Đã hết giờ' })).toBeVisible()
  await submit(page).click()
  await expect(feedback(page).getByText('Tự đánh giá')).toBeVisible()
})

test('Writing keeps a draft on reload and gives word-count feedback', async ({ page }) => {
  await openExercise(page, 'Writing', 'Summarize Written Text')
  const response = page.getByRole('textbox', { name: 'Câu trả lời của bạn' })
  const draft = 'The school installed outdoor blinds and opened windows early to keep classrooms cool.'
  await response.fill(draft)
  await expect(page.getByText('13 từ', { exact: true })).toBeVisible()
  await page.reload()
  await expect(response).toHaveValue(draft)
  await submit(page).click()
  await expect(feedback(page).getByText('Đạt yêu cầu độ dài')).toBeVisible()
  await expect(feedback(page).getByRole('heading', { name: 'Dàn ý gợi ý' })).toBeVisible()
})

test('Reading gives specific feedback and keeps results after reloading', async ({ page }) => {
  await openExercise(page, 'Reading', 'Fill in the Blanks \\(Dropdown\\)')
  await page.getByRole('combobox', { name: 'Chỗ trống 1' }).selectOption('reduce')
  await page.getByRole('combobox', { name: 'Chỗ trống 2' }).selectOption('tolerate')
  await page.getByRole('combobox', { name: 'Chỗ trống 3' }).selectOption('raises')
  await submit(page).click()
  const result = feedback(page)
  await expect(result.getByText('2/3', { exact: true })).toBeVisible()
  await expect(result.getByText('Chỗ trống 3 · Sai')).toBeVisible()
  await expect(result.getByText(/Reach the drains/)).toBeVisible()

  await progress(page).click()
  await page.reload()
  await expect(page.getByRole('main').getByText('Rain Gardens').first()).toBeVisible()
  await expect(page.getByRole('main').getByText(/67%|2\/3/).first()).toBeVisible()

  await page.getByRole('button', { name: /Xoá tiến độ/ }).click()
  await expect(page.getByRole('main').getByText('Rain Gardens').first()).toBeVisible()
  await page.getByRole('button', { name: /Xác nhận|Xoá dữ liệu/ }).click()
  await page.reload()
  await expect(page.getByRole('main').getByText('Rain Gardens')).toHaveCount(0)
})

test('Listening allows retry after a broken file and uses one play in timed mode', async ({ page }) => {
  await openExercise(page, 'Listening', 'Write from Dictation')
  await page.getByRole('link', { name: 'Luyện có giờ' }).click()
  const transcript = 'The library closes early during the winter break.'
  await expect(page.getByText(transcript, { exact: true })).toHaveCount(0)
  const audioPath = '**/audio/l-dictation-01.mp3'
  await page.route(audioPath, route => route.abort())
  await page.getByRole('button', { name: 'Phát audio' }).click()
  await expect(page.getByRole('alert')).toContainText('không được tính là một lượt làm sai')
  await expect(submit(page)).toBeDisabled()

  await page.unroute(audioPath)
  await page.getByRole('button', { name: 'Thử phát lại' }).click()
  await expect(page.getByRole('button', { name: 'Đã phát một lần' })).toBeDisabled({ timeout: 12_000 })
  await expect(page.getByText(transcript, { exact: true })).toHaveCount(0)
  await page.getByRole('textbox', { name: 'Câu bạn nghe được' }).fill('The library closses early during winter break today.')
  await submit(page).click()
  const result = feedback(page)
  await expect(page.getByText(transcript, { exact: true })).toBeVisible()
  await expect(result.getByText('Sai chính tả hoặc từ gần giống')).toBeVisible()
  await expect(result.getByText('Thiếu từ')).toBeVisible()
  await expect(result.getByText('Thừa từ')).toBeVisible()
  await progress(page).click()
  await expect(page.locator('.history-list').getByRole('listitem')).toHaveCount(1)
})

test.describe('Small screen', () => {
  test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })

  test('reorders paragraphs with touch-sized buttons and keyboard input', async ({ page }) => {
    await openExercise(page, 'Reading', 'Reorder Paragraph')
    const moveSecondUp = page.getByRole('button', { name: 'Đưa đoạn ở vị trí 2 lên' })
    await moveSecondUp.focus()
    await page.keyboard.press('Enter')
    await expect(page.getByRole('status').filter({ hasText: 'Đã chuyển đoạn' })).toContainText('sang vị trí 1')
    await page.getByRole('button', { name: 'Đưa đoạn ở vị trí 4 lên' }).tap()
    await page.getByRole('button', { name: 'Đưa đoạn ở vị trí 3 lên' }).tap()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await submit(page).tap()
    await expect(feedback(page).getByText('3/3', { exact: true })).toBeVisible()
  })
})

test('Blocked browser storage does not prevent practice', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() { throw new DOMException('Storage blocked', 'SecurityError') },
    })
  })
  await openExercise(page, 'Reading', 'Multiple Choice, Single Answer')
  await expect(page.getByRole('status').filter({ hasText: 'không lưu được dữ liệu' })).toBeVisible()
  await page.getByRole('radio', { name: 'It wanted to give people a quiet place to study earlier in the day.' }).check()
  await submit(page).click()
  await expect(feedback(page).getByText('1/1', { exact: true })).toBeVisible()
})

test('A short timed set can skip a question and resume at the same step', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Chọn bộ luyện' }).click()
  await page.getByRole('link', { name: 'Bắt đầu bộ luyện' }).first().click()
  await expect(page.getByText('Câu 1 / 4 trong bộ')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Luyện có giờ' })).toHaveAttribute('aria-current', 'page')

  await page.getByRole('link', { name: 'Bỏ qua câu này' }).click()
  await expect(page.getByRole('heading', { name: 'Cooler Classrooms' })).toBeVisible()
  await expect(page.getByText('Câu 2 / 4 trong bộ')).toBeVisible()
  await page.getByRole('link', { name: 'PTE Từng Bước · Trang chủ' }).click()
  await page.getByRole('link', { name: 'Tiếp tục luyện' }).click()
  await expect(page.getByText('Câu 2 / 4 trong bộ')).toBeVisible()

  await page.getByRole('button', { name: 'Bắt đầu tính giờ' }).click()
  await page.getByRole('textbox', { name: 'Câu trả lời của bạn' }).fill('The school used outdoor blinds and morning air to cool the classrooms.')
  await submit(page).click()
  await page.getByRole('link', { name: 'Sang câu tiếp theo' }).click()
  await expect(page.getByRole('heading', { name: 'Rain Gardens' })).toBeVisible()
  await expect(page.getByText('Câu 3 / 4 trong bộ')).toBeVisible()
})
