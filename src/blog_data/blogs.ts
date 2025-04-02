// import file1 from '../assets/magic.pdf';
import blogDouglas from '../assets/blogDouglas.pdf';
import blogSpruce from '../assets/blogSpruce.pdf';
import blogCedar from '../assets/blogCedar.pdf';
import redwood from '../assets/redwood.png';
import sitka from '../assets/sitka.jpg';
import douglas from '../assets/douglas.jpg';

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
  {slug: 'blog-douglas', author: 'Joao Vilca Soto', title: 'Trees: Douglas Fir', summary: 'Ruta Verde\'s brochure on Douglas Fir trees. Click to learn more about them! From our founder and CEO, Joao.', date: new Date('2025-04-02'), src: blogDouglas, img: douglas},
  {slug: 'blog-spruce', author: 'Joao Vilca Soto', title: 'Trees: Sitka Spruce', summary: '', date: new Date('2025-04-02'), src: blogSpruce, img: sitka},
  {slug: 'blog-cedar', author: 'Joao Vilca Soto', title: 'Trees: Western Red Cedar', summary: '', date: new Date('2025-04-02'), src: blogCedar, img: redwood},
]