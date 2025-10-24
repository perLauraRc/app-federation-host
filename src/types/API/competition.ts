export type CompetitionId =
  | 'BL1'
  | 'BSA'
  | 'CL'
  | 'DED'
  | 'EC'
  | 'ELC'
  | 'FL1'
  | 'PD'
  | 'PL'
  | 'PPL'
  | 'SA'
  | 'WC'

export type Competition = {
  code: CompetitionId
  emblem: string
  id: number
  name: string
  type: string
}
