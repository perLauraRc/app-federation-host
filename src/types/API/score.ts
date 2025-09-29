export type ScoreTime = {
  away: number
  home: number
}

export type Score = {
  duration: string
  extraTime?: ScoreTime
  fullTime: ScoreTime
  halfTime: ScoreTime
  penalties?: ScoreTime
  regularTime?: ScoreTime
  winner: string
}
