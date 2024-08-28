import file1 from '../assets/magic.pdf';

export type BlogInfo = {
  slug: string;
  author: string;
  title: string;
  summary: string;
  date: Date;
  src: string;
}

export const blogList: BlogInfo[] = [
  {slug: 'test', author: 'Joao Vilca Soto', title: 'Testing', summary: 'Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out ', date: new Date(), src: file1},
  {slug: 'test', author: 'Joao Vilca Soto', title: 'Testing', summary: 'Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out ', date: new Date(), src: file1},
  {slug: 'test', author: 'Joao Vilca Soto', title: 'Testing', summary: 'Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out ', date: new Date(), src: file1},
  {slug: 'test', author: 'Joao Vilca Soto', title: 'Testing', summary: 'Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out ', date: new Date(), src: file1},
  {slug: 'test', author: 'Joao Vilca Soto', title: 'Testing', summary: 'Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out ', date: new Date(), src: file1},
  {slug: 'test', author: 'Joao Vilca Soto', title: 'Testing', summary: 'Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out ', date: new Date(), src: file1}
]