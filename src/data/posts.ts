export interface XPost {
  id: string;
  username: string;
  handle: string;
  avatar: string;
  text: string;
  likes: number;
  replies: number;
  retweets: number;
  date: string;
}

export const xPosts: XPost[] = [
  {
    id: '1',
    username: 'Ritik Kumar',
    handle: 'RitikTeotia_',
    avatar: 'RK',
    text: 'Building MOM on Amazon Bedrock. Multi-LLM routing is genuinely wild.',
    likes: 142,
    replies: 12,
    retweets: 24,
    date: 'Jun 15',
  },
  {
    id: '2',
    username: 'Ritik Kumar',
    handle: 'RitikTeotia_',
    avatar: 'RK',
    text: '2× hackathon wins. Still a student. Still figuring it out in public.',
    likes: 98,
    replies: 8,
    retweets: 11,
    date: 'Jun 12',
  },
];
