import file1 from '../assets/magic.pdf';
import redwood from '../assets/redwood.png';

export type BlogInfo = {
  slug: string;
  author: string;
  title: string;
  summary: string;
  date: Date;
  src: string;
  img: string;
}

export const blogList: BlogInfo[] = [
  {slug: 'test', author: 'Joao Vilca Soto', title: 'Testing', summary: 'Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out ', date: new Date(), src: file1, img: redwood},
  {slug: 'test', author: 'Joao Vilca Soto', title: 'Testing', summary: 'Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out ', date: new Date(), src: file1, img: redwood},
  {slug: 'test', author: 'Joao Vilca Soto', title: 'Testing', summary: 'Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out ', date: new Date(), src: file1, img: redwood},
  {slug: 'test', author: 'Joao Vilca Soto', title: 'Testing', summary: 'Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out ', date: new Date(), src: file1, img: redwood},
  {slug: 'test', author: 'Joao Vilca Soto', title: 'Testing', summary: 'Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out ', date: new Date(), src: file1, img: redwood},
  {slug: 'test', author: 'Joao Vilca Soto', title: 'Testing', summary: 'Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out ', date: new Date(), src: file1, img: redwood},
  {slug: 'test', author: 'Joao Vilca Soto', title: 'Testing', summary: 'Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out ', date: new Date(), src: file1, img: redwood},
  {slug: 'test', author: 'Joao Vilca Soto', title: 'Testing', summary: 'Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out ', date: new Date(), src: file1, img: redwood},
  {slug: 'test', author: 'Joao Vilca Soto', title: 'Testing', summary: 'Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out Testing a thing out ', date: new Date(), src: file1, img: redwood}
]