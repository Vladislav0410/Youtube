export class VideoDetail {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
}

export enum Sort {
  relevance = 'relevance',
  date = 'date',
  viewCount = 'viewCount',
  rating = 'rating'
}
export enum Duration {
  any = 'any',
  long = 'long',
  medium = 'medium',
  short = 'short'
}
export enum MaxResults {
  ten = 10,
  twenty = 20,
  thirdty = 30,
  fourty = 40,
  fifty = 50
}
