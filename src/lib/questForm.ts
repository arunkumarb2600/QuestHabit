import { Category, Difficulty, Quest, id, today } from './game'

export type QuestFormValues = {
  title: string
  description: string
  icon: string
  category: Category
  difficulty: Difficulty
  xp: number
  duration: number
  frequency: Quest['frequency']
}

export const categories: Category[] = ['Health', 'Learning', 'Coding', 'Mindfulness', 'Productivity', 'Lifestyle']
export const difficulties: Difficulty[] = ['Easy', 'Medium', 'Hard']
export const frequencies: Quest['frequency'][] = ['Daily', 'Weekdays', 'Weekly']

export const TITLE_MAX = 100
export const DESCRIPTION_MAX = 500
export const XP_MIN = 5
export const XP_MAX = 100
export const DURATION_MIN = 1
export const DURATION_MAX = 480

export const defaultXpFor = (difficulty: Difficulty): number => (difficulty === 'Easy' ? 10 : difficulty === 'Medium' ? 25 : 50)

export const blankQuestForm = (): QuestFormValues => ({
  title: '', description: '', icon: '✨', category: 'Productivity', difficulty: 'Easy', xp: defaultXpFor('Easy'), duration: 15, frequency: 'Daily',
})

export const questToForm = (quest: Quest): QuestFormValues => ({
  title: quest.title, description: quest.description, icon: quest.icon, category: quest.category,
  difficulty: quest.difficulty, xp: quest.xp, duration: quest.duration, frequency: quest.frequency,
})

export const validateQuestForm = (v: QuestFormValues): Record<string, string> => {
  const errors: Record<string, string> = {}
  const title = v.title.trim()
  if (!title) errors.title = 'Title is required'
  else if (title.length > TITLE_MAX) errors.title = `Title must be ${TITLE_MAX} characters or less`
  if (v.description.length > DESCRIPTION_MAX) errors.description = `Description must be ${DESCRIPTION_MAX} characters or less`
  if (!v.icon.trim()) errors.icon = 'Icon is required'
  if (!categories.includes(v.category)) errors.category = 'Choose a valid category'
  if (!difficulties.includes(v.difficulty)) errors.difficulty = 'Choose a valid difficulty'
  if (!frequencies.includes(v.frequency)) errors.frequency = 'Choose a valid frequency'
  if (!Number.isInteger(v.xp) || v.xp < XP_MIN || v.xp > XP_MAX) errors.xp = `XP must be a whole number between ${XP_MIN} and ${XP_MAX}`
  if (!Number.isInteger(v.duration) || v.duration < DURATION_MIN || v.duration > DURATION_MAX) errors.duration = `Duration must be a whole number between ${DURATION_MIN} and ${DURATION_MAX} minutes`
  return errors
}

export const createQuestFromForm = (v: QuestFormValues): Quest => ({
  id: id(), title: v.title.trim(), description: v.description.trim(), icon: v.icon.trim(),
  category: v.category, difficulty: v.difficulty, xp: v.xp, duration: v.duration,
  frequency: v.frequency, weekdays: [], startDate: today(), status: 'active', createdAt: new Date().toISOString(),
})

export const applyQuestForm = (quest: Quest, v: QuestFormValues): Quest => ({
  ...quest, title: v.title.trim(), description: v.description.trim(), icon: v.icon.trim(),
  category: v.category, difficulty: v.difficulty, xp: v.xp, duration: v.duration, frequency: v.frequency,
})
