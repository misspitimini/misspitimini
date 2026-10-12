export interface Workshop {
  slug: string;
  imgSrc: string;
  imgAlt: string;
  pubDate:Date;
  dateText: string;
  hour: string;
  title: string;
  sumary: {
    duration: string,
    materials: string,
    experiences: string,
    price: string,
    location: string,
    capacity: string
  }  
  pompadour: string;
  content: string;
  tags:[]
}
