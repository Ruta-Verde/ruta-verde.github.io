import file1 from '../assets/magic.pdf';

type BlogInfo = {
  slug: string;
  author: string;
  date: Date;
  src: string;
}

export const blogList: BlogInfo[] = [
  {slug: 'test', author: 'Joao Vilca Soto', date: new Date(), src: file1}
]