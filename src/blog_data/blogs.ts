type BlogInfo = {
  slug: string;
  author: string;
  date: Date;
  src: string;
}

export const blogList: BlogInfo[] = [
  {slug: 'test', author: 'Joao Vilca Soto', date: new Date(), src: 'src/assets/magic.pdf'}
]