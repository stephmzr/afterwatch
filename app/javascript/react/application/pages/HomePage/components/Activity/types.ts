export interface ActivityItem {
  id: string
  user: {
    id: string
    firstName: string
    lastName: string
    fullName: string
  }
  activityType: 'rating' | 'watchlist'
  tmdbId: string
  mediaType: string
  metadata: any
  createdAt: string
  actionText: string
  media: {
    id: string
    title: string
    posterPath: string
    releaseDate: string
    voteAverage: number
  }
} 