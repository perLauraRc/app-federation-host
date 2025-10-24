export type PartialScore = {
  away: number
  home: number
}

export type Score = {
  duration: string
  extraTime?: PartialScore
  fullTime: PartialScore
  halfTime: PartialScore
  penalties?: PartialScore
  regularTime?: PartialScore
  winner: string
}
