import { CompetitionIdEnum } from '@/constants/restApi'

export type Competition = {
  code: CompetitionIdEnum
  emblem: string
  id: number
  name: string
  type: string
}
