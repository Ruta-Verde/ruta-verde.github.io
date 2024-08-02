import envi from '../../assets/environ.png';
import volun from '../../assets/volunteer.png';
import research from '../../assets/research.png';

export type PreviewProps = {
  title: string,
  text: string,
  img: string,
};

export const filler = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. \
                            Sed cursus ante dapibus diam. Sed nisi. \
                            Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.";
export const examplePic = 'https://www.adorama.com/alc/wp-content/uploads/2021/12/Nature-Camera-Settings-2-825x465.jpeg';
export const ourStory = "Everything started as a project at Cascadia College in 2020. Joao noticed the lack of green jobs in the community after graduation. He rallied the college group and started Ruta Verde, a non-profit to bring sustainable solutions come to life. ";
export const ourStory2 = 
  "Ruta Verde has become a platform to help students and activists practice their skills in regenerative practices, bridging communities from different groups, and working to help preserve and share Indigenous knowledge.";
export const backPic = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Wide_angle_tetons.jpg/1200px-Wide_angle_tetons.jpg?20090131184521';
export const previews: PreviewProps[] = [
  {
    title: 'Environmental Action',
    text: 'From building community forests to urban plantings to sponsoring events, we know that to build a greener future we must act together.',
    img: `${envi}`
  },
  {
    title: 'Volunteering',
    text: 'We provide support as a group to other efforts and organizations across the world, helping to get things done.',
    img: `${volun}`
  },
  {
    title: 'Research',
    text: 'To create a more sustainable future, we must find new ways of meeting our needs in more efficient ways',
    img: `${research}`
  }]